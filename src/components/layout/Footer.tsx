import { Linkedin, Instagram, Youtube, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { footerLinkGroups } from '../../data/navigation';
import { Container } from '../common/Container';
import { StatusBadge } from '../common/StatusBadge';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="dark-section bg-midnight text-slate-300">
      <Container>
        <div className="grid gap-10 py-14 sm:py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="md:col-span-2 lg:col-span-2">
            <Link
              to="/"
              aria-label="DeskScholar home"
              className="inline-flex min-h-11 items-center rounded-card"
            >
              <Logo tone="dark" iconClass="h-12 lg:h-14" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              An offline-first AI learning companion designed to project step-by-step guidance directly
              onto the learner’s desk — for books, worksheets, and handwriting.
            </p>
            <div className="mt-5">
              <StatusBadge tone="dark" dot pulse>
                Prototype in development
              </StatusBadge>
            </div>
          </div>
          {footerLinkGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="eyebrow text-white">{group.title}</h2>
              <ul className="mt-4 space-y-1">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="inline-flex min-h-10 items-center text-sm text-slate-400 transition-colors hover:text-brand-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="flex flex-col items-start justify-between gap-4 border-t border-dark-line py-6 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} DeskScholar — a product-focused final-year engineering project.
            Final specifications may change.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/company/desk-scholar/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex min-h-10 items-center justify-center text-slate-400 transition-colors hover:text-brand-light"
            >
              <Linkedin className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="https://www.instagram.com/desk.scholar/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex min-h-10 items-center justify-center text-slate-400 transition-colors hover:text-brand-light"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCp5X3aAfk8fM2NGXqf9YOpg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="inline-flex min-h-10 items-center justify-center text-slate-400 transition-colors hover:text-brand-light"
            >
              <Youtube className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="mailto:info@deskscholar.com"
              aria-label="Email"
              className="inline-flex min-h-10 items-center justify-center text-slate-400 transition-colors hover:text-brand-light"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
            </a>
            <div className="mx-2 hidden h-10 w-px bg-dark-line sm:block" aria-hidden="true" />
            <Link to="/privacy" className="inline-flex min-h-10 items-center transition-colors hover:text-brand-light">
              Privacy Policy
            </Link>
            <Link to="/terms" className="inline-flex min-h-10 items-center transition-colors hover:text-brand-light">
              Terms of Use
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
