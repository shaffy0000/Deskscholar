import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AppRoutes } from '../src/App';
import { renderWithProviders } from './utils';

const ENDPOINT = 'https://formspree.io/f/testform123';
const fetchMock = vi.fn();

function mockFormspreeOnce(ok: boolean, status = 200) {
  fetchMock.mockResolvedValueOnce({
    ok,
    status,
    json: async () => (ok ? { ok: true } : { errors: [{ message: 'raw internal provider detail' }] }),
  });
}

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock);
  vi.stubEnv('VITE_FORMSPREE_ENDPOINT', ENDPOINT);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  fetchMock.mockReset();
});

async function openEarlyAccessTab() {
  await screen.findByRole('tab', { name: /Join Early Access/i }, { timeout: 20000 });
}

async function fillEarlyAccess(user: ReturnType<typeof userEvent.setup>, opts: { consent?: boolean } = {}) {
  await openEarlyAccessTab();
  await user.type(screen.getByLabelText(/Full name/i), 'Ayesha Khan');
  await user.type(screen.getByLabelText(/^Email/i), 'Ayesha@Example.com');
  await user.selectOptions(screen.getByLabelText(/^Role/i), 'STUDENT');
  if (opts.consent !== false) {
    await user.click(screen.getByRole('checkbox', { name: /agree that the DeskScholar team may contact me about early access/i }));
  }
}

function bodyOf(call = 0): Record<string, unknown> {
  return JSON.parse(fetchMock.mock.calls[call][1].body as string);
}

