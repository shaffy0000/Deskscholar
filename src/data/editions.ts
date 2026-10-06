/**
 * Edition definitions — the only product facts available for publication.
 * Public slugs only: connect, hybrid, independent. No internal codes anywhere in this file.
 */

export interface Edition {
  slug: 'connect' | 'hybrid' | 'independent';
  name: string;
  position: string;
  facts: [string, string, string];
  subscription: string;
  subscriptionQualifier: string;
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
    subscription: 'Around PKR 2,500 per month, required',
    subscriptionQualifier: 'Planned pricing for a product still in development. Not an offer.',
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
    subscription: 'Around PKR 1,000 per month, required',
    subscriptionQualifier: 'Planned pricing for a product still in development. Not an offer.',
    description:
      'Reading the page and hearing the student happen on the desk unit; the explanation is composed with help from our servers. The picture of the student\'s work never leaves the room — only the text that was read from it. Without internet it still reads the page, checks working, and reads out stored material; it cannot compose a new explanation. Slightly faster than Connect. The projection holds up with a dim room light on. Built for a household that wants the privacy and the lower running cost but still has a connection most evenings.',
    localStages: 3,
    internet: 'Needed for new explanations; basic features work offline',
    privacy: 'Only extracted text is sent — images stay on the device',
    bestFor: 'Households with a connection most evenings wanting privacy and lower cost',
    answerSpeed: 'Slightly faster than Connect',
    roomLighting: 'Holds up with a dim room light on',
    whereWorkGoes: 'Only the text read from it is sent; images stay on the device',
    voiceAndGesture: 'Planned',
  },
  {
    slug: 'independent',
    name: 'DeskScholar Independent',
    position: 'Everything happens inside the unit. No internet, no account, no subscription.',
    facts: [
      'Works with no internet at all',
      'Nothing about the student ever leaves the room',
      'Fastest of the three editions',
    ],
    subscription: 'None required',
    subscriptionQualifier: 'An optional companion plan is planned at around PKR 500 per month for curriculum packs and the parent dashboard. Planned pricing for a product still in development. Not an offer.',
    description:
      'Everything happens inside the unit. No internet, no account, no subscription, nothing to switch off if a payment stops. Fastest of the three. The brightest projection — readable with normal room lighting on. Nothing about the student ever leaves the room, because nothing is sent anywhere. Built for homes where the connection is unreliable or absent, and for anyone who does not want a data relationship with a company. The honest trade: on very unusual open-ended questions it is occasionally less expansive than Connect.',
    localStages: 4,
    internet: 'Not needed at all',
    privacy: 'Nothing is sent anywhere — everything stays on the device',
    bestFor: 'Homes with unreliable internet, or anyone who wants no data relationship with a company',
    answerSpeed: 'Fastest of the three',
    roomLighting: 'Readable with normal room lighting on',
    whereWorkGoes: 'Nothing leaves the room',
    voiceAndGesture: 'Planned',
  },
];

/** Pipeline stages for the connectivity selector */
export const pipelineStages = [
  'See the desk',
  'Understand the question',
  'Compose the explanation',
  'Project the guidance',
] as const;

/** Comparison table rows — seven rows, plain language, no ticks and crosses */
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
    label: 'Monthly subscription',
    connect: 'Around PKR 2,500 per month, required (planned, indicative)',
    hybrid: 'Around PKR 1,000 per month, required (planned, indicative)',
    independent: 'None required; optional companion plan around PKR 500 per month (planned, indicative)',
  },
  {
    label: 'Best suited to',
    connect: 'Schools and tuition centres with reliable Wi-Fi',
    hybrid: 'Households wanting privacy with a connection most evenings',
    independent: 'Homes with unreliable internet, or those wanting no data relationship',
  },
] as const;
