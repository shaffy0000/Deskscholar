import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
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

/** Fast-forward options requested for the demo video. */
const PLAYBACK_RATES = [1, 1.25, 1.5, 2] as const;

interface CloudflareVideoModalProps {
  /** Render-prop trigger, like the previous VideoModal API. */
  children: (api: { open: () => void }) => ReactNode;
}

/**
 * The single demo-video modal used by every "Watch …" button on the site.
 * Plays the Cloudflare Stream HLS manifest in a native <video> element
 * (hls.js is lazy-loaded only where MSE is needed), which keeps playback-speed
 * controls (1× / 1.25× / 1.5× / 2×) available. Media is fetched ONLY after the
 * visitor intentionally presses play; closing fully unmounts the player, which
 * immediately stops playback/audio.
 */
export function CloudflareVideoModal({ children }: CloudflareVideoModalProps) {
  const [open, setOpen] = useState(false);
  const [starting, setStarting] = useState(false);
  const [failed, setFailed] = useState(false);
  const [rate, setRate] = useState<number>(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleId = useId();
  const embed = getDemoVideoEmbed();

  const openModal = () => {
    if (!embed.ready) warnOnceVideoNotConfigured();
    setStarting(false);
    setFailed(false);
    setRate(1);
    setOpen(true);
  };

  const close = () => {
    setStarting(false);
    setFailed(false);
    setOpen(false);
  };

  const src = embed.ready ? embed.playerSrc : null;

  // Eagerly attach the source as soon as the modal opens so it can buffer.
  useEffect(() => {
    if (!open || !src) return;
    const video = videoRef.current;
    if (!video) return;

    let destroyed = false;
    let hls: { destroy: () => void } | undefined;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      return;
    }

    void (async () => {
      try {
        const { default: Hls } = await import('hls.js');
        if (destroyed) return;
        if (Hls.isSupported()) {
          const instance = new Hls();
          hls = instance;
          instance.on(Hls.Events.ERROR, (_event, data) => {
            if (data.fatal && !destroyed) {
              setFailed(true);
            }
          });
          instance.loadSource(src);
          instance.attachMedia(video);
        } else {
          video.src = src;
        }
      } catch {
        if (!destroyed) {
          setFailed(true);
        }
      }
    })();

    return () => {
      destroyed = true;
      hls?.destroy();
    };
  }, [open, src]);

  // Keep the element's playback rate in sync with the selected speed.
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = rate;
  }, [rate]);

  const handlePlayClick = () => {
    if (!embed.ready) return;
    setStarting(true);
    // Play synchronously during the user click event to satisfy browser autoplay policies!
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // If it still fails, the native controls are visible for them to click.
      });
    }
  };

  return (
    <>
      {children({ open: openModal })}
      <Modal open={open} onClose={close} labelledBy={titleId} panelClassName="max-w-[1100px]">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col overflow-hidden rounded-panel border border-dark-line bg-midnight shadow-2xl">
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
            <h2 id={titleId} className="font-display text-sm font-semibold text-text-hi sm:text-base">
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
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-text-hi transition hover:bg-deep-navy hover:text-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="px-3 pb-3 sm:px-4 sm:pb-4">
            <div className="relative aspect-video w-full" style={playerFrameStyle} data-testid="video-player-area">
              {/* Always render the video element if valid, so HLS can attach immediately */}
              {embed.ready && !failed && (
                <>
                  <video
                    ref={videoRef}
                    data-testid="demo-video"
                    controls={starting} // Only show controls once started
                    playsInline
                    preload="auto"
                    poster={POSTER_SRC}
                    title="DeskScholar prototype demonstration"
                    className="h-full w-full rounded-card bg-[#0B1412]"
                  />
                  {/* Fast-forward speeds - only show when starting */}
                  {starting && (
                    <div
                      role="group"
                      aria-label="Playback speed"
                      data-testid="playback-speeds"
                      className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-full bg-[rgba(11,20,18,0.72)] p-1 backdrop-blur-[2px] sm:right-3 sm:top-3"
                    >
                      {PLAYBACK_RATES.map((value) => (
                        <button
                          key={value}
                          type="button"
                          data-testid={`speed-${value}`}
                          aria-pressed={rate === value}
                          onClick={() => setRate(value)}
                          className={`min-h-[30px] rounded-full px-2.5 text-[12px] font-semibold transition-colors duration-[var(--t-micro)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--beam)] ${
                            rate === value
                              ? 'bg-[var(--beam)] text-white'
                              : 'text-[#E7EAE6] hover:bg-[rgba(255,255,255,0.14)]'
                          }`}
                        >
                          {value}x
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Overlay with Poster and Big Play Button */}
              {!starting && (
                <div className="absolute inset-0 z-20 flex items-center justify-center rounded-card bg-[#0B1412] overflow-hidden">
                  <img
                    src={POSTER_SRC}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                    data-testid="video-poster"
                  />
                  <button
                    type="button"
                    onClick={handlePlayClick}
                    aria-disabled={!embed.ready}
                    disabled={!embed.ready}
                    aria-label="Play the DeskScholar prototype demonstration"
                    data-testid="video-play"
                    className="absolute inset-0 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-aqua"
                  >
                    <span
                      className={`flex h-16 w-16 items-center justify-center rounded-full shadow-soft transition ${
                        embed.ready ? 'bg-brand hover:bg-brand-dark' : 'cursor-not-allowed bg-deep-navy'
                      }`}
                    >
                      <Play
                        className={`ml-1 h-7 w-7 ${embed.ready ? 'text-white' : 'text-text-lo'}`}
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                  
                  {!embed.ready && (
                    <div className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-center">
                      <p
                        role="status"
                        className="rounded-full border border-dark-line bg-midnight/90 px-4 py-2 text-center text-xs font-medium text-text-hi sm:text-sm"
                      >
                        Prototype video is being prepared. Please check back shortly.
                      </p>
                    </div>
                  )}
                  {failed && (
                    <div className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-center">
                      <p
                        role="status"
                        className="rounded-full border border-dark-line bg-midnight/90 px-4 py-2 text-center text-xs font-medium text-text-hi sm:text-sm"
                      >
                        The demo video could not start. Please try again in a moment.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
