import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, Youtube } from 'lucide-react';
import { CONTACT_EMAIL, footerLinkGroups, socialLinks } from '../../data/navigation';
import { Logo } from './Logo';

const socialIcons = {
  LinkedIn: Linkedin,
  Instagram,
  YouTube: Youtube,
} as const;

/**
 * One compact, integrated footer on the shared light background.
 * Desktop: brand · Product · Company · Contact & follow — all top-aligned,
 * then one thin bottom row (copyright → privacy/terms → contact).
 * Mobile: brand → two link columns → contact & socials → legal row.
 * No oversized pills, no forced height, no empty band, no repeated waitlist CTA.
 */
export function Footer() {
  return (
    <footer className="border-t border-[var(--hairline-dark)] bg-[var(--ink-900)]">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-9 py-10 md:grid-cols-4 md:py-12 lg:gap-x-10">
          {/* Brand — spans both columns on phones, first cell on desktop */}
          <div className="col-span-2 md:col-span-1">
            <Link
              to="/"
              aria-label="DeskScholar home"
              className="inline-flex min-h-11 items-center rounded-[var(--radius-control)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--beam)]"
            >
              <Logo />
            </Link>
            <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-[var(--text-lo)]">
              A desk-based learning companion in three planned editions.
            </p>
            <p className="mt-2 max-w-xs text-[12.5px] leading-relaxed text-[var(--text-lo)]">
              Currently in prototype development. Capabilities may change during testing.
            </p>
          </div>

          {/* Product / Company link columns */}
          {footerLinkGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--text-hi)]">
                {group.title}
              </h2>
              <ul className="mt-3.5 space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-[14px] leading-none text-[var(--text-lo)] transition-colors duration-[var(--t-micro)] hover:text-[var(--beam)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--beam)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact & socials — one clearly labelled group */}
          <nav aria-label="Contact and social">
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--text-hi)]">
              Contact &amp; follow
            </h2>
            <ul className="mt-3.5 space-y-2">
              <li>
                <Link
                  to="/contact"
                  className="text-[14px] leading-none text-[var(--text-lo)] transition-colors duration-[var(--t-micro)] hover:text-[var(--beam)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--beam)]"
                >
                  Contact the team
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[14px] leading-none text-[var(--text-lo)] transition-colors duration-[var(--t-micro)] hover:text-[var(--beam)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--beam)]"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
            <div className="mt-4 flex items-center gap-1">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.label as keyof typeof socialIcons];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] text-[var(--text-lo)] transition-colors duration-[var(--t-micro)] hover:bg-[var(--surface-2)] hover:text-[var(--beam)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--beam)]"
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </a>
                );
              })}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label="Email DeskScholar"
                title="Email"
                className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] text-[var(--text-lo)] transition-colors duration-[var(--t-micro)] hover:bg-[var(--surface-2)] hover:text-[var(--beam)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--beam)]"
              >
                <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>

        {/* Compact bottom row: copyright → privacy/terms → contact */}
        <div className="flex flex-col items-start justify-between gap-2 border-t border-[var(--hairline-dark)] py-5 text-[13px] text-[var(--text-lo)] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} DeskScholar</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              to="/privacy"
              className="transition-colors duration-[var(--t-micro)] hover:text-[var(--beam)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--beam)]"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="transition-colors duration-[var(--t-micro)] hover:text-[var(--beam)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--beam)]"
            >
              Terms of Use
            </Link>
            <Link
              to="/contact"
              className="font-medium text-[var(--beam)] transition-colors duration-[var(--t-micro)] hover:text-[var(--beam-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--beam)]"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
