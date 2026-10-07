import { deskScholarImages, deskScholarImageSrcSets } from '../../data/assets';
import '../../styles/sections.css';

/**
 * Image-led editorial section — replaces the old heading + three generic cards.
 * Desktop: large approved concept scene on one side; headline, short explanation
 * and three rule-separated observations on the other. Mobile: headline → image →
 * explanation → observations. Content is fully readable without any animation.
 */
export function ProblemSection() {
  return (
    <section className="pb" id="problem-section" aria-labelledby="problem-heading">
      <div className="pb-inner">
        <div className="pb-grid">
          <h2 className="pb-h2" id="problem-heading">
            Students don&rsquo;t need another screen.
            <br />
            They need a better way to understand.
          </h2>

          <figure className="pb-media">
            <div className="pb-frame">
              <span className="pb-tag">Concept image</span>
              <img
                src={deskScholarImages.projectionCloseup}
                srcSet={deskScholarImageSrcSets.projectionCloseup}
                sizes="(min-width: 1024px) 54vw, calc(100vw - 40px)"
                alt="The DeskScholar unit at a study desk projecting fraction guidance onto an open mathematics worksheet."
                loading="lazy"
                decoding="async"
                width={2000}
                height={1244}
              />
            </div>
            <figcaption className="pb-caption">
              Concept scenario — guidance projected onto the worksheet the student is already reading.
            </figcaption>
          </figure>

          <p className="pb-explain">
            A generic chatbot hands back an answer. A phone turns one question into a feed.
            DeskScholar is planned to keep the student on the page: reading the real worksheet,
            hearing the real question, and projecting the next step where the pen already is.
          </p>

          <ul className="pb-points">
            <li>
              <h3>The method, not just the answer</h3>
              <p>
                Guidance is planned to arrive step by step — hints and reasoning first — so the
                next problem can be solved without help.
              </p>
            </li>
            <li>
              <h3>Eyes on the physical page</h3>
              <p>
                The work stays on paper. No feed, no notifications, and no second screen between
                the question and the understanding.
              </p>
            </li>
            <li>
              <h3>An edition that fits the connection</h3>
              <p>
                Offline capability differs by edition: Independent learns with no internet at all,
                Hybrid reads and checks offline but needs a connection for new explanations, and
                Connect requires steady internet.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
