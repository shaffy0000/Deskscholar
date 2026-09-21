import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface AccessibleTabsProps {
  items: TabItem[];
  defaultTab?: string;
  className?: string;
}

/** WAI-ARIA tabs pattern with roving tabindex and arrow-key navigation. */
export function AccessibleTabs({ items, defaultTab, className }: AccessibleTabsProps) {
  const [activeId, setActiveId] = useState(defaultTab ?? items[0]?.id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (index: number) => {
    const next = items[index];
    if (!next) return;
    setActiveId(next.id);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      focusTab((index + 1) % items.length);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      focusTab((index - 1 + items.length) % items.length);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusTab(items.length - 1);
    }
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Early access and contact forms"
        className="grid w-full grid-cols-2 gap-1 overflow-hidden rounded-full border border-line bg-ivory p-1"
      >
        {items.map((item, index) => {
          const selected = item.id === activeId;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              id={`tab-${item.id}`}
              type="button"
              aria-selected={selected}
              aria-controls={`panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                'min-h-12 w-full rounded-full px-4 py-3 text-center text-sm font-semibold transition-colors',
                selected
                  ? 'bg-brand text-white'
                  : 'bg-transparent text-ink hover:bg-muted/10',
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`panel-${item.id}`}
          aria-labelledby={`tab-${item.id}`}
          hidden={item.id !== activeId}
          tabIndex={0}
          className="rounded-panel focus-visible:ring-2 focus-visible:ring-brand"
        >
          {item.id === activeId && item.content}
        </div>
      ))}
    </div>
  );
}
