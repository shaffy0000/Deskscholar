import { Suspense, lazy, type ComponentType } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { PageLoader } from './components/common/PageLoader';
import { ScrollToTop } from './components/common/ScrollToTop';
import { PageLayout } from './components/layout/PageLayout';

/**
 * Lazy route page that can be preloaded. Once its chunk has resolved, the page
 * renders synchronously — so preloading the current route before the first
 * render means a direct visit never flashes the Suspense loader.
 */
function lazyPage(factory: () => Promise<{ default: ComponentType }>) {
  let Loaded: ComponentType | null = null;
  const preload = () =>
    factory().then((m) => {
      Loaded = m.default;
      return m;
    });
  const Lazy = lazy(preload);
  function Page() {
    return Loaded ? <Loaded /> : <Lazy />;
  }
  Page.preload = preload;
  return Page;
}

const HomePage = lazyPage(() => import('./pages/HomePage'));
const EditionsPage = lazyPage(() => import('./pages/EditionsPage'));
const TechnologyPage = lazyPage(() => import('./pages/TechnologyPage'));
const SchoolsPage = lazyPage(() => import('./pages/SchoolsPage'));
const JourneyPage = lazyPage(() => import('./pages/JourneyPage'));
const TeamPage = lazyPage(() => import('./pages/TeamPage'));
const ContactPage = lazyPage(() => import('./pages/ContactPage'));
const FaqPage = lazyPage(() => import('./pages/FaqPage'));
const PrivacyPage = lazyPage(() => import('./pages/PrivacyPage'));
const TermsPage = lazyPage(() => import('./pages/TermsPage'));
const NotFoundPage = lazyPage(() => import('./pages/NotFoundPage'));
const SpecimenPage = lazyPage(() => import('./pages/SpecimenPage'));
const ProposalPage = lazyPage(() => import('./pages/ProposalPage'));

const routePages: Record<string, { preload: () => Promise<unknown> }> = {
  '/': HomePage,
  '/editions': EditionsPage,
  '/technology': TechnologyPage,
  '/schools': SchoolsPage,
  '/journey': JourneyPage,
  '/team': TeamPage,
  '/contact': ContactPage,
  '/faq': FaqPage,
  '/privacy': PrivacyPage,
  '/terms': TermsPage,
  '/specimen': SpecimenPage,
  '/proposal': ProposalPage,
};

/** Resolve the page chunk for a pathname before first render (falls back to 404). */
// eslint-disable-next-line react-refresh/only-export-components -- tiny helper consumed by main.tsx
export function preloadRoute(pathname: string): Promise<unknown> {
  const key = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return (routePages[key] ?? NotFoundPage).preload().catch(() => undefined);
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
    mutations: { retry: false },
  },
});

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/editions" element={<EditionsPage />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/schools" element={<SchoolsPage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/specimen" element={<SpecimenPage />} />
        <Route path="/proposal" element={<ProposalPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ScrollToTop />
            <PageLayout>
              <AppRoutes />
            </PageLayout>
          </BrowserRouter>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
