import { Compass, Home, LifeBuoy } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Container } from '../components/common/Container';
import { Seo } from '../components/common/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo route="notFound" />
      <section className="dark-section relative flex min-h-[70vh] items-center overflow-hidden bg-midnight py-16 md:py-20 xl:py-24">
        <div className="projection-grid-dark pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-72 -translate-x-1/2 rounded-full bg-brand/15 blur-3xl sm:w-96"
          aria-hidden="true"
        />
        <Container className="relative text-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand/15">
            <Compass className="h-8 w-8 text-brand" aria-hidden="true" />
          </span>
          <p className="eyebrow mt-6 text-[var(--beam)]">404 — off the map</p>
          <h1 className="mt-3 font-display text-h1 text-text-hi">This page isn’t on the desk.</h1>
          <p className="mx-auto mt-4 max-w-md text-lead text-text-hi">
            The page you were looking for doesn’t exist or may have been moved. Let’s get you back to
            something useful.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button variant="dark" size="lg" to="/">
              <Home className="h-4 w-4" aria-hidden="true" />
              Back to Home
            </Button>
            <Button variant="ghost" size="lg" to="/#demo" className="text-text-hi hover:bg-[var(--surface-2)] hover:text-[var(--beam)]">
              <LifeBuoy className="h-4 w-4" aria-hidden="true" />
              Try the Interactive Demo
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
