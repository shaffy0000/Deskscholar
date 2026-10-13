import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUp, Instagram, Linkedin, Mail, Youtube } from 'lucide-react';
import { CONTACT_EMAIL, footerLinkGroups, socialLinks } from '../../data/navigation';
import { Logo } from './Logo';
import '../../styles/footer.css';

const socialIcons = {
  LinkedIn: Linkedin,
  Instagram,
  YouTube: Youtube,
} as const;

/**
 * Dark "night desk" footer: brand + waitlist nudge, link columns, round social
 * buttons, a giant faded wordmark with the unit's blinking eyes, and a legal row.
 */
export function Footer() {
  return (
    <footer className="ft">
      <div className="ft-glow" aria-hidden="true" />
      <div className="ft-inner">
        {/* Top: brand + waitlist nudge */}
        <div className="ft-top">
          <div className="ft-brand">
            <Link to="/" aria-label="DeskScholar home" className="ft-logo">
              <Logo tone="light" />
            </Link>
            <p className="ft-tagline">
              A desk-based learning companion that reads the page, hears the question and projects
              the next step — in three planned editions.
            </p>
            <p className="ft-status">
              <span aria-hidden="true" />
              Prototype in development · capabilities may change during testing
            </p>
          </div>

          <div className="ft-nudge">
            <p className="ft-nudge-title">Be first to try it on a real desk.</p>
            <p className="ft-nudge-sub">Prototype updates and testing invitations. Occasional emails only.</p>
            <Link to="/contact" className="ft-nudge-btn">
              Join the waitlist
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Middle: link columns */}
        <div className="ft-cols">
          {footerLinkGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="ft-h">{group.title}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="ft-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-label="Contact and social">
            <h2 className="ft-h">Contact &amp; follow</h2>
            <ul>
              <li>
                <Link to="/contact" className="ft-link">
                  Contact the team
                </Link>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="ft-link">
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
            <div className="ft-social">
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
                    data-net={social.label}
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </a>
                );
              })}
              <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email DeskScholar" title="Email" data-net="Email">
                <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>

        {/* Giant faded wordmark with the unit's eyes */}
        <div className="ft-mark" aria-hidden="true">
          <span>DeskScholar</span>
          <span className="ft-eyes">
            <i />
            <i />
          </span>
        </div>

        {/* Legal row */}
        <div className="ft-bottom">
          <p>© {new Date().getFullYear()} DeskScholar · Made with care in Lahore</p>
          <div className="ft-legal">
            <Link to="/privacy" className="ft-link">
              Privacy Policy
            </Link>
            <Link to="/terms" className="ft-link">
              Terms of Use
            </Link>
            <button
              type="button"
              className="ft-top-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to top
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
