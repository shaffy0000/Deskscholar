import { Linkedin, Instagram, Youtube, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { footerLinkGroups } from '../../data/navigation';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-ink-900 border-t border-[var(--hairline-dark)]">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-[120px]">
        <div className="grid gap-10 py-[72px] lg:py-[120px] md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="md:col-span-2 lg:col-span-2">
            <Link
              to="/"
              aria-label="DeskScholar home"
              className="inline-flex min-h-11 items-center rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beam"
            >
              <Logo iconClass="h-12 lg:h-14" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-lo">
              An offline-first AI learning companion designed to project step-by-step guidance directly
              onto the learner’s desk — for books, worksheets, and handwriting.
            </p>
            <div className="mt-5">
              <span className="inline-flex items-center rounded-full border border-[var(--hairline-dark)] bg-ink-800 px-3 py-1 text-sm font-medium text-text-hi">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-beam" aria-hidden="true" />
                Prototype in development
              </span>
            </div>
          </div>
          {footerLinkGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-sm font-semibold text-text-hi">{group.title}</h2>
              <ul className="mt-4 space-y-1">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="inline-flex min-h-10 items-center text-sm text-text-lo transition-colors duration-micro hover:text-beam focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beam rounded-control"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="flex flex-col items-start justify-between gap-4 border-t border-[var(--hairline-dark)] py-6 text-xs text-text-lo sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} DeskScholar — a product-focused final-year engineering project.
            Final specifications may change.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://www.linkedin.com/company/desk-scholar/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex min-h-10 items-center justify-center text-text-lo transition-colors duration-micro hover:text-beam focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beam rounded-control"
            >
              <Linkedin className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="https://www.instagram.com/desk.scholar/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex min-h-10 items-center justify-center text-text-lo transition-colors duration-micro hover:text-beam focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beam rounded-control"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCp5X3aAfk8fM2NGXqf9YOpg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="inline-flex min-h-10 items-center justify-center text-text-lo transition-colors duration-micro hover:text-beam focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beam rounded-control"
            >
              <Youtube className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="mailto:info@deskscholar.com"
              aria-label="Email"
              className="inline-flex min-h-10 items-center justify-center text-text-lo transition-colors duration-micro hover:text-beam focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beam rounded-control"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
            </a>
            <div className="mx-2 hidden h-4 w-px bg-[var(--hairline-dark)] sm:block" aria-hidden="true" />
            <Link to="/privacy" className="inline-flex min-h-10 items-center transition-colors duration-micro hover:text-beam focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beam rounded-control">
              Privacy Policy
            </Link>
            <Link to="/terms" className="inline-flex min-h-10 items-center transition-colors duration-micro hover:text-beam focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beam rounded-control">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
