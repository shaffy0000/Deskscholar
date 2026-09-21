import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AppRoutes } from '../src/App';
import { renderWithProviders } from './utils';

async function renderRoute(route: string) {
  renderWithProviders(<AppRoutes />, { route });
  return await screen.findByRole('heading', { level: 1 }, { timeout: 20000 });
}

describe('routes', () => {
  it('renders the home page', async () => {
    const heading = await renderRoute('/');
    expect(heading).toHaveTextContent(/Your AI tutor/i);
  });

  it('renders the technology page', async () => {
    const heading = await renderRoute('/technology');
    expect(heading).toHaveTextContent(/AI that stays close to the learner/i);
  });

  it('renders the schools page', async () => {
    const heading = await renderRoute('/schools');
    expect(heading).toHaveTextContent(/real classroom/i);
  });

  it('renders the journey page', async () => {
    const heading = await renderRoute('/journey');
    expect(heading).toHaveTextContent(/final-year project/i);
  });

  it('renders the team page', async () => {
    const heading = await renderRoute('/team');
    expect(heading).toHaveTextContent(/Meet the team building DeskScholar/i);
  });

  it('renders the contact page', async () => {
    const heading = await renderRoute('/contact');
    expect(heading).toHaveTextContent(/Help shape the future/i);
  });

  it('renders the privacy page', async () => {
    const heading = await renderRoute('/privacy');
    expect(heading).toHaveTextContent(/Privacy Policy/i);
  });

  it('renders the terms page', async () => {
    const heading = await renderRoute('/terms');
    expect(heading).toHaveTextContent(/Terms of Use/i);
  });

  it('renders a custom 404 page for unknown routes', async () => {
    const heading = await renderRoute('/does-not-exist');
    expect(heading).toHaveTextContent(/This page isn’t on the desk/i);
    expect(screen.getByRole('link', { name: /Back to Home/i })).toBeInTheDocument();
  });
});
