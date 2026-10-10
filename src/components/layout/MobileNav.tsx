import React, { useEffect } from 'react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  // Trap Escape key for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-navigation-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      className="fixed inset-0 z-50 xl:hidden flex flex-col justify-between bg-surface/95 backdrop-blur-xl p-6 transition-all duration-300"
    >
      <div className="flex items-center justify-between pb-6 border-b border-outline-variant/30">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg text-primary font-medium">Petite Bouchée</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col space-y-6 py-8">
        <a
          href="#home"
          onClick={onClose}
          className="font-display text-2xl text-primary hover:text-secondary transition-colors"
        >
          Home
        </a>
        <a
          href="#vitrine-section"
          onClick={onClose}
          className="font-display text-2xl text-primary hover:text-secondary transition-colors"
        >
          Our Creations
        </a>
        <a
          href="#bespoke-studio-section"
          onClick={onClose}
          className="font-display text-2xl text-primary hover:text-secondary transition-colors"
        >
          Custom Cakes
        </a>
        <a
          href="#story-section"
          onClick={onClose}
          className="font-display text-2xl text-primary hover:text-secondary transition-colors"
        >
          Our Story
        </a>
        <a
          href="#footer-contact"
          onClick={onClose}
          className="font-display text-2xl text-primary hover:text-secondary transition-colors"
        >
          Contact
        </a>
      </nav>

      {/* Bottom CTA */}
      <div className="pt-6 border-t border-outline-variant/30 flex flex-col space-y-3">
        <a
          href="#bespoke-studio-section"
          onClick={onClose}
          className="w-full py-3.5 rounded-full bg-primary-container text-on-primary font-label text-[11px] uppercase tracking-widest text-center shadow-md hover:bg-primary transition-colors"
        >
          Create Your Cake
        </a>
      </div>
    </div>
  );
};
