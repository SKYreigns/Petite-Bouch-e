import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { asset } from '../../lib/asset';
import { categoryTitle, type Product } from '../../data/site';

interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
}

export function ProductCard({
  product,
  showCategory = true,
}: ProductCardProps) {
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-surface-container">
        <img
          src={asset(product.image)}
          alt={product.name}
          width={476}
          height={476}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.035]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        {showCategory ? (
          <p className="label-caps text-secondary">
            {categoryTitle(product.category)}
          </p>
        ) : null}
        <h3 className="headline-sm mt-2 text-lg">{product.name}</h3>
        <p className="body-sm mt-2 flex-1 text-on-surface-variant">
          {product.description}
        </p>
        <Link
          to={`/menu#${product.category}`}
          className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-primary transition-colors hover:text-secondary"
          aria-label={`See ${categoryTitle(product.category)} on the menu`}
        >
          See the menu
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
