import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProductImage } from '../src/components/common/ProductImage';

describe('ProductImage', () => {
  it('renders the real image element with alt text and reserved space', () => {
    render(
      <ProductImage
        src="/assets/deskscholar/deskscholar-side-profile.webp"
        alt="DeskScholar device render"
        ratio="4 / 3"
        testId="media-container"
      />,
    );
    const image = screen.getByRole('img', { name: 'DeskScholar device render' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('decoding', 'async');
    expect(screen.getByTestId('media-container')).toHaveStyle({ aspectRatio: '4 / 3' });
  });

  it('loads priority images eagerly', () => {
    render(
      <ProductImage src="/assets/deskscholar/deskscholar-hero-dark.webp" alt="Hero" priority />,
    );
    const image = screen.getByRole('img', { name: 'Hero' });
    expect(image).toHaveAttribute('loading', 'eager');
    expect(image).toHaveAttribute('fetchpriority', 'high');
  });

  it('shows a designed fallback only after a real load error', () => {
    render(
      <ProductImage
        src="/assets/does-not-exist.webp"
        alt="Missing asset"
        fallbackLabel="DeskScholar 3D Device Render"
        fallbackDimensions="1600 × 1200 WEBP"
      />,
    );

    // Before the error the real <img> is in the document (no premature placeholder).
    expect(screen.getByRole('img', { name: 'Missing asset' })).toBeInTheDocument();

    fireEvent.error(screen.getByRole('img', { name: 'Missing asset' }));

    expect(screen.queryByRole('img', { name: 'Missing asset' })).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: /DeskScholar 3D Device Render — media coming soon/i })).toBeInTheDocument();
    expect(screen.getByText('DeskScholar 3D Device Render')).toBeInTheDocument();
    expect(screen.getByText('Recommended: 1600 × 1200 WEBP')).toBeInTheDocument();
  });

  it('renders a caption below the media', () => {
    render(
      <ProductImage src="/assets/deskscholar/deskscholar-exploded-view.webp" alt="Exploded view" caption="Conceptual hardware layout — final specifications may change." />,
    );
    expect(screen.getByText(/Conceptual hardware layout/)).toBeInTheDocument();
  });
});
