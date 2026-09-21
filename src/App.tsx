import { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { PageLoader } from './components/common/PageLoader';
import { ScrollToTop } from './components/common/ScrollToTop';
import { PageLayout } from './components/layout/PageLayout';

const HomePage = lazy(() => import('./pages/HomePage'));
const TechnologyPage = lazy(() => import('./pages/TechnologyPage'));
const SchoolsPage = lazy(() => import('./pages/SchoolsPage'));
const JourneyPage = lazy(() => import('./pages/JourneyPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

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
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/schools" element={<SchoolsPage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
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
