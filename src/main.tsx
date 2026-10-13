import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App, { preloadRoute } from './App';
import './styles/index.css';
import './styles/pages.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  // Keep the prerendered HTML on screen until the current route's chunk is ready,
  // so direct visits go straight to the page instead of a loading state.
  void preloadRoute(window.location.pathname).then(() =>
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    ),
  );
}
