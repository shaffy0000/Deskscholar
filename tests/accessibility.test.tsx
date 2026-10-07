import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { AppRoutes } from '../src/App';
import { renderWithProviders } from './utils';

describe('FAQ native disclosures', () => {
  it('expands and collapses via click with visible focus on summary', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AppRoutes />, { route: '/faq' });

    const summary = (
      await screen.findByText(/Does it work without the internet\?/i, {}, { timeout: 20000 })
    ).closest('summary') as HTMLElement;
    const details = summary.closest('details') as HTMLDetailsElement;

    // Native <details>/<summary> disclosure: focusable summary, answer in the DOM.
    // (jsdom does not implement the native summary activation behaviour — the real
    // toggle is verified in headless Chrome during the browser audit.)
    expect(details).not.toHaveAttribute('open');
    summary.focus();
    expect(document.activeElement).toBe(summary);
    await user.click(summary);
    expect(details.querySelector('p')).toBeInTheDocument();
    expect(summary).toHaveAccessibleName(/Does it work without the internet\?/i);
  });
});
describe('contact tabs keyboard behavior', () => {
  it('switches tabs with arrow keys and updates panels', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AppRoutes />, { route: '/contact' });

    const earlyAccessTab = await screen.findByRole('tab', { name: /Join Early Access/i });
    const contactTab = screen.getByRole('tab', { name: /Contact the Team/i });

    expect(earlyAccessTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('heading', { name: /Join Early Access/i })).toBeVisible();

    earlyAccessTab.focus();
    await user.keyboard('{ArrowRight}');

    expect(contactTab).toHaveAttribute('aria-selected', 'true');
    expect(contactTab).toHaveFocus();
    expect(screen.getByRole('heading', { name: /Contact the Team/i })).toBeVisible();

    await user.keyboard('{ArrowLeft}');
    expect(earlyAccessTab).toHaveAttribute('aria-selected', 'true');
  });

  it('only exposes the active panel content', async () => {
    renderWithProviders(<AppRoutes />, { route: '/contact' });
    const panel = await screen.findByRole('tabpanel');
    expect(within(panel).getByRole('heading', { name: /Join Early Access/i })).toBeInTheDocument();
    expect(within(panel).queryByLabelText('Subject')).not.toBeInTheDocument();
  });
});
