import { useId, useState, type CSSProperties, type ReactNode } from 'react';
import { Play, X } from 'lucide-react';
import { getDemoVideoEmbed, warnOnceVideoNotConfigured } from '../../data/videoConfig';
import { Modal } from './Modal';
import { StatusBadge } from './StatusBadge';

/** Existing approved poster asset — no new media is generated. */
const POSTER_SRC = '/assets/demo-video-poster.webp';

/** Keep 16:9 inside the viewport on every screen — width budget from height budget. */
const playerFrameStyle: CSSProperties = {
  width: '100%',
  maxWidth: 'min(1100px, calc(78vh * 16 / 9))',
  marginInline: 'auto',
};

interface CloudflareVideoModalProps {
  /** Render-prop trigger, like the previous VideoModal API. */
  children: (api: { open: () => void }) => ReactNode;
  /** Stable testid for the trigger is provided by the caller where needed. */
}

/**
 * The single demo-video modal used by every "Watch …" button on the site.
 * Cloudflare Stream embeds are validated centrally (src/data/videoConfig.ts)
 * and the iframe is created ONLY after the visitor intentionally presses play.
 * Closing fully unmounts the iframe, which immediately stops playback/audio.
 */
export function CloudflareVideoModal({ children }: CloudflareVideoModalProps) {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const titleId = useId();
  const embed = getDemoVideoEmbed();

  const openModal = () => {
    if (!embed.ready) warnOnceVideoNotConfigured();
    setPlaying(false);
    setOpen(true);
  };

  const close = () => {
    setPlaying(false);
    setOpen(false);
  };

  return (
    <>
      {children({ open: openModal })}
      <Modal open={open} onClose={close} labelledBy={titleId} panelClassName="max-w-[1100px]">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col overflow-hidden rounded-panel border border-dark-line bg-midnight shadow-2xl">
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
            <h2 id={titleId} className="font-display text-sm font-semibold text-white sm:text-base">
              DeskScholar prototype demonstration
            </h2>
            <div className="flex items-center gap-3">
              <StatusBadge tone="dark" className="hidden sm:inline-flex">
                Concept demo
              </StatusBadge>
              <button
                type="button"
                onClick={close}
                aria-label="Close video"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-300 transition hover:bg-deep-navy hover:text-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="px-3 pb-3 sm:px-4 sm:pb-4">
            <div className="relative aspect-video w-full" style={playerFrameStyle} data-testid="video-player-area">
              {playing && embed.ready && embed.playerSrc ? (
                <iframe
                  src={embed.playerSrc}
                  title="DeskScholar prototype demonstration"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="h-full w-full rounded-card border-0"
                  data-testid="cloudflare-video"
                />
              ) : (
                <>
                  <img
                    src={POSTER_SRC}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full rounded-card object-cover"
                    data-testid="video-poster"
                  />
                  <button
                    type="button"
                    onClick={() => embed.ready && setPlaying(true)}
                    aria-disabled={!embed.ready}
                    disabled={!embed.ready}
                    aria-label="Play the DeskScholar prototype demonstration"
                    data-testid="video-play"
                    className="absolute inset-0 flex items-center justify-center rounded-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-aqua"
                  >
                    <span
                      className={`flex h-16 w-16 items-center justify-center rounded-full shadow-soft transition ${
                        embed.ready ? 'bg-brand hover:bg-brand-dark' : 'cursor-not-allowed bg-deep-navy'
                      }`}
                    >
                      <Play
                        className={`ml-1 h-7 w-7 ${embed.ready ? 'text-white' : 'text-slate-500'}`}
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                  {!embed.ready && (
                    <div className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-center">
                      <p
                        role="status"
                        className="rounded-full border border-dark-line bg-midnight/90 px-4 py-2 text-center text-xs font-medium text-slate-200 sm:text-sm"
                      >
                        Prototype video is being prepared. Please check back shortly.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
