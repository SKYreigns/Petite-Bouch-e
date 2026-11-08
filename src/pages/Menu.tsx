import { useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  business,
  menuSections,
  productsForCategory,
  type CategoryId,
} from '../data/site';
import { ProductCard } from '../components/ui/ProductCard';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { usePageMeta } from '../lib/usePageMeta';

type MenuFilter = CategoryId | 'all';

export function Menu() {
  const [activeFilter, setActiveFilter] = useState<MenuFilter>('all');

  usePageMeta(
    'Our Menu — Petite Bouchée Patisserie, Toronto',
    'Explore the Petite Bouchée counter: cruffins, viennoiserie, cookies, scones, tarts, cakes, Portuguese country bread, savoury bakes and café drinks.'
  );

  const visibleSections =
    activeFilter === 'all'
      ? menuSections
      : menuSections.filter((section) => section.id === activeFilter);

  return (
    <>
      <PageHero
        eyebrow="The bakehouse menu"
        title={
          <>
            A Counter Full of
            <br />
            <span className="italic font-normal text-secondary">
              Favourites.
            </span>
          </>
        }
        description="Cruffins, viennoiserie, cookies, scones, tarts, cakes, Portuguese country bread and savoury bakes. Availability changes daily, so please call or visit for today’s selection."
        image="images/editorial/viennoiserie.jpg"
        imageAlt="A wooden table filled with pastries, croissants and bread at Petite Bouchée"
        caption="Baked for the morning counter in Toronto."
        actions={
          <>
            <a href={`tel:${business.phone.href}`} className="btn btn-primary">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call to Check Today
            </a>
            <Link to="/custom-cakes" className="btn btn-secondary">
              Custom Cake Enquiries
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </>
        }
      />

      <div className="sticky top-16 z-30 border-b border-[#efe5d6] bg-surface/[0.96] backdrop-blur-md lg:top-20">
        <div className="shell flex items-center gap-3 overflow-x-auto py-3 no-scrollbar">
          <span className="label-caps shrink-0 text-outline">Filter</span>
          <button
            type="button"
            aria-pressed={activeFilter === 'all'}
            onClick={() => setActiveFilter('all')}
            className={[
              'min-h-[44px] shrink-0 rounded-sm border px-4 py-2 text-[0.625rem] font-semibold uppercase tracking-[0.12em] transition-all',
              activeFilter === 'all'
                ? 'border-primary bg-primary text-surface'
                : 'border-[#e5dccd] bg-surface-container text-on-surface hover:border-champagne hover:bg-secondary-container/60',
            ].join(' ')}
          >
            All
          </button>
          {menuSections.map((section) => (
            <button
              key={section.id}
              type="button"
              aria-pressed={activeFilter === section.id}
              onClick={() => setActiveFilter(section.id)}
              className={[
                'min-h-[44px] shrink-0 rounded-sm border px-4 py-2 text-[0.625rem] font-semibold uppercase tracking-[0.12em] transition-all',
                activeFilter === section.id
                  ? 'border-primary bg-primary text-surface'
                  : 'border-[#e5dccd] bg-surface-container text-on-surface hover:border-champagne hover:bg-secondary-container/60',
              ].join(' ')}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-surface py-12 lg:py-16">
        <div className="shell">
          <div className="flex flex-col gap-4 border-b border-[#efe5d6] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="body-md max-w-2xl text-on-surface-variant">
              Everything is baked in our Toronto kitchen. Menu availability
              varies daily — call{' '}
              <a
                href={`tel:${business.phone.href}`}
                className="font-medium text-primary underline decoration-champagne underline-offset-4"
              >
                {business.phone.display}
              </a>{' '}
              to check the counter.
            </p>
            <p className="label-caps shrink-0 text-outline">
              {visibleSections.length}{' '}
              {visibleSections.length === 1 ? 'collection' : 'collections'}
            </p>
          </div>

          <p className="sr-only" aria-live="polite">
            Showing {visibleSections.length}{' '}
            {visibleSections.length === 1 ? 'collection' : 'collections'}.
          </p>

          <div className="mt-10 space-y-14 lg:space-y-20">
            {visibleSections.map((section) => {
              const items = productsForCategory(section.id);
              return (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-40"
                  aria-labelledby={`${section.id}-heading`}
                >
                  <div className="flex flex-col gap-3 border-b border-[#efe5d6] pb-5 sm:flex-row sm:items-end sm:justify-between">
                    <SectionHeading
                      as="h2"
                      size="md"
                      id={`${section.id}-heading`}
                      eyebrow={section.kicker}
                      title={section.title}
                      description={section.description}
                      className="max-w-3xl"
                    />
                    <p className="label-caps shrink-0 text-outline">
                      {items.length} {items.length === 1 ? 'bake' : 'bakes'}
                    </p>
                  </div>

                  <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {items.map((product) => (
                      <ProductCard
                        key={product.slug}
                        product={product}
                        showCategory={false}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <div className="mt-14 rounded-lg border border-[#efe5d6] bg-surface-container-low p-6 sm:p-8">
            <h2 className="headline-sm text-xl">A note on ingredients</h2>
            <p className="body-sm mt-2 max-w-3xl text-on-surface-variant">
              Ingredient and allergen information is available in store. Please
              speak with our team before ordering if you have an allergy or
              dietary requirement. Menu items and availability may change
              throughout the day.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-lg bg-primary p-6 text-surface sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="label-caps text-secondary-fixed">
                Planning a celebration?
              </p>
              <h2 className="headline-sm mt-1 text-xl text-surface">
                Let’s design a cake for your milestone.
              </h2>
            </div>
            <Link to="/custom-cakes" className="btn btn-champagne shrink-0">
              Start a Cake Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
