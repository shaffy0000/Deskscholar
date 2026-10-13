import { BrainCircuit, Mic, Projector, ScanText } from 'lucide-react';

/**
 * Decorative "learning loop" card for page headers — four connected stations
 * with a travelling dot. Purely visual (aria-hidden); the page copy explains it.
 */
const stations = [
  { icon: ScanText, label: 'Reads the page', tone: 'pine' },
  { icon: Mic, label: 'Hears the question', tone: 'sun' },
  { icon: BrainCircuit, label: 'Thinks it through', tone: 'lilac' },
  { icon: Projector, label: 'Projects the next step', tone: 'peach' },
] as const;

export function LoopVisual() {
  return (
    <div className="loopv" aria-hidden="true">
      <div className="loopv-head">
        <span className="loopv-eyes">
          <i />
          <i />
        </span>
        <span>The learning loop</span>
        <span className="loopv-live">Simulated</span>
      </div>
      <ol className="loopv-list">
        {stations.map(({ icon: Icon, label, tone }, i) => (
          <li key={label} style={{ animationDelay: `${i * 0.9}s` }}>
            <span className="tile" data-tone={tone === 'pine' ? undefined : tone}>
              <Icon className="h-5 w-5" />
            </span>
            <span className="loopv-label">{label}</span>
            <span className="loopv-num">0{i + 1}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
