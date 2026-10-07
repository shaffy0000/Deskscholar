export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * General FAQs — published on the dedicated /faq route.
 * No monetary figures anywhere; subscription facts are stated briefly.
 */
export const faqs: FaqItem[] = [
  {
    id: 'what-is',
    question: 'What is DeskScholar?',
    answer:
      'DeskScholar is an offline-first AI learning companion designed for physical desk-based study. It is being built to see books, worksheets, and handwriting through a desk-facing camera, understand spoken questions, and project step-by-step guidance directly onto the workspace. It is currently a product-focused prototype in development by an early-stage team.',
  },
  {
    id: 'offline',
    question: 'Does it work without the internet?',
    answer:
      'It depends on the edition. DeskScholar Independent works with no internet at all — everything happens on the device. DeskScholar Hybrid reads the page and checks working offline but needs a connection to compose new explanations. DeskScholar Connect needs a steady internet connection for all learning features.',
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
      'Not yet. DeskScholar is in prototype development by an early-stage EdTech hardware team. Capabilities described on this website are planned or in progress, and final specifications may change during testing.',
  },
  {
    id: 'subscription',
    question: 'Will it require a subscription?',
    answer:
      'DeskScholar Connect and DeskScholar Hybrid are planned to require a subscription because they depend on servers that cost money to run. DeskScholar Independent is planned to need no required subscription because everything happens on the device. Figures are not published while the product is still in development.',
  },
  {
    id: 'which-edition',
    question: 'Which edition should I choose?',
    answer:
      'Start with connectivity. If your internet is unreliable or absent, Independent is the clear choice — it works with no connection at all. If image privacy matters most and you have a connection most evenings, Hybrid keeps images on the device and sends only text. If you are equipping a school or tuition centre with reliable Wi-Fi and want the strongest answers on unusual questions, Connect is built for that.',
  },
  {
    id: 'data',
    question: 'Is student data sent to the cloud?',
    answer:
      'It depends on the edition. DeskScholar Independent sends nothing anywhere — everything stays on the device. DeskScholar Hybrid sends only extracted text, never images. DeskScholar Connect sends camera images to our servers for processing. Each edition is honest about what it sends and where, and the choice is yours.',
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
      'The architecture targets compact on-device models for speech recognition, text-to-speech, OCR, and everyday tutoring on Hybrid and Independent, sized to run on the built-in compute module. Specific models are still being evaluated during prototype testing.',
  },
  {
    id: 'offline-mode',
    question: 'What exactly works in offline mode?',
    answer:
      'It depends on the edition. Independent is designed to run the full learning loop on the device with no network. Hybrid is planned to keep reading the page, checking working and reading stored material aloud offline, but cannot compose new explanations without a connection. Connect requires a steady connection for all learning features.',
  },
  {
    id: 'ocr',
    question: 'How does worksheet and handwriting recognition work?',
    answer:
      'The desk-facing camera captures the page, and OCR is designed to read printed questions, diagrams, and handwritten solutions. On Hybrid and Independent, recognition runs on the device; on Connect, the captured page is understood on our servers.',
  },
  {
    id: 'voice',
    question: 'Is voice processing done on the device?',
    answer:
      'Local speech recognition and local text-to-speech are core design goals for Hybrid and Independent, so spoken questions and spoken explanations are planned to be processed and generated on the device itself. Connect plans the same desk-side voice experience with understanding handled on our servers.',
  },
  {
    id: 'escalation',
    question: 'When does a question go to the cloud?',
    answer:
      'It depends on the edition. On Connect, questions are composed on our servers by design, and the device clearly depends on that connection. On Hybrid, only the text extracted from the page is sent when a new explanation is needed — never images. On Independent, nothing is ever sent anywhere.',
  },
  {
    id: 'updates',
    question: 'How will the device receive updates?',
    answer:
      'Software and model updates are planned to be optional and delivered over the network when available. Core offline capability on Hybrid and Independent is a design requirement, so updates should never be mandatory for everyday learning.',
  },
  {
    id: 'privacy',
    question: 'How is student privacy protected?',
    answer:
      'Local processing where practical, minimal data transfer, clear indicators of where work is processed, a planned parent-controlled privacy mode, and no mandatory account for Independent. No hidden cloud processing is claimed anywhere in the design.',
  },
  {
    id: 'prototype-hardware',
    question: 'Is the hardware final?',
    answer:
      'No. The current hardware is a prototype selection for feasibility testing. Final specifications may change during prototype testing.',
  },
];
