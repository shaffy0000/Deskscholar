import { homeFaqs } from '../../data/faq';
import { AccessibleAccordion } from '../common/AccessibleAccordion';
import { Section } from '../common/Section';

export function FAQSection() {
  return (
    <Section
      id="faq"
      anchor
      bordered
      labelledBy="faq-heading"
      heading={{
        label: 'FAQ',
        title: <span id="faq-heading">Honest answers about where DeskScholar is today.</span>,
      }}
      contentClassName="mx-auto max-w-3xl"
    >
      <AccessibleAccordion items={homeFaqs} />
    </Section>
  );
}
