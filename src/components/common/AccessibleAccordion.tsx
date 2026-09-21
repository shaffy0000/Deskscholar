import { useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '../../data/faq';
import { cn } from '../../utils/cn';

interface AccessibleAccordionProps {
  items: FaqItem[];
  dark?: boolean;
  ariaLabel?: string;
}

/** Accessible FAQ accordion: real buttons, aria-expanded/controls, arrow-key header navigation. */
export function AccessibleAccordion({ items, dark = false, ariaLabel = 'Frequently asked questions' }: AccessibleAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const headerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      headerRefs.current[(index + 1) % items.length]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      headerRefs.current[(index - 1 + items.length) % items.length]?.focus();
    } else if (event.key === 'Home') {
      event.preventDefault();
      headerRefs.current[0]?.focus();
    } else if (event.key === 'End') {
      event.preventDefault();
      headerRefs.current[items.length - 1]?.focus();
    }
  };

  return (
    <div
      className={cn(
        'divide-y overflow-hidden rounded-panel border',
        dark ? 'divide-dark-line border-dark-line bg-deep-navy' : 'divide-line border-line bg-white',
      )}
      role="group"
      aria-label={ariaLabel}
    >
      {items.map((item, index) => {
        const open = openId === item.id;
        return (
          <div key={item.id}>
            <h3>
              <button
                ref={(el) => {
                  headerRefs.current[index] = el;
                }}
                type="button"
                id={`faq-header-${item.id}`}
                aria-expanded={open}
                aria-controls={`faq-panel-${item.id}`}
                onClick={() => setOpenId(open ? null : item.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={cn(
                  'flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-[15px] font-semibold transition-colors sm:px-6 sm:text-base',
                  dark ? 'text-white hover:text-brand-light' : 'text-ink hover:text-brand-dark',
                )}
              >
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    'h-5 w-5 shrink-0 transition-transform duration-200',
                    open && 'rotate-180',
                    dark ? 'text-brand-light' : 'text-brand-dark',
                  )}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-header-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <p className={cn('px-5 pb-5 text-sm leading-relaxed sm:px-6 sm:text-base', dark ? 'text-slate-300' : 'text-muted')}>
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
