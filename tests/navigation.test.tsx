import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../src/App';

const LAZY_TIMEOUT = 20000;

function drawer() {
  return screen.getByTestId('mobile-navigation');
}

async function openDrawer(user: ReturnType<typeof userEvent.setup>) {
  await screen.findByTestId('mobile-nav-open', {}, { timeout: LAZY_TIMEOUT });
  await user.click(screen.getByTestId('mobile-nav-open'));
  await waitFor(() => expect(drawer().className).not.toContain('invisible'));
  await waitFor(() => expect(drawer()).not.toHaveAttribute('inert'));
}

async function expectClosed() {
  await waitFor(() => {
    expect(drawer().className).toContain('invisible');
    expect(drawer()).toHaveAttribute('inert');
  });
}

describe('mobile navigation', () => {
  it('opens and closes the mobile drawer', async () => {
    const user = userEvent.setup();
    render(<App />);
    await openDrawer(user);
    expect(document.body.style.overflow).toBe('hidden');

    await user.click(screen.getByTestId('mobile-nav-close'));
    await expectClosed();
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('closes with the Escape key and unlocks scrolling', async () => {
    const user = userEvent.setup();
    render(<App />);
    await openDrawer(user);

    await user.keyboard('{Escape}');
    await expectClosed();
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('closes after navigating to a link', async () => {
    const user = userEvent.setup();
    render(<App />);
    await openDrawer(user);

    await user.click(within(drawer()).getByRole('link', { name: 'Editions' }));
    await expectClosed();
  });

  it('exposes desktop navigation links', async () => {
    render(<App />);
    await screen.findByTestId('mobile-nav-open', {}, { timeout: LAZY_TIMEOUT });
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Join the waitlist' }).length).toBeGreaterThan(0);
  });

  it('keeps the closed drawer out of the tab order (inert)', async () => {
    render(<App />);
    await screen.findByTestId('mobile-nav-open', {}, { timeout: LAZY_TIMEOUT });
    expect(drawer()).toHaveAttribute('inert');
  });
});
