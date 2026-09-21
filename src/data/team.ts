/**
 * Team data for the /team page — text-only, no image fields by design.
 * The Team page intentionally contains no photos, avatars, or placeholders.
 */

export interface TeamMember {
  name: string;
  label: string;
}

/**
 * Real four-member team. Individual roles have not been announced yet,
 * so every member shares the same honest label. Do not invent per-member
 * roles, bios, social links, or emails — update this file when real
 * information is available.
 */
export const teamMembers: TeamMember[] = [
  { name: 'Shaffy Shafiq', label: 'DeskScholar Core Team' },
  { name: 'Hassan Muhyuddin', label: 'DeskScholar Core Team' },
  { name: 'Eman Sajid', label: 'DeskScholar Core Team' },
  { name: 'Muhammad Huzaifa', label: 'DeskScholar Core Team' },
];

/** Neutral line shown on every member card until individual roles are provided. */
export const memberContributionLine =
  'Contributing to the research, engineering and product development of DeskScholar.';

export interface AcademicContext {
  university: string;
  campus: string;
  degree: string;
  projectType: string;
  teamSize: string;
}

/** No university logo or image is used — text only. */
export const academicContext: AcademicContext = {
  university: 'COMSATS University Islamabad',
  campus: 'Lahore Campus',
  degree: 'BS Computer Engineering',
  projectType: 'Final-Year Project',
  teamSize: '4 members',
};

/**
 * Collective work areas. Individual responsibilities are intentionally NOT
 * assigned to members until real roles are provided.
 */
export const workAreas: string[] = [
  'Offline AI and model deployment',
  'Hardware and embedded systems',
  'OCR and worksheet understanding',
  'Voice interaction',
  'Projected learning interface',
  'Product and website experience',
  'Research, testing and evaluation',
];

export const workAreasNote =
  'Individual responsibilities will be updated as the project scope and implementation are finalised.';

export interface TeamValue {
  id: string;
  title: string;
  description: string;
}

export const teamValues: TeamValue[] = [
  {
    id: 'learning-first',
    title: 'Learning before answers',
    description: 'We want AI to help students understand the method, not only produce a final answer.',
  },
  {
    id: 'offline-accessibility',
    title: 'Offline accessibility',
    description: 'Core learning should remain useful where internet access is unreliable or expensive.',
  },
  {
    id: 'bilingual-inclusion',
    title: 'Bilingual inclusion',
    description: 'English, Urdu and bilingual explanations can make difficult concepts easier to understand.',
  },
  {
    id: 'responsible-ai',
    title: 'Responsible student AI',
    description:
      'Students, parents and teachers should understand when local or optional cloud processing is used.',
  },
];
