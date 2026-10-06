import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section } from '../common/Section';
import { ConnectivitySelector } from './ConnectivitySelector';

/**
 * §2.3 — New home page section placed after "Why a device" and before "Who it is for".
 * Title: "Three editions, one idea". Contains the connectivity selector and a link to /editions.
 * No pricing cards here — just the interactive selector.
 */
export function EditionsSection() {
  return (
    <Section
      id="editions-preview"
      tone="dark"
      bordered
      heading={{
        title: 'Three editions, one idea',
        description:
          'Every DeskScholar edition sees the desk, hears the student, and projects guidance. They differ only in where the thinking happens — and that one choice shapes everything else.',
        align: 'center',
      }}
    >
      <ConnectivitySelector />

      <div className="mt-12 text-center">
        <Link
          to="/editions"
          className="inline-flex items-center gap-2 text-sm font-medium text-beam transition-colors duration-micro ease-io hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beam rounded-control"
        >
          Compare all three editions in detail
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </Section>
  );
}
