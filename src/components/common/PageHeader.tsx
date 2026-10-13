import type { ReactNode } from 'react';
import { Container } from './Container';

interface PageHeaderProps {
  label: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
  /** Optional visual shown beside the copy on wide screens (below it on phones). */
  visual?: ReactNode;
}

/**
 * Shared hero header for interior pages — warm blobs, dot grid, big title.
 * Copy is visible on first paint (no JS-gated entrance animation).
 */
export function PageHeader({ label, title, description, children, visual }: PageHeaderProps) {
  return (
    <header className="ph">
      <div className="ph-blob ph-blob-a" aria-hidden="true" />
      <div className="ph-blob ph-blob-b" aria-hidden="true" />
      <div className="ph-dots" aria-hidden="true" />
      <Container className="relative">
        <div className={visual ? 'ph-grid' : undefined}>
          <div className="max-w-3xl">
            <p className="ph-chip">
              <span className="ph-chip-dot" aria-hidden="true" />
              {label}
            </p>
            <h1 className="ph-title">{title}</h1>
            <p className="ph-desc">{description}</p>
            {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
          </div>
          {visual && <div className="ph-visual">{visual}</div>}
        </div>
      </Container>
    </header>
  );
}
