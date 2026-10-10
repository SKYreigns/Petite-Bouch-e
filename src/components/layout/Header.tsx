import React from 'react';
import { appConfig } from '../../config/appConfig';

interface HeaderProps {
  onOpenMobileNav: () => void;
  isMobileNavOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileNav, isMobileNavOpen }) => {
  const { businessDetails, featureFlags } = appConfig;

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-500 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 shadow-[0_4px_24px_rgba(57,39,31,0.03)]">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-space-lg lg:px-margin h-20 flex items-center justify-between gap-space-sm sm:gap-gutter">
        
        {/* Brand Title (Logo image removed due to missing asset blocker) */}
        <div className="flex items-center gap-space-sm shrink-0 truncate">
          <a
            href="#home"
            className="flex flex-col text-left focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none rounded-sm truncate"
          >
            <span className="font-display text-2xl sm:text-headline-sm tracking-tight text-primary leading-none font-medium truncate">
              {businessDetails.name}
            </span>
            <span className="hidden sm:block font-label text-[11px] text-secondary tracking-[0.2em] uppercase mt-0.5 font-semibold">
              {businessDetails.tagline}
            </span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden xl:flex items-center gap-space-md lg:gap-space-lg"
        >
          <a
            href="#home"
            aria-current="page"
            className="relative py-1 uppercase text-primary font-medium font-label text-[11px] tracking-[0.14em] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-secondary transition-all focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none"
          >
            Home
          </a>
          <a
            href="#vitrine-section"
            className="relative py-1 font-label text-[11px] tracking-[0.14em] uppercase text-on-surface-variant hover:text-on-surface transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-secondary hover:after:w-full after:transition-all focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none"
          >
            Our Creations
          </a>
          <a
            href="#bespoke-studio-section"
            className="relative py-1 font-label text-[11px] tracking-[0.14em] uppercase text-on-surface-variant hover:text-on-surface transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-secondary hover:after:w-full after:transition-all focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none"
          >
            Custom Cakes
          </a>
          <a
            href="#story-section"
            className="relative py-1 font-label text-[11px] tracking-[0.14em] uppercase text-on-surface-variant hover:text-on-surface transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-secondary hover:after:w-full after:transition-all focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none"
          >
            Our Story
          </a>
          <a
            href="#footer-contact"
            className="relative py-1 font-label text-[11px] tracking-[0.14em] uppercase text-on-surface-variant hover:text-on-surface transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-secondary hover:after:w-full after:transition-all focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none"
          >
            Contact
          </a>
        </nav>

        {/* Action Controls & Mobile Hamburger Toggle */}
        <div className="flex items-center gap-space-sm sm:gap-space-md shrink-0">
          {featureFlags.conciergeEnabled ? (
            <button
              type="button"
              className="hidden md:flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container border border-outline-variant/40 hover:bg-secondary-container/40 transition-colors focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="font-label text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                AI Concierge Live
              </span>
            </button>
          ) : (
            <span
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container/60 border border-outline-variant/30 text-[10px] font-label uppercase text-outline tracking-wider"
              title="Concierge AI is a Phase 5 gated feature"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-outline/50" />
              AI Concierge (Phase 5 Demo)
            </span>
          )}

          <a
            href="#bespoke-studio-section"
            className="hidden sm:inline-flex items-center justify-center px-space-md py-2.5 rounded-full bg-primary-container text-on-primary font-label text-[11px] uppercase tracking-widest border border-secondary/40 shadow-[0_2px_12px_rgba(57,39,31,0.08)] hover:bg-primary transition-all duration-300 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none"
          >
            Create Your Cake
          </a>

          {/* Mobile Navigation Toggle Button */}
          <button
            type="button"
            onClick={onOpenMobileNav}
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label="Toggle navigation menu"
            className="xl:hidden w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none shrink-0"
          >
            <span className="material-symbols-outlined text-[22px]">
              {isMobileNavOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
