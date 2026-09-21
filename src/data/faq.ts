export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const homeFaqs: FaqItem[] = [
  {
    id: 'what-is',
    question: 'What is DeskScholar?',
    answer:
      'DeskScholar is an offline-first AI learning companion designed for physical desk-based study. It is being built to see books, worksheets, and handwriting through a desk-facing camera, understand spoken questions, and project step-by-step guidance directly onto the workspace. It is currently a product-focused prototype in development.',
  },
  {
    id: 'offline',
    question: 'Does it work without the internet?',
    answer:
      'The core experience is designed to be offline-first: local speech recognition, local tutoring, local text-to-speech, and projection are planned to run on the device itself. Optional cloud assistance is reserved for difficult questions and is only used with clear indicators and approval.',
  },
  {
    id: 'answers',
    question: 'Does it give complete homework answers?',
    answer:
      'No. DeskScholar is designed to teach, not to dump answers. It guides students step by step with hints, questions, and projected explanations so learners build the reasoning they need for the next problem.',
  },
  {
    id: 'languages',
    question: 'Which languages will it support?',
    answer:
      'English and Urdu are the initial target languages, including bilingual explanations where a concept is taught in both languages. Additional languages may be explored after the prototype stage.',
  },
  {
    id: 'finished',
    question: 'Is it a finished product?',
    answer:
      'Not yet. DeskScholar is currently in prototype development as a product-focused final-year engineering project. Capabilities described on this website are planned or in progress, and final specifications may change during testing.',
  },
  {
    id: 'subscription',
    question: 'Will it require a subscription?',
    answer:
      'No mandatory subscription is planned for the core offline capabilities. Optional cloud-assisted features could involve third-party usage costs in the future, but nothing has been finalized.',
  },
  {
    id: 'data',
    question: 'Is student data sent to the cloud?',
    answer:
      'The design goal is local processing wherever practical. When a difficult question is escalated to optional cloud reasoning, only the minimum necessary content is sent, with clear on-device indicators and planned parent-controlled privacy mode. This marketing website itself does not collect learning records.',
  },
  {
    id: 'schools-testing',
    question: 'Can schools join prototype testing?',
    answer:
      'Yes — we are collecting pilot interest. Schools, teachers, and librarians can register interest through the For Schools page, and the team will reach out when pilot testing begins. No deployment commitments exist at this stage.',
  },
  {
    id: 'availability',
    question: 'When will it be available?',
    answer:
      'There is no confirmed launch date yet. Development is ongoing, and early access registrations are open so interested students, parents, teachers, and schools can follow progress and be notified about future testing opportunities.',
  },
  {
    id: 'collaboration',
    question: 'Can researchers or investors collaborate?',
    answer:
      'Absolutely. We welcome conversations about education research, hardware engineering, product design, and early-stage support. Use the contact form and select the relevant role so the team can route your enquiry correctly.',
  },
];

export const technologyFaqs: FaqItem[] = [
  {
    id: 'local-models',
    question: 'Which AI models run locally?',
    answer:
      'The architecture targets compact on-device models for speech recognition, text-to-speech, OCR, and everyday tutoring, sized to run on the built-in compute module. Specific models are still being evaluated during prototype testing.',
  },
  {
    id: 'offline-mode',
    question: 'What exactly works in offline mode?',
    answer:
      'The planned offline core covers wake-word detection, speech recognition, worksheet OCR, everyday step-by-step tutoring, curriculum-grounded retrieval from stored materials, voice output, and projection. Only complex multi-step reasoning is designed to optionally use the cloud.',
  },
  {
    id: 'ocr',
    question: 'How does worksheet and handwriting recognition work?',
    answer:
      'The desk-facing camera captures the page, and local OCR is designed to read printed questions, diagrams, and handwritten solutions. Recognition runs on the device so student work does not need to leave the desk for everyday use.',
  },
  {
    id: 'voice',
    question: 'Is voice processing done on the device?',
    answer:
      'Yes — local speech recognition and local text-to-speech are core design goals, so spoken questions and spoken explanations are planned to be processed and generated on the device itself.',
  },
  {
    id: 'escalation',
    question: 'When does a question go to the cloud?',
    answer:
      'Only when local confidence is low for a difficult question, and only within the planned parent-approved privacy mode. The device indicates clearly when optional cloud reasoning is being used, and voice and projection stay local.',
  },
  {
    id: 'updates',
    question: 'How will the device receive updates?',
    answer:
      'Software and model updates are planned to be optional and delivered over the network when available. Core offline capability is a design requirement, so updates should never be mandatory for everyday learning.',
  },
  {
    id: 'privacy',
    question: 'How is student privacy protected?',
    answer:
      'Local processing where practical, minimal data transfer, clear cloud indicators, a planned parent-controlled privacy mode, and no mandatory account for basic offline use. No hidden cloud processing is claimed anywhere in the design.',
  },
  {
    id: 'prototype-hardware',
    question: 'Is the hardware final?',
    answer:
      'No. The current hardware is a prototype selection for feasibility testing. Final specifications — including the projector, cameras, and compute module — may change during prototype testing.',
  },
];
