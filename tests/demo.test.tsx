import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { AppRoutes } from '../src/App';
import { renderWithProviders } from './utils';

async function setup() {
  renderWithProviders(<AppRoutes />, { route: '/' });
  return await screen.findByTestId('demo-stage', {}, { timeout: 20000 });
}

async function switchMode(user: ReturnType<typeof userEvent.setup>, mode: string) {
  await user.click(screen.getByTestId(`demo-mode-${mode}`));
}

describe('interactive demo', () => {
  it('switches between demo modes', async () => {
    const user = userEvent.setup();
    await setup();

    await switchMode(user, 'concept');
    expect(screen.getByTestId('student-prompt')).toHaveTextContent(/fraction samajh nahi aa raha/i);
    expect(screen.getByTestId('fraction-visual')).toBeInTheDocument();

    await switchMode(user, 'quiz');
    expect(screen.getByTestId('student-prompt')).toHaveTextContent(/Quiz me on the solar system/i);
    expect(screen.getByTestId('quiz-interaction')).toBeInTheDocument();
  });

  it('reveals the fraction comparison when skipping the concept animation', async () => {
    const user = userEvent.setup();
    await setup();

    await switchMode(user, 'concept');
    await user.click(screen.getByTestId('demo-skip'));

    const compare = await screen.findByTestId('fraction-compare');
    expect(compare).toHaveTextContent('2/4 = 1/2');
    expect(screen.getByTestId('fraction-visual')).toHaveAttribute('data-stage', '4');
    expect(screen.getByTestId('projected-response')).toHaveTextContent(/pizza slices/i);
  });

  it('gives correct feedback when Mars is selected', async () => {
    const user = userEvent.setup();
    await setup();

    await switchMode(user, 'quiz');
    await user.click(screen.getByTestId('demo-skip'));

    const mars = await screen.findByRole('button', { name: /Mars/ });
    await waitFor(() => expect(mars).toBeEnabled());
    await user.click(mars);

    expect(await screen.findByTestId('quiz-feedback')).toHaveTextContent(/Correct! Mars appears red/i);
  });

  it('gives hint feedback for an incorrect quiz answer', async () => {
    const user = userEvent.setup();
    await setup();

    await switchMode(user, 'quiz');
    await user.click(screen.getByTestId('demo-skip'));

    const venus = await screen.findByRole('button', { name: /Venus/ });
    await waitFor(() => expect(venus).toBeEnabled());
    await user.click(venus);

    expect(await screen.findByTestId('quiz-feedback')).toHaveTextContent(/Not quite.*Roman god of war/i);
  });

  it('toggles translation languages', async () => {
    const user = userEvent.setup();
    await setup();

    await switchMode(user, 'translate');
    await user.click(screen.getByTestId('demo-skip'));

    expect(await screen.findByTestId('projected-response')).toHaveTextContent(
      /Photosynthesis woh amal hai/i,
    );

    await user.click(screen.getByRole('button', { name: 'English' }));
    expect(screen.getByTestId('projected-response')).toHaveTextContent(
      /plants make their own food using sunlight/i,
    );

    await user.click(screen.getByRole('button', { name: 'Bilingual' }));
    const response = screen.getByTestId('projected-response');
    expect(response).toHaveTextContent(/Photosynthesis woh amal hai/i);
    expect(response).toHaveTextContent(/plants make their own food using sunlight/i);
    expect(screen.getByTestId('translate-formula')).toHaveTextContent(
      /Sunlight \+ Water \+ Carbon Dioxide → Glucose \+ Oxygen/,
    );
  });

  it('replays the demo from the start', async () => {
    const user = userEvent.setup();
    await setup();

    await user.click(screen.getByTestId('demo-skip'));
    expect(await screen.findByTestId('projected-response')).toBeInTheDocument();
    expect(screen.getByTestId('demo-skip')).toBeDisabled();

    await user.click(screen.getByTestId('demo-replay'));
    expect(screen.queryByTestId('projected-response')).not.toBeInTheDocument();
    expect(screen.getByTestId('demo-skip')).toBeEnabled();
  });

  it('shows processing status for the scan mode after skipping', async () => {
    const user = userEvent.setup();
    await setup();

    await user.click(screen.getByTestId('demo-skip'));

    const status = await screen.findByTestId('demo-status');
    expect(status).toHaveTextContent(/OCR: Local/);
    expect(status).toHaveTextContent(/Internet required: No/);
    expect(screen.getByTestId('scan-hint')).toBeInTheDocument();
  });

  it('advances the scripted animation over time without user input', async () => {
    await setup();
    expect(await screen.findByTestId('student-prompt')).toBeInTheDocument();
    // First processing step appears automatically after the start delay.
    expect(await screen.findByText(/Scanning worksheet/i, {}, { timeout: 3000 })).toBeInTheDocument();
  });
});
