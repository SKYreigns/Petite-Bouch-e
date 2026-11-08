import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  featuredProducts,
  signatureFilters,
} from '../../data/site';
import { ProductCard } from '../ui/ProductCard';
import { SectionHeading } from '../ui/SectionHeading';

export function SignatureBakes() {
  const [activeFilter, setActiveFilter] = useState('all');

  const visibleProducts = useMemo(() => {
    const filter = signatureFilters.find(
      (entry) => entry.id === activeFilter
    );
    if (!filter?.tag) return featuredProducts;
    return featuredProducts.filter((product) =>
      product.tags.includes(filter.tag as string)
    );
  }, [activeFilter]);

  return (
    <section id="signature-bakes" className="bg-surface py-16 lg:py-24">
      <div className="shell">
        <SectionHeading
          align="center"
          eyebrow="Handcrafted favourites"
          title="A Closer Look at Our Bakes"
          description="A few of the bakes our counter is known for. Availability changes daily — call or visit to see what is in the vitrine today."
        />

        <div
          className="mt-7 flex flex-wrap items-center justify-center gap-2"
          role="group"
          aria-label="Filter signature bakes"
        >
          {signatureFilters.map((filter) => {
            const selected = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveFilter(filter.id)}
                className={[
                  'min-h-[44px] rounded-sm border px-4 py-2 text-[0.625rem] font-semibold uppercase tracking-[0.12em] transition-all duration-200',
                  selected
                    ? 'border-primary bg-primary text-surface'
                    : 'border-[#e5dccd] bg-surface-container text-on-surface hover:border-champagne hover:bg-secondary-container/60',
                ].join(' ')}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {visibleProducts.length}{' '}
          {visibleProducts.length === 1 ? 'bake' : 'bakes'}.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {visibleProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {visibleProducts.length === 0 ? (
          <p className="body-md mt-10 text-center text-on-surface-variant">
            No bakes match this filter right now. Please explore the full menu.
          </p>
        ) : null}

        <div className="mt-10 flex justify-center">
          <Link to="/menu" className="btn btn-secondary">
            View the Full Menu
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
