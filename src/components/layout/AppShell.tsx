import React, { useState } from 'react';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { Footer } from './Footer';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const handleCloseMobileNav = React.useCallback(() => setIsMobileNavOpen(false), []);
  const handleOpenMobileNav = React.useCallback(() => setIsMobileNavOpen(true), []);

  return (
    <div className="min-h-screen flex flex-col bg-surface font-body text-on-surface antialiased">
      {/* Header Shell */}
      <Header
        isMobileNavOpen={isMobileNavOpen}
        onOpenMobileNav={handleOpenMobileNav}
      />

      {/* Mobile Drawer Shell */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={handleCloseMobileNav}
      />

      {/* Main Viewport Content Region */}
      <main id="main-content" className="w-full pt-20 flex-1 bg-surface">
        {children}
      </main>

      {/* Footer Shell */}
      <Footer />
    </div>
  );
};
