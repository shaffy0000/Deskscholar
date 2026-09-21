import { Link } from 'react-router-dom';
import { LegalPage, LegalSection } from '../components/common/LegalPage';
import { Seo } from '../components/common/Seo';

export default function TermsPage() {
  return (
    <>
      <Seo route="terms" />
      <LegalPage
        title="Terms of Use"
        updated="Last updated: prototype stage — this text must be reviewed by a qualified professional before any commercial launch."
        intro={
          <>
            <strong>DeskScholar is a prototype-stage project.</strong> By using this website you accept these
            terms. If you do not accept them, please do not use the website.
          </>
        }
      >
        <LegalSection title="Prototype status">
          <p>
            DeskScholar is a product-focused final-year engineering project currently in development. Nothing
            on this website constitutes an offer to sell a finished product. Features described as “planned”,
            “designed to”, or “in progress” are development goals and may change without notice. Final
            hardware and software specifications may change during prototype testing.
          </p>
        </LegalSection>

        <LegalSection title="Informational content">
          <p>
            Website content is provided for general informational purposes. It is not educational, legal, or
            financial advice. While we strive for accuracy, no warranty is given that the content is
            complete, current, or error-free.
          </p>
        </LegalSection>

        <LegalSection title="No guarantees">
          <ul>
            <li>No guarantee of product availability.</li>
            <li>No confirmed launch date.</li>
            <li>No confirmed retail price.</li>
            <li>No guaranteed educational outcomes or performance results.</li>
          </ul>
          <p>
            Registering for early access or expressing pilot interest creates no obligation for either party
            and does not constitute a purchase, reservation, or contract.
          </p>
        </LegalSection>

        <LegalSection title="Intellectual property">
          <p>
            The DeskScholar name, logo, website design, text, illustrations, and the interactive demo are the
            intellectual property of the project team and are protected by applicable law. You may not copy,
            modify, redistribute, or create derivative works from website content without prior written
            permission, except for reasonable personal, non-commercial reference.
          </p>
        </LegalSection>

        <LegalSection title="Acceptable use">
          <p>You agree not to:</p>
          <ul>
            <li>Use the website for any unlawful purpose.</li>
            <li>Submit spam, malicious content, or false information through the forms.</li>
            <li>Attempt to disrupt, probe, or overload the website or its APIs.</li>
            <li>Impersonate any person, school, or organization.</li>
          </ul>
        </LegalSection>

        <LegalSection title="Submissions">
          <p>
            Information you submit through the forms may be forwarded to the project team by email and used
            to respond to your enquiry and to plan future prototype testing. Do not submit confidential,
            sensitive, or third-party personal information.
          </p>
        </LegalSection>

        <LegalSection title="External links">
          <p>
            This website may link to third-party services (such as font or hosting providers). We do not
            control and are not responsible for the content or policies of third-party websites.
          </p>
        </LegalSection>

        <LegalSection title="Limitation of liability">
          <p>
            To the maximum extent permitted by law, the website is provided “as is” without warranties of any
            kind, and the project team shall not be liable for any indirect, incidental, or consequential
            damages arising from the use of this website or reliance on its content. This limitation does not
            exclude liability that cannot lawfully be excluded.
          </p>
        </LegalSection>

        <LegalSection title="Changes to these terms">
          <p>
            These terms may be updated as the project evolves. Continued use of the website after changes
            constitutes acceptance of the updated terms.
          </p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>
            Questions about these terms can be sent through the{' '}
            <Link to="/contact" className="font-semibold text-brand-dark underline underline-offset-4">
              contact page
            </Link>
            .
          </p>
        </LegalSection>
      </LegalPage>
    </>
  );
}
