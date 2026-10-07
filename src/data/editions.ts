/**
 * Edition definitions — the only product facts available for publication.
 * Public slugs only: connect, hybrid, independent. No internal codes anywhere in this file.
 * No monetary figures are published anywhere on this site; subscription facts are
 * stated briefly and without amounts.
 */

export interface Edition {
  slug: 'connect' | 'hybrid' | 'independent';
  name: string;
  position: string;
  facts: [string, string, string];
  /** Brief non-price subscription fact (planned). */
  subscription: string;
  description: string;
  /** Which stages happen on the desk vs on servers — index into the pipeline stages */
  localStages: number;
  internet: string;
  privacy: string;
  bestFor: string;
  answerSpeed: string;
  roomLighting: string;
  whereWorkGoes: string;
  voiceAndGesture: string;
  /** Honest limitation — derived from the approved facts, not new claims. */
  limitation: string;
}

export const editions: Edition[] = [
  {
    slug: 'connect',
    name: 'DeskScholar Connect',
    position: 'The thinking happens on our servers; the desk unit sees, listens, and projects.',
    facts: [
      'Needs a steady internet connection to do anything',
      'With no connection it is a desk lamp',
      'Strongest answers on unusual, open-ended questions',
    ],
    subscription: 'A subscription will be required (planned).',
    description:
      'The thinking happens on our servers; the desk unit sees, listens, and projects. Needs a steady internet connection to do anything — with no connection it is a desk lamp. Answers arrive in a few seconds. The projection is clearest with the room light down. What the camera sees is sent to our servers to be understood. Because it borrows the largest available models, its answers on unusual, open-ended questions are the strongest of the three editions. Built for schools, tuition centres and learning programmes buying several units for one room that already has reliable Wi-Fi. Connect is explicitly not designed for a home with unreliable internet — choosing it in that situation will lead to a poor experience.',
    localStages: 1,
    internet: 'Required for all learning features',
    privacy: 'Camera images are sent to our servers for processing',
    bestFor: 'Schools, tuition centres and learning programmes with reliable Wi-Fi',
    answerSpeed: 'A few seconds',
    roomLighting: 'Clearest with the room light down',
    whereWorkGoes: 'Sent to our servers to be understood',
    voiceAndGesture: 'Planned',
    limitation:
      'Without a connection it cannot do anything. Not designed for homes with unreliable internet.',
  },
  {
    slug: 'hybrid',
    name: 'DeskScholar Hybrid',
    position: 'Reading and hearing happen on the desk; explanations are composed with help from our servers.',
    facts: [
      'The picture of the student\'s work never leaves the room',
      'Without internet it still reads, checks and reads aloud stored material',
      'Slightly faster than Connect',
    ],
    subscription: 'A subscription will be required (planned).',
    description:
      'Reading the page and hearing the student happen on the desk unit; the explanation is composed with help from our servers. The picture of the student\'s work never leaves the room — only the text that was read from it. Without internet it still reads the page, checks working, and reads out stored material; it cannot compose a new explanation. Slightly faster than Connect. The projection holds up with a dim room light on. Built for a household that wants image privacy and still has a connection most evenings.',
    localStages: 3,
    internet: 'Needed for new explanations; basic features work offline',
    privacy: 'Only extracted text is sent — images stay on the device',
    bestFor: 'Households with a connection most evenings wanting image privacy',
    answerSpeed: 'Slightly faster than Connect',
    roomLighting: 'Holds up with a dim room light on',
    whereWorkGoes: 'Only the text read from it is sent; images stay on the device',
    voiceAndGesture: 'Planned',
    limitation:
      'Without internet it cannot compose new explanations — only read, check and read aloud stored material.',
  },
  {
    slug: 'independent',
    name: 'DeskScholar Independent',
    position: 'Everything happens inside the unit. No internet, no account, no required subscription.',
    facts: [
      'Works with no internet at all',
      'Nothing about the student ever leaves the room',
      'Fastest of the three editions',
    ],
    subscription: 'No required subscription.',
    description:
      'Everything happens inside the unit. No internet, no account, no required subscription. Fastest of the three. The brightest projection — readable with normal room lighting on. Nothing about the student ever leaves the room, because nothing is sent anywhere. Built for homes where the connection is unreliable or absent, and for anyone who does not want a data relationship with a company. The honest trade: on very unusual open-ended questions it is occasionally less expansive than Connect.',
    localStages: 4,
    internet: 'Not needed at all',
    privacy: 'Nothing is sent anywhere — everything stays on the device',
    bestFor: 'Homes with unreliable internet, or anyone who wants no data relationship with a company',
    answerSpeed: 'Fastest of the three',
    roomLighting: 'Readable with normal room lighting on',
    whereWorkGoes: 'Nothing leaves the room',
    voiceAndGesture: 'Planned',
    limitation:
      'On very unusual, open-ended questions, answers may be less expansive than Connect.',
  },
];

/** Pipeline stages for diagrams */
export const pipelineStages = [
  'See the desk',
  'Understand the question',
  'Compose the explanation',
  'Project the guidance',
] as const;

