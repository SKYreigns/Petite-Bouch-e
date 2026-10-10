import React, { useEffect, useRef } from 'react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Manage focus and trap Escape key
  useEffect(() => {
    if (isOpen) {
      // Store previous focus
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Find focusable elements
      const focusableElements = drawerRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements?.[0];
      const lastElement = focusableElements?.[focusableElements.length - 1];

      // Focus first element on mount
      if (firstElement) {
        firstElement.focus();
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }

        if (e.key === 'Tab') {
          if (!focusableElements || focusableElements.length === 0) return;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      // Restore focus on unmount
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      };
    }
    return undefined;
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={drawerRef}
      id="mobile-navigation-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      className="fixed inset-0 z-50 xl:hidden flex flex-col justify-between bg-surface/95 backdrop-blur-xl p-6 transition-all duration-300 overflow-y-auto"
    >
      <div className="flex items-center justify-between pb-6 border-b border-outline-variant/30 shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg text-primary font-medium">Petite Bouchée</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none shrink-0"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col space-y-6 py-8 flex-1">
        <a
          href="#home"
          onClick={onClose}
          className="font-display text-2xl text-primary hover:text-secondary transition-colors focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none w-max rounded"
        >
          Home
        </a>
        <a
          href="#vitrine-section"
          onClick={onClose}
          className="font-display text-2xl text-primary hover:text-secondary transition-colors focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none w-max rounded"
        >
          Our Creations
        </a>
        <a
          href="#bespoke-studio-section"
          onClick={onClose}
          className="font-display text-2xl text-primary hover:text-secondary transition-colors focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none w-max rounded"
        >
          Custom Cakes
        </a>
        <a
          href="#story-section"
          onClick={onClose}
          className="font-display text-2xl text-primary hover:text-secondary transition-colors focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none w-max rounded"
        >
          Our Story
        </a>
        <a
          href="#footer-contact"
          onClick={onClose}
          className="font-display text-2xl text-primary hover:text-secondary transition-colors focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none w-max rounded"
        >
          Contact
        </a>
      </nav>

      {/* Bottom CTA */}
      <div className="pt-6 border-t border-outline-variant/30 flex flex-col space-y-3 shrink-0">
        <a
          href="#bespoke-studio-section"
          onClick={onClose}
          className="w-full py-3.5 rounded-full bg-primary-container text-on-primary font-label text-[11px] uppercase tracking-widest text-center shadow-md hover:bg-primary transition-colors focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none"
        >
          Create Your Cake
        </a>
      </div>
    </div>
  );
};
