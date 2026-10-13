import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
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
        label="Waitlist & contact"
        title="Save your spot at the desk."
        description="Join the waitlist for prototype updates and testing invitations — or reach the team about schools, research, hardware or partnerships."
      />

      <Section narrow ariaLabel="Waitlist and contact forms">
        <div className="rounded-[28px] border border-[var(--hairline-dark)] bg-white p-6 shadow-[var(--shadow-lift)] sm:p-10">
          <AccessibleTabs
            items={[
              {
                id: 'early-access',
                label: 'Join the waitlist',
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

        <p className="mt-5 flex items-start justify-center gap-2 text-center text-[13px] leading-relaxed text-[var(--text-lo)]">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--beam)]" aria-hidden="true" />
          <span>
            Submissions are emailed to the team via Formspree — no database, no selling, no spam.
            Details in our{' '}
            <Link to="/privacy" className="font-semibold text-[var(--beam)] underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </span>
        </p>
      </Section>
    </>
  );
}
