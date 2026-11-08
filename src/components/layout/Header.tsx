import { useEffect, useState } from 'react';
import { CakeSlice, Menu, Phone, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { business } from '../../data/site';
import { Dialog } from '../ui/Dialog';
import { InstagramIcon } from '../ui/InstagramIcon';
import { Logo } from '../ui/Logo';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/menu', label: 'Our Menu' },
  { to: '/custom-cakes', label: 'Custom Cakes' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/contact', label: 'Contact' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-[#efe5d6]/80 bg-surface/[0.94] backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-3 lg:h-20 lg:gap-6">
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full text-primary transition-colors hover:bg-surface-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary lg:hidden"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(true)}
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="lg:flex-1">
          <Logo responsiveSubtitle />
        </div>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  'relative inline-flex min-h-[44px] items-center text-[0.6875rem] font-semibold uppercase tracking-[0.12em] transition-colors',
                  isActive
                    ? 'text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-secondary'
                    : 'text-on-surface-variant hover:text-primary',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2 lg:flex-1">
          <Link
            to="/custom-cakes"
            className="btn btn-primary hidden lg:inline-flex"
          >
            Enquire About a Cake
            <CakeSlice className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to="/custom-cakes"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-surface transition-colors hover:bg-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 lg:hidden"
            aria-label="Enquire about a custom cake"
          >
            <CakeSlice className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <Dialog
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        labelledBy="mobile-navigation-title"
        className="nav-dialog"
        id="mobile-navigation"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-[#efe5d6] px-5 py-4">
            <div>
              <p className="label-caps text-secondary">Pâtisserie fine</p>
              <h2
                id="mobile-navigation-title"
                className="headline-sm mt-1 text-xl"
              >
                Petite Bouchée
              </h2>
            </div>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              aria-label="Close navigation menu"
              onClick={() => setMenuOpen(false)}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label="Mobile primary"
            className="flex-1 overflow-y-auto px-5 py-5"
          >
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      [
                        'flex min-h-[48px] items-center justify-between rounded-sm px-3 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-secondary-container/40 text-primary'
                          : 'text-on-surface-variant hover:bg-surface-container hover:text-primary',
                      ].join(' ')
                    }
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-secondary">
                      →
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-[#efe5d6] pt-5">
              <p className="label-caps text-secondary">Visit the bakery</p>
              <address className="body-sm mt-3 not-italic text-on-surface-variant">
                {business.address.street}
                <br />
                {business.address.city}, {business.address.region}{' '}
                {business.address.postalCode}
              </address>
              <a
                href={`tel:${business.phone.href}`}
                className="mt-3 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-primary"
              >
                <Phone className="h-4 w-4 text-secondary" aria-hidden="true" />
                {business.phone.display}
              </a>
              <a
                href={business.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex min-h-[44px] items-center gap-2 text-sm font-medium text-primary"
              >
                <InstagramIcon className="h-4 w-4 text-secondary" />
                {business.instagram.handle}
              </a>
            </div>
          </nav>

          <div className="border-t border-[#efe5d6] bg-surface-container-low px-5 py-4">
            <Link
              to="/custom-cakes"
              onClick={() => setMenuOpen(false)}
              className="btn btn-primary w-full"
            >
              <CakeSlice className="h-4 w-4" aria-hidden="true" />
              Custom Cake Enquiry
            </Link>
            <p className="body-sm mt-3 text-center text-on-surface-variant">
              {business.hoursNote}
            </p>
          </div>
        </div>
      </Dialog>
    </header>
  );
}
