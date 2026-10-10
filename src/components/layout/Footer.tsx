import React from 'react';
import { appConfig } from '../../config/appConfig';

export const Footer: React.FC = () => {
  const { businessDetails, featureFlags } = appConfig;

  return (
    <footer
      id="footer-contact"
      className="w-full bg-tertiary text-on-tertiary border-t border-outline-variant/10"
    >
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-space-lg lg:px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-lg">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-4 space-y-space-md">
            <div className="flex items-center gap-space-sm">
              <span className="font-display text-headline-sm text-surface tracking-tight">
                {businessDetails.name}
              </span>
            </div>
            <p className="font-display italic text-secondary-fixed-dim font-light text-lg">
              Thoughtfully Crafted. Beautifully Presented.
            </p>
            <p className="font-body text-body-sm text-outline-variant max-w-sm leading-relaxed">
              Haute confectionery concepts for Toronto celebrations. Handcrafted architectural entremets, bespoke tiered celebration cakes, and fine patisserie previews.
            </p>
            <div className="flex items-center gap-space-xs text-outline-variant text-body-sm pt-1">
              <span className="material-symbols-outlined text-secondary-fixed text-[18px]">
                location_on
              </span>
              <span>{businessDetails.address}</span>
            </div>
          </div>

          {/* Creations Links Column */}
          <div className="lg:col-span-2 space-y-space-sm">
            <h4 className="font-label text-label-caps uppercase tracking-widest text-secondary-fixed font-semibold">
              Creations
            </h4>
            <ul className="space-y-space-xs font-body text-body-sm text-outline-variant">
              <li className="hover:text-surface transition-colors">
                <a href="#vitrine-section">Signature Entremets</a>
              </li>
              <li className="hover:text-surface transition-colors">
                <a href="#vitrine-section">Artisanal Tartes</a>
              </li>
              <li className="hover:text-surface transition-colors">
                <a href="#vitrine-section">Macaron Coffrets</a>
              </li>
              <li className="hover:text-surface transition-colors">
                <a href="#vitrine-section">Morning Viennoiserie</a>
              </li>
            </ul>
          </div>

          {/* Custom Studio Links Column */}
          <div className="lg:col-span-2 space-y-space-sm">
            <h4 className="font-label text-label-caps uppercase tracking-widest text-secondary-fixed font-semibold">
              Custom Studio
            </h4>
            <ul className="space-y-space-xs font-body text-body-sm text-outline-variant">
              <li className="hover:text-surface transition-colors">
                <a href="#bespoke-studio-section">Interactive Cake Builder</a>
              </li>
              <li className="hover:text-surface transition-colors">
                <a href="#bespoke-studio-section">Wedding Cake Atelier</a>
              </li>
              <li className="hover:text-surface transition-colors">
                <a href="#bespoke-studio-section">Flavour Consultations</a>
              </li>
              <li className="hover:text-surface transition-colors">
                <a href="#story-section">Pastry Atelier Concierge</a>
              </li>
            </ul>
          </div>

          {/* Gazette Newsletter & Hours Column */}
          <div className="lg:col-span-4 space-y-space-md">
            <div className="space-y-space-xs">
              <h4 className="font-label text-label-caps uppercase tracking-widest text-secondary-fixed font-semibold">
                The Gazette
              </h4>
              <p className="font-body text-body-sm text-outline-variant">
                Subscribe for seasonal collection private viewings and culinary invitations.
              </p>
            </div>

            {/* Gazette Newsletter Form (Disabled until CASL/provider consent approval) */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!featureFlags.newsletterEnabled) {
                  alert('The Gazette newsletter sign-up is currently disabled pending CASL provider consent approval.');
                }
              }}
              className="flex items-center gap-space-xs border-b border-outline-variant/30 pb-space-xs opacity-75"
            >
              <input
                type="email"
                placeholder="Your email address"
                disabled={!featureFlags.newsletterEnabled}
                aria-label="Email address for Gazette newsletter"
                className="bg-transparent w-full text-surface placeholder:text-outline text-body-sm focus:outline-none disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={!featureFlags.newsletterEnabled}
                className="font-label text-label-caps uppercase tracking-widest text-secondary-fixed hover:text-surface transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Join
              </button>
            </form>
            <p className="text-[10px] text-outline italic">
              Newsletter is disabled pending CASL consent flow approval.
            </p>

            <div className="pt-space-xs flex items-center justify-between text-outline-variant font-label text-label-caps">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-secondary-fixed">
                  schedule
                </span>
                {businessDetails.hours}
              </span>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-space-xl pt-space-md border-t border-outline-variant/15 flex flex-col sm:flex-row items-center justify-between gap-space-sm text-outline-variant font-body text-body-sm">
          <span>© 2026 Petite Bouchée Patisserie Inc. All rights reserved.</span>
          <div className="flex items-center gap-space-md font-label text-label-caps uppercase tracking-wider">
            <a href="#footer-contact" className="hover:text-surface transition-colors">
              Privacy Policy
            </a>
            <a href="#footer-contact" className="hover:text-surface transition-colors">
              Terms of Service
            </a>
            <a href="#footer-contact" className="hover:text-surface transition-colors">
              Atelier FAQ
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
