import { Helmet } from 'react-helmet-async';
import { DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl } from '../../data/site';
import { routeMeta, type RouteKey, type RouteMeta } from '../../data/routeMeta';

interface SeoProps {
  /** Route key from src/data/routeMeta.ts — single source shared with prerendering. */
  route: RouteKey;
  /** Override OG image for specific routes. */
  image?: string;
}

/** Route-level SEO head tags. Uses the same values prerendered into raw HTML. */
export function Seo({ route, image = DEFAULT_OG_IMAGE }: SeoProps) {
  const meta: RouteMeta = routeMeta[route];
  const canonical = absoluteUrl(meta.path);
  const ogImage = absoluteUrl(image);

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {meta.noindex && <meta name="robots" content="noindex" />}
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="DeskScholar offline-first AI learning companion on a study desk." />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="DeskScholar offline-first AI learning companion on a study desk." />
    </Helmet>
  );
}
