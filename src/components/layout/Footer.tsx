import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { business, formatAddress } from '../../data/site';
import { InstagramIcon } from '../ui/InstagramIcon';
import { Logo } from '../ui/Logo';

const exploreLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Our Menu' },
  { to: '/custom-cakes', label: 'Custom Cakes' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/contact', label: 'Contact' },
];

export function Footer() {
  return (
    <footer className="bg-[#201411] text-surface">
      <div className="shell py-14 lg:py-16">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Logo variant="dark" />
            <p className="font-display mt-4 text-sm italic text-secondary-fixed">
              {business.tagline}
            </p>
            <p className="body-sm mt-3 max-w-sm text-outline-variant">
              {business.shortDescription}
            </p>
            <address className="body-sm mt-5 not-italic text-outline-variant">
              <span className="flex items-start gap-2">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-secondary-fixed"
                  aria-hidden="true"
                />
                <span>{formatAddress()}</span>
              </span>
              <a
                href={`tel:${business.phone.href}`}
                className="mt-2 flex min-h-[44px] items-center gap-2 text-outline-variant transition-colors hover:text-surface"
              >
                <Phone
                  className="h-4 w-4 shrink-0 text-secondary-fixed"
                  aria-hidden="true"
                />
                {business.phone.display}
              </a>
            </address>
          </div>

          <div className="lg:col-span-2">
            <h2 className="label-caps text-secondary-fixed">Explore</h2>
            <ul className="mt-4 space-y-1">
              {exploreLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="body-sm inline-flex min-h-[40px] items-center text-outline-variant transition-colors hover:text-surface"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="label-caps text-secondary-fixed">Visit</h2>
            <p className="body-sm mt-4 text-outline-variant">
              Monday: 12:00 pm – 7:00 pm
              <br />
              Tuesday – Sunday: 10:00 am – 7:00 pm
            </p>
            <p className="body-sm mt-3 text-outline-variant">
              {business.hoursNote}
            </p>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-secondary-fixed transition-colors hover:text-surface"
            >
              Get directions
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="lg:col-span-2">
            <h2 className="label-caps text-secondary-fixed">Follow</h2>
            <a
              href={business.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="body-sm mt-4 flex min-h-[44px] items-center gap-2 text-outline-variant transition-colors hover:text-surface"
            >
              <InstagramIcon className="h-4 w-4 text-secondary-fixed" />
              <span className="break-all">{business.instagram.handle}</span>
            </a>
            <Link
              to="/custom-cakes"
              className="body-sm mt-1 flex min-h-[44px] items-center text-outline-variant transition-colors hover:text-surface"
            >
              Cake enquiries
            </Link>
            <Link
              to="/privacy"
              className="body-sm mt-1 flex min-h-[44px] items-center text-outline-variant transition-colors hover:text-surface"
            >
              Privacy
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-outline-variant sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Petite Bouchée Patisserie. All rights reserved.</p>
          <p className="text-outline-variant/80">
            Toronto, Ontario · Made for the neighbourhood.
          </p>
        </div>
      </div>
    </footer>
  );
}
