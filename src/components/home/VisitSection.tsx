import {
  ArrowUpRight,
  CakeSlice,
  MapPin,
  Phone,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { business, formatAddress } from '../../data/site';
import { HoursCard } from '../ui/HoursCard';
import { InstagramIcon } from '../ui/InstagramIcon';
import { SectionHeading } from '../ui/SectionHeading';

export function VisitSection() {
  return (
    <section className="border-t border-[#efe5d6] bg-surface-container-low/40 py-16 lg:py-24">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Visit & contact"
            title="Find Us in Toronto"
            description="Our counter is at 28 Sousa Mendes St. Call ahead for holiday hours, or send us a message on Instagram."
          />

          <div className="mt-7 space-y-1">
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-start gap-3 text-sm text-on-surface-variant transition-colors hover:text-primary"
            >
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
                aria-hidden="true"
              />
              <span>{formatAddress()}</span>
            </a>
            <a
              href={`tel:${business.phone.href}`}
              className="flex min-h-[44px] items-center gap-3 text-sm text-on-surface-variant transition-colors hover:text-primary"
            >
              <Phone
                className="h-4 w-4 shrink-0 text-secondary"
                aria-hidden="true"
              />
              {business.phone.display}
            </a>
            <a
              href={business.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center gap-3 text-sm text-on-surface-variant transition-colors hover:text-primary"
            >
              <InstagramIcon className="h-4 w-4 shrink-0 text-secondary" />
              <span className="break-all">{business.instagram.handle}</span>
            </a>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Get Directions
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link to="/custom-cakes" className="btn btn-secondary">
              <CakeSlice className="h-4 w-4" aria-hidden="true" />
              Cake Enquiries
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <HoursCard />
            <div className="card flex flex-col justify-between overflow-hidden">
              <div className="relative flex min-h-[190px] items-center justify-center bg-surface-container p-6">
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 1px 1px, rgba(184,154,106,0.28) 1px, transparent 0)',
                    backgroundSize: '18px 18px',
                  }}
                  aria-hidden="true"
                />
                <div className="relative text-center">
                  <MapPin
                    className="mx-auto h-8 w-8 text-secondary"
                    aria-hidden="true"
                  />
                  <p className="headline-sm mt-3 text-lg">The bakery counter</p>
                  <p className="body-sm mt-1 text-on-surface-variant">
                    {business.address.street}
                    <br />
                    {business.address.city}, {business.address.region}{' '}
                    {business.address.postalCode}
                  </p>
                </div>
              </div>
              <div className="border-t border-[#efe5d6] p-5">
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-primary transition-colors hover:text-secondary"
                >
                  Open in Google Maps
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <p className="body-sm mt-2 text-on-surface-variant">
                  Please call ahead to confirm holiday hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
