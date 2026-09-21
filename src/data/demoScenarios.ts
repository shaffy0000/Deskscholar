import { CloudCog, Languages, ListChecks, ScanLine, Sparkles, type LucideIcon } from 'lucide-react';

export type DemoModeId = 'scan' | 'concept' | 'quiz' | 'translate' | 'hard';

export type DemoVisual = 'scan' | 'fraction' | 'quiz' | 'translate' | 'cloud';

export interface DemoStatusItem {
  label: string;
  value: string;
  tone: 'aqua' | 'violet' | 'sun';
}

export interface DemoScenario {
  id: DemoModeId;
  label: string;
  icon: LucideIcon;
  prompt: string;
  /** Processing narration lines shown while the simulated device works. */
  steps: string[];
  /** Tutor response lines projected after processing. */
  response: string[];
  status: DemoStatusItem[];
  visual: DemoVisual;
  /** Total beats (steps + response lines) before the interaction is complete. */
  beatCount: number;
}

export interface QuizOption {
  id: string;
  label: string;
  correct: boolean;
}

export const quizQuestion = 'Which planet is known as the Red Planet?';

export const quizOptions: QuizOption[] = [
  { id: 'venus', label: 'Venus', correct: false },
  { id: 'mars', label: 'Mars', correct: true },
  { id: 'jupiter', label: 'Jupiter', correct: false },
  { id: 'mercury', label: 'Mercury', correct: false },
];

export const quizFeedback = {
  correct: 'Correct! Mars appears red because of iron minerals in its soil.',
  incorrect: 'Not quite. Hint: this planet is named after the Roman god of war.',
};

export type TranslateLang = 'english' | 'urdu' | 'bilingual';

export const translateContent: Record<TranslateLang, string[]> = {
  english: [
    'Photosynthesis is the process in which plants make their own food using sunlight.',
    'Sunlight + Water + Carbon Dioxide → Glucose + Oxygen',
  ],
  urdu: [
    'Photosynthesis woh amal hai jismein pauday roshni ki madad se apni ghiza banate hain.',
    'Sunlight + Water + Carbon Dioxide → Glucose + Oxygen',
  ],
  bilingual: [
    'Photosynthesis woh amal hai jismein pauday roshni ki madad se apni ghiza banate hain.',
    'Photosynthesis is the process in which plants make their own food using sunlight.',
    'Sunlight + Water + Carbon Dioxide → Glucose + Oxygen',
  ],
};

export const demoScenarios: DemoScenario[] = [
  {
    id: 'scan',
    label: 'Scan Homework',
    icon: ScanLine,
    prompt: 'Can you check question 3?',
    steps: [
      'Scanning worksheet',
      'Detecting handwritten equation',
      'Reviewing the solution',
      'Identifying an incorrect sign',
      'Projecting a hint',
    ],
    response: [
      'You used the correct formula, but the sign changed in Step 2.',
      'Try subtracting 7 from both sides first.',
    ],
    status: [
      { label: 'OCR', value: 'Local', tone: 'aqua' },
      { label: 'Processing', value: 'On device', tone: 'aqua' },
      { label: 'Internet required', value: 'No', tone: 'violet' },
    ],
    visual: 'scan',
    beatCount: 7,
  },
  {
    id: 'concept',
    label: 'Explain a Concept',
    icon: Sparkles,
    prompt: 'Mujhe yeh fraction samajh nahi aa raha.',
    steps: ['Listening in Urdu + English', 'Choosing a visual analogy', 'Drawing on your desk'],
    response: [
      'Chalo isko pizza slices ki example se samajhte hain.',
      'If a pizza has four equal slices and you take one slice, you have taken one-fourth of the pizza.',
    ],
    status: [
      { label: 'Language', value: 'Urdu + English', tone: 'violet' },
      { label: 'Tutor', value: 'Local AI', tone: 'aqua' },
      { label: 'Explanation', value: 'Visual analogy', tone: 'sun' },
    ],
    visual: 'fraction',
    beatCount: 5,
  },
  {
    id: 'quiz',
    label: 'Quiz Me',
    icon: ListChecks,
    prompt: 'Quiz me on the solar system.',
    steps: ['Preparing a revision quiz', 'Projecting question 1'],
    response: [],
    status: [
      { label: 'Progress', value: 'Question 1 of 3', tone: 'violet' },
      { label: 'Quiz engine', value: 'Local AI', tone: 'aqua' },
    ],
    visual: 'quiz',
    beatCount: 2,
  },
  {
    id: 'translate',
    label: 'Translate to Urdu',
    icon: Languages,
    prompt: 'Explain photosynthesis in Urdu.',
    steps: ['Detecting requested language', 'Preparing bilingual explanation'],
    response: translateContent.urdu,
    status: [
      { label: 'Voice', value: 'Local TTS', tone: 'aqua' },
      { label: 'Languages', value: 'English · Urdu', tone: 'violet' },
    ],
    visual: 'translate',
    beatCount: 4,
  },
  {
    id: 'hard',
    label: 'Ask a Hard Question',
    icon: CloudCog,
    prompt: 'Explain why the quadratic formula works.',
    steps: [
      'Checking question complexity',
      'Local confidence is low',
      'Requesting optional advanced reasoning',
      'Receiving an enhanced explanation',
      'Keeping speech and projection local',
    ],
    response: [
      'This question needs deeper multi-step reasoning.',
      'DeskScholar can use optional cloud reasoning while keeping speech and projection on the device.',
    ],
    status: [
      { label: 'Voice processing', value: 'Local', tone: 'aqua' },
      { label: 'Projection', value: 'Local', tone: 'aqua' },
      { label: 'Advanced reasoning', value: 'Cloud-assisted', tone: 'violet' },
      { label: 'Privacy mode', value: 'Parent controlled', tone: 'aqua' },
    ],
    visual: 'cloud',
    beatCount: 7,
  },
];
