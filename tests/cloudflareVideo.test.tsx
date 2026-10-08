import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App, { AppRoutes } from '../src/App';
import { parseDemoVideoEmbed } from '../src/data/videoConfig';
import { renderWithProviders } from './utils';

const DIALOG_NAME = /DeskScholar prototype demonstration/i;
const DEFAULT_SRC =
  'https://customer-uakyqo7kkg4i219y.cloudflarestream.com/f35d73e258aa20a6d046bf25f551802d/manifest/video.m3u8';

afterEach(() => {
  vi.unstubAllEnvs();
});

async function openFromDemoTrigger(user: ReturnType<typeof userEvent.setup>) {
  renderWithProviders(<AppRoutes />, { route: '/technology' });
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
  it('normalises the videodelivery iframe format to the HLS manifest', () => {
    const r = parseDemoVideoEmbed('https://iframe.videodelivery.net/abc123XY_9');
    expect(r.ready).toBe(true);
    expect(r.playerSrc).toBe('https://videodelivery.net/abc123XY_9/manifest/video.m3u8');
  });

  it('normalises the customer cloudflarestream /iframe format to the HLS manifest', () => {
    const r = parseDemoVideoEmbed('https://customer-a1b2c3.cloudflarestream.com/de9f8a7b/iframe');
    expect(r.ready).toBe(true);
    expect(r.playerSrc).toBe('https://customer-a1b2c3.cloudflarestream.com/de9f8a7b/manifest/video.m3u8');
  });

  it('accepts a manifest URL as-is', () => {
    const r = parseDemoVideoEmbed(DEFAULT_SRC);
    expect(r.ready).toBe(true);
    expect(r.playerSrc).toBe(DEFAULT_SRC);
  });

  it('falls back to the approved demo video when unconfigured', () => {
    expect(parseDemoVideoEmbed(undefined)).toEqual({ ready: true, playerSrc: DEFAULT_SRC, reason: 'ok' });
    expect(parseDemoVideoEmbed('   ').playerSrc).toBe(DEFAULT_SRC);
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
    expect(r.ready).toBe(true);
    expect(r.playerSrc).toBe('https://videodelivery.net/abc123XY/manifest/video.m3u8');
  });
});

describe('demo video modal — invalid source', () => {
  it('shows poster + friendly status and keeps play disabled, without a player or errors', async () => {
    vi.stubEnv('VITE_DEMO_VIDEO_EMBED_URL', 'https://evil.example.com/abc123');
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const user = userEvent.setup();
    await openFromDemoTrigger(user);

    expect(screen.getByTestId('video-poster')).toBeInTheDocument();
    expect(screen.queryByTestId('demo-video')).not.toBeInTheDocument();
    const play = screen.getByTestId('video-play');
    expect(play).toBeDisabled();
    expect(play).toHaveAccessibleName('Play the DeskScholar prototype demonstration');
    const note = await screen.findByText(/Prototype video is being prepared\. Please check back shortly\./i);
    expect(note.closest('[role="status"]')).toBeInTheDocument();

    // Clicking a disabled play button never creates a player.
    fireEvent.click(play);
    expect(screen.queryByTestId('demo-video')).not.toBeInTheDocument();

    await user.keyboard('{Escape}');
    await expectClosed();
    warn.mockRestore();
  });
});

