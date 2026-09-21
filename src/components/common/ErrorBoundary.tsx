import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('DeskScholar UI error:', error.name, info.componentStack ? 'component stack available' : '');
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-ivory px-6 text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-brand-dark">
            Something went wrong
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink">This page hit an unexpected error.</h1>
          <p className="mt-3 max-w-md text-muted">
            Please try reloading the page. If the problem continues, head back home and let the team know.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-6 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Reload page
            </button>
            <Link
              to="/"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-white px-6 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand-dark"
            >
              Back to home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
