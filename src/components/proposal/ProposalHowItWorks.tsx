/**
 * PROPOSAL v1 below-the-fold representative section:
 * "How it works" as an editorial rail + a paper worksheet plate with a
 * CORRECT fraction diagram (2/4 = 1/2), replacing unreliable photo maths.
 */
export function ProposalHowItWorks() {
  return (
    <section className="pp-how" aria-labelledby="pp-how-heading">
      <div className="pp-how-inner">
        <div className="pp-how-head pp-reveal">
          <p className="pp-eyebrow">How it works</p>
          <h2 className="pp-how-h2" id="pp-how-heading">
            From a pointed question to projected guidance.
          </h2>
          <p className="pp-how-lede">
            One learning loop, planned for real desk work — the student keeps the pen, the paper and
            the pace.
          </p>
        </div>

        <div className="pp-how-grid">
          <ol className="pp-steps pp-reveal" aria-label="Planned learning loop">
            <span className="pp-steps-fill" aria-hidden="true" />
            <li className="pp-step">
              <span className="pp-step-num" aria-hidden="true">01</span>
              <div>
                <h3>See the desk</h3>
                <p>
                  The desk unit is designed to read the worksheet or book in front of the student and
                  to hear the question spoken aloud — no retyping, no second screen.
                </p>
              </div>
            </li>
            <li className="pp-step">
              <span className="pp-step-num" aria-hidden="true">02</span>
              <div>
                <h3>Understand the question</h3>
                <p>
                  Understanding happens on the unit or on our servers, depending on the edition.
                  Guidance is planned to be composed step by step — hints first, never a bare answer.
                </p>
              </div>
            </li>
            <li className="pp-step">
              <span className="pp-step-num" aria-hidden="true">03</span>
              <div>
                <h3>Project the guidance</h3>
                <p>
                  The unit projects the next step onto the page itself, where the student is already
                  looking. Pen stays in hand; the work stays on paper.
                </p>
              </div>
            </li>
          </ol>

          <div className="pp-plate pp-reveal" role="figure" aria-label="Simulated worksheet with projected fraction guidance showing two-fourths equals one-half">
            <div className="pp-plate-top">
              <span className="pp-plate-kicker">Mathematics · Fractions</span>
              <span className="pp-plate-chip">Simulated projection</span>
            </div>
            <p className="pp-plate-q">“Show that 2/4 is the same as 1/2.”</p>
            <div className="pp-plate-body">
              <svg viewBox="0 0 320 170" className="pp-plate-svg" width="320" height="170" aria-hidden="true" style={{ maxWidth: '100%', height: 'auto' }}>
                {/* left circle: four quarters, two highlighted */}
                <circle cx="80" cy="78" r="58" fill="#FFFFFF" stroke="#0F1319" strokeWidth="2" />
                <path d="M80 78 L80 20 A58 58 0 0 1 138 78 Z" fill="#E89B3C" stroke="#0F1319" strokeWidth="2" />
                <path d="M80 78 L138 78 A58 58 0 0 1 80 136 Z" fill="#E89B3C" stroke="#0F1319" strokeWidth="2" />
                <line x1="80" y1="20" x2="80" y2="136" stroke="#0F1319" strokeWidth="2" />
                <line x1="22" y1="78" x2="138" y2="78" stroke="#0F1319" strokeWidth="2" />
                <text x="80" y="160" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0F1319" fontFamily="'Space Grotesk', sans-serif">2/4</text>

                <text x="163" y="86" textAnchor="middle" fontSize="24" fontWeight="700" fill="#5A6472" fontFamily="'Space Grotesk', sans-serif">=</text>

                {/* right circle: two halves, one highlighted */}
                <circle cx="246" cy="78" r="58" fill="#FFFFFF" stroke="#0F1319" strokeWidth="2" />
                <path d="M246 78 L246 20 A58 58 0 0 1 246 136 Z" fill="#E89B3C" stroke="#0F1319" strokeWidth="2" />
                <line x1="246" y1="20" x2="246" y2="136" stroke="#0F1319" strokeWidth="2" />
                <text x="246" y="160" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0F1319" fontFamily="'Space Grotesk', sans-serif">1/2</text>
              </svg>
              <p className="pp-plate-eq" aria-hidden="true">
                2/4 <span className="pp-eq-beam">=</span> 1/2
            </p>
            </div>
            <p className="pp-plate-caption">
              Simulated example for illustration — projected guidance like this is planned, not yet
              working hardware. Two of four equal parts is the same amount as one of two.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
