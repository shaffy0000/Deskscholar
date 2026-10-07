import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { EditionSpotlight } from './EditionSpotlight';
import '../../styles/sections.css';

/**
 * Homepage three-edition showcase — a compact, image-led spotlight.
 * No prices and no comparison table here; the detailed comparison lives on /editions.
 */
export function EditionsSection() {
  return (
    <section id="editions-preview" className="es" aria-labelledby="editions-preview-heading">
      <div className="es-inner">
        <div className="es-head">
          <p className="es-eyebrow">Three planned editions</p>
          <h2 className="es-h2" id="editions-preview-heading">
            Three editions, one idea.
          </h2>
          <p className="es-lede">
            Every DeskScholar edition sees the desk, hears the student, and projects guidance.
            They differ in where the thinking happens — choose one to see what that means.
          </p>
        </div>

        <EditionSpotlight />

        <div className="es-foot">
          <Link to="/editions" className="es-compare">
            Compare all three editions in detail
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
