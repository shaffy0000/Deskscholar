import { fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AppRoutes } from '../src/App';
import { parseDemoVideoEmbed } from '../src/data/videoConfig';
import { renderWithProviders } from './utils';

const DIALOG_NAME = /DeskScholar prototype demonstration/i;

afterEach(() => {
  vi.unstubAllEnvs();
});

async function openFromDemoTrigger(user: ReturnType<typeof userEvent.setup>) {
  renderWithProviders(<AppRoutes />, { route: '/' });
  const trigger = await screen.findByTestId('open-video-modal', {}, { timeout: 20000 });
  await user.click(trigger);
  await screen.findByRole('dialog', { name: DIALOG_NAME });
  await waitFor(() => {
    const dialog = screen.getByRole('dialog', { name: DIALOG_NAME });
    expect(dialog.contains(document.activeElement)).toBe(true);
  });
  return trigger;
}

async function expectClosed() {
  await waitForElementToBeRemoved(() => screen.queryByRole('dialog', { name: DIALOG_NAME }), {
    timeout: 15000,
  });
}

describe('URL validation (videoConfig)', () => {
  it('accepts the official videodelivery.net format and sanitizes the URL', () => {
    const r = parseDemoVideoEmbed('https://iframe.videodelivery.net/abc123XY_9');
    expect(r.ready).toBe(true);
    expect(r.playerSrc).toBe('https://iframe.videodelivery.net/abc123XY_9?autoplay=1');
  });

  it('accepts the customer cloudflarestream.com /iframe format', () => {
    const r = parseDemoVideoEmbed('https://customer-a1b2c3.cloudflarestream.com/de9f8a7b/iframe');
    expect(r.ready).toBe(true);
    expect(r.playerSrc).toBe('https://customer-a1b2c3.cloudflarestream.com/de9f8a7b/iframe?autoplay=1');
  });

  it('reports missing config without throwing', () => {
    expect(parseDemoVideoEmbed(undefined)).toEqual({ ready: false, playerSrc: null, reason: 'missing' });
    expect(parseDemoVideoEmbed('   ').reason).toBe('missing');
  });

  it('rejects insecure or non-Cloudflare origins', () => {
    expect(parseDemoVideoEmbed('http://iframe.videodelivery.net/abc123').reason).toBe('invalid');
    expect(parseDemoVideoEmbed('https://evil.example.com/abc123').reason).toBe('invalid');
    expect(parseDemoVideoEmbed('https://videodelivery.net.evil.com/abc123').reason).toBe('invalid');
    expect(parseDemoVideoEmbed('https://iframe.videodelivery.net/ab').reason).toBe('invalid');
    expect(parseDemoVideoEmbed('https://iframe.videodelivery.net/abc/../x').reason).toBe('invalid');
  });

  it('drops attacker-controlled query strings from config', () => {
    const r = parseDemoVideoEmbed('https://iframe.videodelivery.net/abc123XY?autoplay=0&foo=bar');
    expect(r.playerSrc).toBe('https://iframe.videodelivery.net/abc123XY?autoplay=1');
  });
});

describe('Cloudflare video modal — unconfigured', () => {
  it('shows poster + friendly status and keeps play disabled, without iframes or errors', async () => {
    vi.stubEnv('VITE_DEMO_VIDEO_EMBED_URL', '');
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const user = userEvent.setup();
    await openFromDemoTrigger(user);

    expect(screen.getByTestId('video-poster')).toBeInTheDocument();
    expect(screen.queryByTestId('cloudflare-video')).not.toBeInTheDocument();
    const play = screen.getByTestId('video-play');
    expect(play).toBeDisabled();
    expect(play).toHaveAccessibleName('Play the DeskScholar prototype demonstration');
    const note = await screen.findByText(/Prototype video is being prepared\. Please check back shortly\./i);
    expect(note.closest('[role="status"]')).toBeInTheDocument();

    // Clicking a disabled play button never creates a player.
    fireEvent.click(play);
    expect(screen.queryByTestId('cloudflare-video')).not.toBeInTheDocument();

    await user.keyboard('{Escape}');
    await expectClosed();
    warn.mockRestore();
  });
});

