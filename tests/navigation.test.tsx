import { render, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../src/App';

const LAZY_TIMEOUT = 20000;

async function openDrawer(user: ReturnType<typeof userEvent.setup>) {
  await screen.findByTestId('mobile-nav-open', {}, { timeout: LAZY_TIMEOUT });
  await user.click(screen.getByTestId('mobile-nav-open'));
  await screen.findByTestId('mobile-navigation');
}

describe('mobile navigation', () => {
  it('opens and closes the mobile drawer', async () => {
    const user = userEvent.setup();
    render(<App />);
    await openDrawer(user);

    expect(document.body.style.overflow).toBe('hidden');

    await user.click(screen.getByTestId('mobile-nav-close'));
    await waitForElementToBeRemoved(() => screen.queryByTestId('mobile-navigation'), { timeout: 15000 });
    await waitFor(() => expect(document.body.style.overflow).not.toBe('hidden'));
  });

  it('closes with the Escape key and unlocks scrolling', async () => {
    const user = userEvent.setup();
    render(<App />);
    await openDrawer(user);

    await user.keyboard('{Escape}');
    await waitForElementToBeRemoved(() => screen.queryByTestId('mobile-navigation'), { timeout: 15000 });
    await waitFor(() => expect(document.body.style.overflow).not.toBe('hidden'));
  });

  it('closes after navigating to a link', async () => {
    const user = userEvent.setup();
    render(<App />);
    await openDrawer(user);

    const drawer = screen.getByTestId('mobile-navigation');
    await user.click(within(drawer).getByRole('link', { name: 'Technology' }));
    await waitForElementToBeRemoved(() => screen.queryByTestId('mobile-navigation'), { timeout: 15000 });
  });

  it('exposes desktop navigation links', async () => {
    render(<App />);
    await screen.findByTestId('mobile-nav-open', {}, { timeout: LAZY_TIMEOUT });
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Join Early Access' }).length).toBeGreaterThan(0);
  });
});
