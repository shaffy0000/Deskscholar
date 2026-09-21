import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { AppRoutes } from '../src/App';
import { renderWithProviders } from './utils';

describe('FAQ accordion keyboard behavior', () => {
  it('toggles answers and moves focus with arrow keys', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AppRoutes />, { route: '/' });

    const first = await screen.findByRole('button', { name: /What is DeskScholar\?/i });
    const second = screen.getByRole('button', { name: /Does it work without the internet\?/i });

    // First item is open by default.
    expect(first).toHaveAttribute('aria-expanded', 'true');

    first.focus();
    await user.keyboard('{ArrowDown}');
    expect(second).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(second).toHaveAttribute('aria-expanded', 'true');
    expect(await screen.findByRole('region', { name: /Does it work without the internet\?/i })).toBeVisible();

    await user.keyboard('{Enter}');
    expect(second).toHaveAttribute('aria-expanded', 'false');
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