describe('early access form → Formspree', () => {
  it('does not send any request when validation fails', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AppRoutes />, { route: '/contact' });
    await openEarlyAccessTab();
    await user.click(screen.getByRole('button', { name: /Join Early Access/i }));

    expect(await screen.findByText(/Please enter your full name\./i)).toBeInTheDocument();
    expect(screen.getByText(/Please enter your email address\./i)).toBeInTheDocument();
    expect(screen.getByText(/Consent is required/i)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('requires consent before submitting', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AppRoutes />, { route: '/contact' });
    await fillEarlyAccess(user, { consent: false });
    await user.click(screen.getByRole('button', { name: /Join Early Access/i }));
    expect(await screen.findByText(/Consent is required/i)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sends exactly one JSON POST with the early-access payload and shows the success message', async () => {
    mockFormspreeOnce(true);
    const user = userEvent.setup();
    renderWithProviders(<AppRoutes />, { route: '/contact' });
    await fillEarlyAccess(user);
    await user.click(screen.getByRole('button', { name: /Join Early Access/i }));

    expect(
      await screen.findByText(
        /Thank you for joining DeskScholar early access\. We have received your registration/i,
      ),
    ).toBeInTheDocument();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(ENDPOINT, expect.objectContaining({ method: 'POST' }));
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).not.toMatch(/^GET/);
    expect(init.method).toBe('POST');
    expect(init.headers).toMatchObject({ 'Content-Type': 'application/json', Accept: 'application/json' });

    const payload = bodyOf();
    expect(payload.formType).toBe('DeskScholar Early Access');
    expect(payload._subject).toBe('New DeskScholar Early Access Registration');
    expect(payload.email).toBe('ayesha@example.com');
    expect(payload.role).toBe('Student');
    expect(payload.consent).toBe('Yes');
    expect(typeof payload.submittedAt).toBe('string');
    expect(String(payload.pageUrl)).toContain('localhost');
    expect(payload.website).toBeUndefined(); // honeypot not sent

    // Success region is polite-live + focus lands on it; form reset.
    const status = await screen.findByRole('status');
    expect(status).toHaveTextContent(/Thank you for joining DeskScholar early access/i);
    expect(screen.getByLabelText(/^Email/i)).toHaveValue('');
  });

  it('shows a busy state and duplicate clicks send only one request', async () => {
    let resolveFetch: (v: unknown) => void = () => {};
    fetchMock.mockImplementationOnce(
      () => new Promise((resolve) => { resolveFetch = resolve; }),
    );
    const user = userEvent.setup();
    renderWithProviders(<AppRoutes />, { route: '/contact' });
    await fillEarlyAccess(user);

    const button = screen.getByRole('button', { name: /Join Early Access/i });
    await user.click(button);
    await user.click(button).catch(() => {}); // disabled → no-op
    await user.click(button).catch(() => {});

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(button).toBeDisabled();
    expect(screen.getByText(/Submitting…/i)).toBeInTheDocument();
    resolveFetch({ ok: true, status: 200, json: async () => ({ ok: true }) });
    expect(await screen.findByRole('status')).toBeInTheDocument();
  });

  it('preserves entered values and re-enables submit on provider error (no raw details)', async () => {
    mockFormspreeOnce(false, 400);
    const user = userEvent.setup();
    renderWithProviders(<AppRoutes />, { route: '/contact' });
    await fillEarlyAccess(user);
    await user.click(screen.getByRole('button', { name: /Join Early Access/i }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/couldn’t submit your form right now\. Please check your connection and try again\./i);
    expect(alert).not.toHaveTextContent(/raw internal provider detail/i);
    expect(screen.getByLabelText(/^Email/i)).toHaveValue('Ayesha@Example.com');
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /Join Early Access/i })).toBeEnabled(),
    );
  });

  it('shows the accessible error when the network fails', async () => {
    fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'));
    const user = userEvent.setup();
    renderWithProviders(<AppRoutes />, { route: '/contact' });
    await fillEarlyAccess(user);
    await user.click(screen.getByRole('button', { name: /Join Early Access/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/couldn’t submit your form right now/i);
  });

  it('silently drops submissions from bots that filled the honeypot', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AppRoutes />, { route: '/contact' });
    await fillEarlyAccess(user);
    const honeypot = document.querySelector<HTMLElement>('#website');
    expect(honeypot).toBeTruthy();
    honeypot!.focus();
    await user.type(honeypot!, 'http://spam.example');
    honeypot!.blur();
    await user.click(screen.getByRole('button', { name: /Join Early Access/i }));

    expect(await screen.findByRole('status')).toBeInTheDocument(); // looks successful to the bot…
    expect(fetchMock).not.toHaveBeenCalled(); // …but nothing left the browser
  });

  it('fails gracefully without a console-facing crash when the endpoint env is missing', async () => {
    vi.stubEnv('VITE_FORMSPREE_ENDPOINT', '');
    const user = userEvent.setup();
    renderWithProviders(<AppRoutes />, { route: '/contact' });
    await fillEarlyAccess(user);
    await user.click(screen.getByRole('button', { name: /Join Early Access/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/couldn’t submit your form right now/i);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('contact form → Formspree', () => {
  async function fillContact(user: ReturnType<typeof userEvent.setup>) {
    await user.click(await screen.findByRole('tab', { name: /Contact the Team/i }, { timeout: 20000 }));
    await user.type(within(screen.getByRole('tabpanel', { name: /Contact the Team/i })).getByLabelText(/Full name/i), 'Ali Raza');
    const panel = screen.getByRole('tabpanel', { name: /Contact the Team/i });
    await user.type(within(panel).getByLabelText(/^Email/i), 'ali@example.com');
    await user.type(within(panel).getByLabelText(/^Subject/i), 'Research collaboration');
    await user.type(within(panel).getByLabelText(/^Message/i), 'We study offline tutoring systems.');
    await user.click(within(panel).getByRole('checkbox', { name: /may use this information to respond to my enquiry/i }));
  }

  it('sends the contact payload with its formType and subject', async () => {
    mockFormspreeOnce(true);
    const user = userEvent.setup();
    renderWithProviders(<AppRoutes />, { route: '/contact' });
    await fillContact(user);
    await user.click(screen.getByRole('button', { name: /Send Message/i }));

    expect(
      await screen.findByText(/Thank you for contacting DeskScholar\. Your message has been received/i),
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const payload = bodyOf();
    expect(payload.formType).toBe('DeskScholar Contact');
    expect(payload._subject).toBe('New Message from the DeskScholar Website');
    expect(payload.subject).toBe('Research collaboration');
    expect(payload.message).toBe('We study offline tutoring systems.');
    expect(payload.fullName).toBe('Ali Raza');
    expect(payload.email).toBe('ali@example.com');
    expect(payload.consent).toBe('Yes');
  });

  it('re-enables the button after failure and keeps values', async () => {
    mockFormspreeOnce(false, 500);
    const user = userEvent.setup();
    renderWithProviders(<AppRoutes />, { route: '/contact' });
    await fillContact(user);
    await user.click(screen.getByRole('button', { name: /Send Message/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/couldn’t submit/i);
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /Send Message/i })).toBeEnabled(),
    );
    expect(screen.getByLabelText(/^Subject/i)).toHaveValue('Research collaboration');
  });
});
