import { Mail, MapPin, ShieldCheck } from 'lucide-react';
import { AccessibleTabs } from '../components/common/AccessibleTabs';
import { PageHeader } from '../components/common/PageHeader';
import { Section } from '../components/common/Section';
import { Seo } from '../components/common/Seo';
import { ContactForm } from '../components/forms/ContactForm';
import { EarlyAccessForm } from '../components/forms/EarlyAccessForm';

export default function ContactPage() {
  return (
    <>
      <Seo route="contact" />
      <PageHeader
        label="Contact"
        title="Help shape the future of DeskScholar."
        description="Join early access, express interest in future prototype testing, or contact the team about education, research, hardware, product, and investment collaboration."
      />

      <Section narrow ariaLabel="Early access and contact forms">
        <div className="rounded-hero border border-line bg-white p-6 shadow-card sm:p-10">
          <AccessibleTabs
            items={[
              {
                id: 'early-access',
                label: 'Join Early Access',
                content: (
                  <div className="pt-8">
                    <EarlyAccessForm />
                  </div>
                ),
              },
              {
                id: 'contact',
                label: 'Contact the Team',
                content: (
                  <div className="pt-8">
                    <ContactForm />
                  </div>
                ),
              },
            ]}
          />
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          <li className="flex items-start gap-3 rounded-card border border-line bg-white p-4 shadow-soft">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-dark" aria-hidden="true" />
            <p className="text-[13px] leading-relaxed text-muted">
              Form submissions may be forwarded to the project team by email.
            </p>
          </li>
          <li className="flex items-start gap-3 rounded-card border border-line bg-white p-4 shadow-soft">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-aqua-dark" aria-hidden="true" />
            <p className="text-[13px] leading-relaxed text-muted">
              This website does not store submissions in a dedicated application database.
            </p>
          </li>
          <li className="flex items-start gap-3 rounded-card border border-line bg-white p-4 shadow-soft">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-dark" aria-hidden="true" />
            <p className="text-[13px] leading-relaxed text-muted">
              DeskScholar is a prototype-stage project. Response times may vary during development.
            </p>
          </li>
        </ul>
      </Section>
    </>
  );
}
