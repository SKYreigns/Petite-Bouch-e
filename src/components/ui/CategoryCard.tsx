import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { asset } from '../../lib/asset';
import type { MenuCategory } from '../../data/site';

interface CategoryCardProps {
  category: MenuCategory;
  productCount?: number;
}

export function CategoryCard({ category, productCount }: CategoryCardProps) {
  return (
    <Link
      to={category.href}
      className="card card-hover group flex h-full flex-col overflow-hidden"
      aria-label={`${category.title} — ${category.description}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-container">
        <img
          src={asset(category.image)}
          alt={category.title}
          width={476}
          height={476}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04]"
        />
        <span className="chip absolute left-4 top-4 bg-primary/85 text-surface backdrop-blur-md">
          {category.kicker}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="headline-sm text-xl">{category.title}</h3>
          {typeof productCount === 'number' ? (
            <span className="label-caps shrink-0 pt-1 text-outline">
              {productCount} {productCount === 1 ? 'bake' : 'bakes'}
            </span>
          ) : null}
        </div>
        <p className="body-sm mt-2 flex-1 text-on-surface-variant">
          {category.description}
        </p>
        <span className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-primary transition-colors group-hover:text-secondary">
          Explore
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
