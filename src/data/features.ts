import {
  BookOpen,
  Cloud,
  Languages,
  Mic,
  MonitorDown,
  ScanLine,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';

export interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  planned?: boolean;
  /** Grid span classes for the bento layout (md/lg breakpoints). */
  span?: string;
  accent: 'violet' | 'aqua';
}

export const features: Feature[] = [
  {
    id: 'offline-first',
    icon: MonitorDown,
    title: 'Offline-first tutoring',
    description:
      'Core learning features are designed to keep working without continuous internet access.',
    span: 'md:col-span-2 lg:col-span-3',
    accent: 'aqua',
  },
  {
    id: 'bilingual',
    icon: Languages,
    title: 'English and Urdu explanations',
    description: 'Students can request English, Urdu, or bilingual teaching.',
    span: 'md:col-span-2 lg:col-span-3',
    accent: 'violet',
  },
  {
    id: 'scanning',
    icon: ScanLine,
    title: 'Worksheet and book scanning',
    description:
      'The desk-facing camera is designed to understand printed questions, diagrams, and handwritten work.',
    span: 'md:col-span-2 lg:col-span-3',
    accent: 'aqua',
  },
  {
    id: 'projection',
    icon: BookOpen,
    title: 'Projected guidance',
    description:
      'Explanations appear on the physical desk instead of pulling students into another screen.',
    span: 'md:col-span-3 lg:col-span-3',
    accent: 'violet',
  },
  {
    id: 'voice',
    icon: Mic,
    title: 'Hands-free voice interaction',
    description: 'Students can ask follow-up questions while staying focused on the task.',
    span: 'md:col-span-3 lg:col-span-3',
    accent: 'violet',
  },
  {
    id: 'curriculum',
    icon: Users,
    title: 'Curriculum-grounded learning',
    description: 'Approved books and learning materials can guide relevant explanations.',
    span: 'md:col-span-2 lg:col-span-3',
    accent: 'violet',
  },
  {
    id: 'parent-dashboard',
    icon: ShieldCheck,
    title: 'Parent dashboard',
    description: 'A planned companion dashboard can show learning activity and weak topics.',
    planned: true,
    span: 'md:col-span-2 lg:col-span-3',
    accent: 'aqua',
  },
  {
    id: 'cloud-reasoning',
    icon: Cloud,
    title: 'Optional advanced reasoning',
    description:
      'Difficult questions may use optional cloud assistance while everyday learning stays local.',
    span: 'md:col-span-2 lg:col-span-3',
    accent: 'violet',
  },
];

export interface ValuePoint {
  title: string;
  description: string;
}

export const heroValues: ValuePoint[] = [
  { title: 'Works beyond Wi-Fi', description: 'Offline-first core learning by design.' },
  { title: 'Built for books and worksheets', description: 'Learning stays on the physical desk.' },
  { title: 'Bilingual learning support', description: 'English and Urdu explanations planned.' },
  { title: 'Designed for focused desk study', description: 'No feed, no notifications, no scrolling.' },
];

export interface ProblemCard {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}