describe('Cloudflare video modal — configured', () => {
  const VIDEO_URL = 'https://iframe.videodelivery.net/demoVideoUID123';

  it('creates the iframe only after pressing play, and unmounts it on close', async () => {
    vi.stubEnv('VITE_DEMO_VIDEO_EMBED_URL', VIDEO_URL);
    const user = userEvent.setup();
    const trigger = await openFromDemoTrigger(user);

    // No Cloudflare request/iframe before intentional play.
    expect(screen.queryByTestId('cloudflare-video')).not.toBeInTheDocument();

    await user.click(screen.getByTestId('video-play'));
    const iframe = await screen.findByTestId('cloudflare-video');
    expect(iframe.tagName).toBe('IFRAME');
    expect(iframe).toHaveAttribute('src', `${VIDEO_URL}?autoplay=1`);
    expect(iframe).toHaveAttribute('title', 'DeskScholar prototype demonstration');
    expect(iframe).toHaveAttribute('allow');
    expect(iframe).toHaveAttribute('allowfullscreen');

    // Clicking inside the player area keeps the modal open.
    fireEvent.click(screen.getByTestId('video-player-area'));
    expect(screen.getByRole('dialog', { name: DIALOG_NAME })).toBeInTheDocument();

    await user.keyboard('{Escape}');
    await expectClosed();
    expect(screen.queryByTestId('cloudflare-video')).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);

    // Reopening gives a fresh poster-state player (iframe remounts only on play).
    await user.click(trigger);
    await screen.findByRole('dialog', { name: DIALOG_NAME });
    expect(screen.queryByTestId('cloudflare-video')).not.toBeInTheDocument();
    await user.click(screen.getByTestId('video-play'));
    expect(await screen.findByTestId('cloudflare-video')).toHaveAttribute('src', `${VIDEO_URL}?autoplay=1`);
  });

  it('closes via the close button and backdrop, but not via the panel', async () => {
    vi.stubEnv('VITE_DEMO_VIDEO_EMBED_URL', VIDEO_URL);
    const user = userEvent.setup();
    await openFromDemoTrigger(user);

    await user.click(screen.getByRole('button', { name: 'Close video' }));
    await expectClosed();

    await user.click(screen.getByTestId('open-video-modal'));
    const dialog = await screen.findByRole('dialog', { name: DIALOG_NAME });
    fireEvent.click(dialog);
    expect(screen.getByRole('dialog', { name: DIALOG_NAME })).toBeInTheDocument();
    await user.click(screen.getByTestId('modal-backdrop'));
    await expectClosed();
  });
});

describe('shared single modal implementation', () => {
  const triggerNames = [
    /Watch DeskScholar in Action/i,
    /Watch Full Prototype Video/i,
    /Watch Prototype Demo/i,
  ];

  it('every demo button on the home page opens the same dialog (exactly one at a time)', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AppRoutes />, { route: '/' });
    const heading = await screen.findByRole('heading', { level: 1 }, { timeout: 20000 });
    expect(heading).toBeInTheDocument();

    for (const name of triggerNames) {
      const trigger = await screen.findByRole('button', { name });
      await user.click(trigger);
      const dialogs = await screen.findAllByRole('dialog', { name: DIALOG_NAME });
      expect(dialogs).toHaveLength(1);
      await user.click(screen.getByRole('button', { name: 'Close video' }));
      await expectClosed();
    }
  });

  it('marks the dialog as a modal with an accessible name', async () => {
    const user = userEvent.setup();
    await openFromDemoTrigger(user);
    const dialog = screen.getByRole('dialog', { name: DIALOG_NAME });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getAllByRole('dialog')).toHaveLength(1);
  });
});
