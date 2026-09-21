import { Link } from 'react-router-dom';
import { LegalPage, LegalSection } from '../components/common/LegalPage';
import { Seo } from '../components/common/Seo';

export default function PrivacyPage() {
  return (
    <>
      <Seo route="privacy" />
      <LegalPage
        title="Privacy Policy"
        updated="Last updated: prototype stage — this policy will be revised before any commercial launch."
        intro={
          <>
            <strong>DeskScholar is a prototype-stage project.</strong> This policy describes only this marketing
            website. The physical device is still in development, and its privacy controls (including a
            parent-controlled privacy mode) are planned features, not shipped functionality.
          </>
        }
      >
        <LegalSection title="What this website collects">
          <p>
            Form submissions may be forwarded to the project team by email. This website does not store
            submissions in a dedicated application database. There is no user account system, no sign-in, and
            no profiles.
          </p>
          <p>
            This marketing website does not collect student learning records, worksheet images, audio
            recordings, or any data from the DeskScholar device itself.
          </p>
        </LegalSection>

        <LegalSection title="Information you choose to provide">
          <ul>
            <li>Early access form: name, email, role, country, and an optional message.</li>
            <li>Contact form: name, email, organization, subject, and message.</li>
            <li>School pilot interest form: name, work email, school or organization, role, country, approximate student count, and intended use.</li>
          </ul>
          <p>
            Please do not include sensitive personal information about yourself or students in any form field.
          </p>
        </LegalSection>

        <LegalSection title="How submissions are handled">
          <p>
            The early access and contact forms are submitted directly from your browser to{' '}
            <strong>Formspree</strong>, a third-party form-processing service, which forwards them to the
            project team. Form submissions may include your name, email address, role, country and message.
            This information is used only to respond to enquiries, manage early-access interest, and — where
            you have given consent — communicate prototype updates.
          </p>
          <p>
            The school pilot form is validated by this website’s serverless API and may be forwarded to the
            project team by email. This website does not store submissions in a dedicated application
            database, but we do not claim that they are retained nowhere: Formspree, email providers and
            hosting logs may keep copies under their own policies. Please do not submit passwords, payment
            information or highly sensitive personal data through any form.
          </p>
          <p>
            A temporary reference identifier may be generated for API-routed submissions; it is only a
            request reference and does not mean any data was stored by the website.
          </p>
        </LegalSection>

        <LegalSection title="Third-party services">
          <ul>
            <li>
              <strong>Formspree (form processing):</strong> the early access and contact forms submit
              directly to Formspree, a third-party form-processing service, which forwards the entries to
              the project team. Formspree processes the submitted content (which may include your name,
              email, role, country and message) and may retain submissions according to its own policy.
            </li>
            <li>
              <strong>Resend (email delivery):</strong> the school pilot form is forwarded to the project
              team through Resend when configured. Email providers may retain delivered messages according
              to their own policies. We cannot truthfully claim that submitted messages are never retained
              anywhere.
            </li>
            <li>
              <strong>Vercel (hosting):</strong> this website is hosted on Vercel. Basic platform and server
              logs (such as request metadata) may exist as part of normal hosting operations.
            </li>
            <li>
              <strong>Cloudflare Stream (demo video):</strong> DeskScholar uses Cloudflare Stream to deliver
              its prototype demonstration video. The Cloudflare video player is loaded only after a visitor
              chooses to play the video. Playback may result in technical information, such as the visitor’s
              IP address, browser details and playback activity, being processed by Cloudflare to deliver
              the video.
            </li>
          </ul>
          <p className="mt-3">
            Fonts are self-hosted with this website. No third-party font providers or analytics trackers are
            contacted while browsing; the video player above loads only on deliberate play.
          </p>
        </LegalSection>

        <LegalSection title="Cookies and analytics">
          <p>
            This website does not set first-party tracking cookies and does not currently use advertising or
            analytics trackers. If analytics are added later, this policy will be updated to disclose them
            accurately.
          </p>
        </LegalSection>

        <LegalSection title="Spam protection">
          <p>
            The forms use a hidden honeypot field and lightweight rate limiting to reduce spam. These
            mechanisms do not build profiles and do not store submissions.
          </p>
        </LegalSection>

        <LegalSection title="Children's privacy">
          <p>
            This website is not directed at children and does not knowingly collect personal information from
            children. The DeskScholar device concept includes planned parent-controlled privacy features for
            student use; those are design goals, not current functionality.
          </p>
        </LegalSection>

        <LegalSection title="Contacting the project team">
          <p>
            Questions about this privacy policy can be sent through the{' '}
            <Link to="/contact" className="font-semibold text-brand-dark underline underline-offset-4">
              contact page
            </Link>
            . Responses may be slower during active development periods.
          </p>
        </LegalSection>
      </LegalPage>
    </>
  );
}
