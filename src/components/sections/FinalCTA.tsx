import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import '../../styles/sections.css';

/**
 * The single development-waitlist CTA closing the home page — a warm pine card
 * with the unit's friendly eyes.
 */
export function FinalCTA() {
  return (
    <section id="final-cta" className="fc" aria-labelledby="final-cta-heading">
      <div className="fc-inner">
        <div className="fc-card rise">
          <div className="fc-glow" aria-hidden="true" />
          <div className="fc-eyes" aria-hidden="true">
            <i />
            <i />
          </div>
          <h2 id="final-cta-heading" className="fc-h2">
            Be first to see it on a real desk.
          </h2>
          <p className="fc-sub">
            Join the waitlist for prototype updates, testing invitations and launch news.
            Occasional updates only.
          </p>
          <div className="fc-actions">
            <Link to="/contact" className="fc-primary">
              Join the waitlist
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/editions" className="fc-secondary">
              Explore editions
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
