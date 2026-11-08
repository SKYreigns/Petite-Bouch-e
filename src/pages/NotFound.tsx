import { ArrowLeft, ArrowRight, MapPin, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { business, formatAddress } from '../data/site';
import { usePageMeta } from '../lib/usePageMeta';

export function NotFound() {
  usePageMeta(
    'Page Not Found — Petite Bouchée Patisserie',
    'That page could not be found. Return to the Petite Bouchée home page or explore the menu.'
  );

  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-secondary-container/30 blur-[90px]" />
      <div className="shell relative flex min-h-[70vh] flex-col items-center justify-center py-16 text-center lg:py-24">
        <p className="label-caps text-secondary">404 · Page not found</p>
        <p className="font-display mt-4 text-6xl leading-none text-champagne/60 sm:text-8xl">
          404
        </p>
        <h1 className="headline-lg mt-4 max-w-xl">
          This page has
          <br />
          <span className="italic font-normal text-secondary">
            gone missing.
          </span>
        </h1>
        <p className="body-md mt-4 max-w-md text-on-surface-variant">
          The page you were looking for may have moved, or the link may be
          incomplete. The counter is still open — start again from home or
          explore the menu.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="btn btn-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </Link>
          <Link to="/menu" className="btn btn-secondary">
            <Search className="h-4 w-4" aria-hidden="true" />
            Explore the Menu
          </Link>
        </div>

        <div className="mt-10 grid w-full max-w-2xl gap-4 border-t border-[#efe5d6] pt-6 text-left sm:grid-cols-2">
          <Link
            to="/custom-cakes"
            className="group flex items-start gap-3 rounded-sm p-3 transition-colors hover:bg-surface-container-low"
          >
            <ArrowRight
              className="mt-0.5 h-4 w-4 shrink-0 text-secondary transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
            <span>
              <span className="block text-sm font-semibold text-primary">
                Custom cake enquiries
              </span>
              <span className="mt-0.5 block text-xs text-on-surface-variant">
                Plan a celebration cake with the bakery.
              </span>
            </span>
          </Link>
          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 rounded-sm p-3 transition-colors hover:bg-surface-container-low"
          >
            <MapPin
              className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
              aria-hidden="true"
            />
            <span>
              <span className="block text-sm font-semibold text-primary">
                Visit the bakery
              </span>
              <span className="mt-0.5 block text-xs text-on-surface-variant">
                {formatAddress()}
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
