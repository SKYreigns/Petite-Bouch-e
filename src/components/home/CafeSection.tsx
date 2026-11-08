import { Coffee, Croissant, UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../ui/SectionHeading';

const experiences = [
  {
    icon: Croissant,
    title: 'Portuguese Country Bread',
    copy: 'A rustic Portuguese-style loaf, baked for the neighbourhood table.',
    note: 'Available during bakery hours.',
    href: '/menu#bread',
  },
  {
    icon: Coffee,
    title: 'Coffee & Tea',
    copy: 'Coffee and tea to enjoy with your bake, available from the counter.',
    note: 'Ask about today’s drinks.',
    href: '/menu#cafe',
  },
  {
    icon: UtensilsCrossed,
    title: 'Savoury Lunch Bakes',
    copy: 'Sandwiches and savoury bakes for a midday bite.',
    note: 'Available during bakery hours.',
    href: '/menu#bread',
  },
];

export function CafeSection() {
  return (
    <section className="border-y border-[#efe5d6] bg-surface-container-low/50 py-16 lg:py-24">
      <div className="shell">
        <SectionHeading
          align="center"
          eyebrow="The bakery counter"
          title="More Than a Sweet Moment"
          description="A neighbourhood stop for morning pastries, fresh bread, coffee and a savoury lunch."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3 lg:gap-8">
          {experiences.map((experience) => (
            <Link
              key={experience.title}
              to={experience.href}
              className="card group flex flex-col justify-between p-6 transition-colors hover:border-secondary"
            >
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-container/50 text-secondary">
                  <experience.icon
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                </span>
                <h3 className="headline-sm mt-4 text-xl">
                  {experience.title}
                </h3>
                <p className="body-sm mt-2 text-on-surface-variant">
                  {experience.copy}
                </p>
              </div>
              <p className="label-caps mt-5 border-t border-[#efe5d6] pt-4 text-secondary">
                {experience.note}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