describe('demo video modal — configured', () => {
  const VIDEO_URL = 'https://iframe.videodelivery.net/demoVideoUID123';
  const MANIFEST_URL = 'https://videodelivery.net/demoVideoUID123/manifest/video.m3u8';

  it('creates the player only after pressing play, and unmounts it on close', async () => {
    vi.stubEnv('VITE_DEMO_VIDEO_EMBED_URL', VIDEO_URL);
    const user = userEvent.setup();
    const trigger = await openFromDemoTrigger(user);

    // No media element before intentional play.
    expect(screen.queryByTestId('demo-video')).not.toBeInTheDocument();

    await user.click(screen.getByTestId('video-play'));
    const video = (await screen.findByTestId('demo-video', {}, { timeout: 20000 })) as HTMLVideoElement;
    expect(video.tagName).toBe('VIDEO');
    expect(video.src).toBe(MANIFEST_URL);
    expect(video).toHaveAttribute('title', 'DeskScholar prototype demonstration');
    expect(video).toHaveAttribute('controls');

    // Clicking inside the player area keeps the modal open.
    fireEvent.click(screen.getByTestId('video-player-area'));
    expect(screen.getByRole('dialog', { name: DIALOG_NAME })).toBeInTheDocument();

    await user.keyboard('{Escape}');
    await expectClosed();
    expect(screen.queryByTestId('demo-video')).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);

    // Reopening gives a fresh poster-state player (media loads only on play).
    await user.click(trigger);
    await screen.findByRole('dialog', { name: DIALOG_NAME });
    expect(screen.queryByTestId('demo-video')).not.toBeInTheDocument();
    await user.click(screen.getByTestId('video-play'));
    expect(((await screen.findByTestId('demo-video')) as HTMLVideoElement).src).toBe(MANIFEST_URL);
  });

  it('offers 1x / 1.25x / 1.5x / 2x playback speeds that apply to the video', async () => {
    vi.stubEnv('VITE_DEMO_VIDEO_EMBED_URL', VIDEO_URL);
    const user = userEvent.setup();
    await openFromDemoTrigger(user);
    await user.click(screen.getByTestId('video-play'));
    const video = (await screen.findByTestId('demo-video', {}, { timeout: 20000 })) as HTMLVideoElement;

    const speeds = screen.getByTestId('playback-speeds');
    expect(speeds).toHaveAccessibleName('Playback speed');
    for (const rate of ['1', '1.25', '1.5', '2']) {
      expect(screen.getByTestId(`speed-${rate}`)).toBeInTheDocument();
    }
    expect(screen.getByTestId('speed-1')).toHaveAttribute('aria-pressed', 'true');

    await user.click(screen.getByTestId('speed-1.5'));
    expect(video.playbackRate).toBe(1.5);
    expect(screen.getByTestId('speed-1.5')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('speed-1')).toHaveAttribute('aria-pressed', 'false');

    await user.click(screen.getByTestId('speed-2'));
    expect(video.playbackRate).toBe(2);

    await user.click(screen.getByTestId('speed-1'));
    expect(video.playbackRate).toBe(1);
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
  it('home Watch concept demo and demo-section button open the same dialog (exactly one at a time)', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('heading', { level: 1 }, { timeout: 20000 });

    // home-page trigger: walkthrough 'Watch concept demo'
    const navTrigger = await screen.findByRole('button', { name: /Watch concept demo/i }, { timeout: 20000 });
    await user.click(navTrigger);
    const dialogs = await screen.findAllByRole('dialog', { name: DIALOG_NAME });
    expect(dialogs).toHaveLength(1);
    await user.click(screen.getByRole('button', { name: 'Close video' }));
    await expectClosed();
  });

  it('navbar Watch demo trigger opens the same dialog', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('heading', { level: 1 }, { timeout: 20000 });
    const navTrigger = await screen.findByTestId('nav-demo-video', {}, { timeout: 20000 });
    await user.click(navTrigger);
    const dialogs = await screen.findAllByRole('dialog', { name: DIALOG_NAME });
    expect(dialogs).toHaveLength(1);
    await user.keyboard('{Escape}');
    await expectClosed();
  });

  it('marks the dialog as a modal with an accessible name', async () => {
    const user = userEvent.setup();
    await openFromDemoTrigger(user);
    const dialog = screen.getByRole('dialog', { name: DIALOG_NAME });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getAllByRole('dialog', { name: DIALOG_NAME })).toHaveLength(1);
  });
});
