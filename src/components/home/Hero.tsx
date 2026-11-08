import {
  ArrowRight,
  CakeSlice,
  Clock,
  MapPin,
  Phone,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { business, formatAddress } from '../../data/site';
import { asset } from '../../lib/asset';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#efe5d6] bg-surface">
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-secondary-container/30 blur-[90px]" />
      <div className="shell relative grid items-center gap-9 py-10 lg:grid-cols-12 lg:gap-14 lg:py-16">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-secondary/20 bg-surface-container px-3.5 py-1.5">
            <span
              className="h-2 w-2 rounded-full bg-secondary motion-safe:animate-pulse"
              aria-hidden="true"
            />
            <span className="label-caps text-secondary">
              Baked daily in Toronto
            </span>
          </p>

          <h1 className="display-hero mt-5">
            A Little Something
            <br />
            <span className="italic font-normal text-secondary">to Love.</span>
          </h1>

          <p className="body-lg mt-5 max-w-xl text-on-surface-variant">
            Freshly baked pastries, seasonal tarts, Portuguese country bread and
            bespoke celebration cakes, made in our Toronto bakery.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link to="/menu" className="btn btn-primary">
              Explore Our Menu
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/custom-cakes" className="btn btn-secondary">
              <CakeSlice className="h-4 w-4" aria-hidden="true" />
              Custom Cake Enquiries
            </Link>
          </div>

          <div className="mt-8 grid gap-3 border-t border-[#efe5d6] pt-5 text-sm text-on-surface-variant sm:grid-cols-2">
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-start gap-2.5 transition-colors hover:text-primary"
            >
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
                aria-hidden="true"
              />
              <span>{formatAddress()}</span>
            </a>
            <Link
              to="/contact"
              className="flex min-h-[44px] items-start gap-2.5 transition-colors hover:text-primary"
            >
              <Clock
                className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
                aria-hidden="true"
              />
              <span>
                Mon 12–7 · Tue–Sun 10–7
                <span className="mt-0.5 block text-xs text-on-surface-variant/80">
                  Please call ahead to confirm holiday hours.
                </span>
              </span>
            </Link>
          </div>

          <a
            href={`tel:${business.phone.href}`}
            className="mt-1 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-secondary"
          >
            <Phone className="h-4 w-4 text-secondary" aria-hidden="true" />
            {business.phone.display}
          </a>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-6">
          <figure className="relative overflow-hidden rounded-3xl border border-[#efe5d6] bg-surface-container shadow-bloom">
            <img
              src={asset('images/editorial/hero.jpg')}
              alt="Freshly baked cruffins, croissants and pastries on the counter at Petite Bouchée"
              width={1408}
              height={768}
              className="aspect-[4/3] w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/5 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/60 bg-surface/[0.94] p-4 shadow-lg backdrop-blur-md sm:inset-x-5 sm:bottom-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="label-caps text-secondary">Morning vitrine</p>
                  <p className="headline-sm mt-1 text-base">
                    Cruffins, croissants &amp; seasonal bakes
                  </p>
                  <p className="body-sm mt-1 text-on-surface-variant">
                    Baked for the neighbourhood counter.
                  </p>
                </div>
                <span className="chip shrink-0 bg-secondary-container text-on-secondary-container">
                  Fresh today
                </span>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