/** Plain-language comparison rows (no pricing row — no amounts are published). */
export const comparisonRows = [
  {
    label: 'Works with no internet',
    connect: 'No — needs a steady connection for all features',
    hybrid: 'Partially — reads, checks and reads aloud stored material offline',
    independent: 'Yes — works with no internet at all',
  },
  {
    label: 'Time to an answer',
    connect: 'A few seconds',
    hybrid: 'Slightly faster than Connect',
    independent: 'Fastest of the three',
  },
  {
    label: 'Room lighting needed',
    connect: 'Clearest with the room light down',
    hybrid: 'Holds up with a dim room light on',
    independent: 'Readable with normal room lighting on',
  },
  {
    label: 'Where the student\'s work goes',
    connect: 'Sent to our servers to be understood',
    hybrid: 'Only the text read from it is sent; images stay on the device',
    independent: 'Nothing leaves the room',
  },
  {
    label: 'Voice and gesture',
    connect: 'Planned',
    hybrid: 'Planned',
    independent: 'Planned',
  },
  {
    label: 'Subscription',
    connect: 'Required (planned)',
    hybrid: 'Required (planned)',
    independent: 'None required',
  },
  {
    label: 'Best suited to',
    connect: 'Schools and tuition centres with reliable Wi-Fi',
    hybrid: 'Households wanting image privacy with a connection most evenings',
    independent: 'Homes with unreliable internet, or those wanting no data relationship',
  },
] as const;

/* ────────────────────────────────────────────────────────────────
   "Choose what matters" comparison explorer data.
   One concise answer + one supporting sentence per edition per category.
   Diagram keys select small schematic annotations (decorative; the text
   carries the full meaning, so content works without any visual).
   ──────────────────────────────────────────────────────────────── */

export type EditionSlug = 'connect' | 'hybrid' | 'independent';

export interface ComparisonAnswer {
  summary: string;
  detail: string;
  /** Small schematic shown above the answer (aria-hidden; text is the source of truth). */
  diagram: string;
}

export interface ComparisonCategory {
  id: string;
  /** Short control label. */
  label: string;
  /** Panel heading. */
  heading: string;
  intro: string;
  answers: Record<EditionSlug, ComparisonAnswer>;
}

export const comparisonCategories: ComparisonCategory[] = [
  {
    id: 'internet',
    label: 'Internet',
    heading: 'What each edition needs from your connection',
    intro: 'Connectivity is the first decision — it shapes everything else.',
    answers: {
      connect: {
        summary: 'A steady connection is required',
        detail: 'Every learning feature runs through our servers; without a connection the unit cannot do anything.',
        diagram: 'net-required',
      },
      hybrid: {
        summary: 'A connection for new explanations',
        detail: 'Reading the page, checking working and reading stored material aloud are planned to work offline.',
        diagram: 'net-partial',
      },
      independent: {
        summary: 'No internet at all',
        detail: 'Learning is planned to happen entirely inside the unit, with no account and no network.',
        diagram: 'net-none',
      },
    },
  },
  {
    id: 'privacy',
    label: 'Privacy',
    heading: 'What leaves the room',
    intro: 'Three honest answers: images sent, extracted text sent, or nothing sent.',
    answers: {
      connect: {
        summary: 'Images are sent to our servers',
        detail: 'What the camera sees leaves the room to be understood by server-side models.',
        diagram: 'priv-images',
      },
      hybrid: {
        summary: 'Only extracted text is sent',
        detail: 'The picture of the student\'s work never leaves the room — just the text read from it.',
        diagram: 'priv-text',
      },
      independent: {
        summary: 'Nothing is sent anywhere',
        detail: 'No student information leaves the device, because there is no connection to send it on.',
        diagram: 'priv-nothing',
      },
    },
  },
  {
    id: 'learning',
    label: 'Learning and response',
    heading: 'How answers arrive — and the unusual-question trade-off',
    intro: 'Expected response behaviour, stated as planned rather than measured.',
    answers: {
      connect: {
        summary: 'Answers in a few seconds',
        detail: 'Borrows the largest available models, so unusual, open-ended questions get the strongest answers of the three.',
        diagram: 'speed-slower',
      },
      hybrid: {
        summary: 'Slightly faster than Connect',
        detail: 'Server-assisted explanations carry the same strengths; offline it can check working but cannot compose anything new.',
        diagram: 'speed-mid',
      },
      independent: {
        summary: 'Fastest of the three',
        detail: 'The honest trade: on very unusual, open-ended questions answers may be less expansive than Connect.',
        diagram: 'speed-fast',
      },
    },
  },
  {
    id: 'lighting',
    label: 'Room lighting',
    heading: 'Projection in the room you actually study in',
    intro: 'Planned, qualified descriptions of projection conditions — not measured performance claims.',
    answers: {
      connect: {
        summary: 'Clearest with the room light down',
        detail: 'The planned projection reads best in a dimmed room.',
        diagram: 'light-dim',
      },
      hybrid: {
        summary: 'Holds up with a dim room light on',
        detail: 'Planned to stay usable with low ambient light in the room.',
        diagram: 'light-low',
      },
      independent: {
        summary: 'Readable with normal room lighting on',
        detail: 'The brightest planned projection of the three editions.',
        diagram: 'light-normal',
      },
    },
  },
  {
    id: 'best-for',
    label: 'Best suited to',
    heading: 'Where each edition fits',
    intro: 'The right edition follows from the room it will live in.',
    answers: {
      connect: {
        summary: 'Schools and tuition centres',
        detail: 'Learning programmes buying several units for one room that already has reliable Wi-Fi — not homes with unreliable internet.',
        diagram: 'ctx-school',
      },
      hybrid: {
        summary: 'Households connected most evenings',
        detail: 'Families that want image privacy at the desk and still have a connection when new explanations are needed.',
        diagram: 'ctx-home-evening',
      },
      independent: {
        summary: 'Homes with unreliable or no internet',
        detail: 'And anyone who does not want a data relationship with a company.',
        diagram: 'ctx-home-any',
      },
    },
  },
];
