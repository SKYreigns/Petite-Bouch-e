import React, { useState, useEffect } from 'react';
import { AppShell } from './components/layout/AppShell';
import { appConfig, getInquiryAdapter } from './config/appConfig';
import { InquiryAdapterResponse } from './types/inquiry';

export const App: React.FC = () => {
  const [adapterStatus, setAdapterStatus] = useState<string>('Initializing Adapter Verification...');
  const [testResponse, setTestResponse] = useState<InquiryAdapterResponse | null>(null);

  useEffect(() => {
    try {
      const adapter = getInquiryAdapter();
      setAdapterStatus(`Active Adapter: ${adapter.name}`);

      // Development test verification of MockInquiryAdapter
      adapter.submitInquiry({
        occasion: 'Birthday Demo',
        servings: '10–12 Guests',
        flavour: 'Velvet Chocolate',
        design: 'Pressed Botanical Floral',
        colour: 'Blush Rose',
        eventDate: '2026-11-15',
        targetBudget: '$180 - $250 CAD',
        customerName: 'Geneviève Claire',
        customerEmail: 'genevieve@example.com',
        submittedAt: new Date().toISOString(),
      }).then((res) => {
        setTestResponse(res);
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setAdapterStatus(`Adapter Error: ${err.message}`);
      } else {
        setAdapterStatus('Adapter Error: Unknown failure');
      }
    }
  }, []);

  return (
    <AppShell>
      <section id="home" className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-margin-mobile md:px-space-lg lg:px-margin py-space-xl text-center">
        
        {/* Foundation Badge */}
        <div className="inline-flex items-center gap-2.5 px-space-sm py-1.5 rounded-full bg-surface-container shadow-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="font-label text-[11px] uppercase tracking-[0.22em] text-secondary font-semibold">
            Phase 1 Foundation · Vite + React + TypeScript
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight leading-[1.08] max-w-4xl mb-6">
          Crafted with Love. <br />
          <span className="italic font-display text-secondary font-light">Designed to Delight.</span>
        </h1>

        {/* Description */}
        <p className="font-body text-body-lg text-on-surface-variant max-w-2xl leading-relaxed mb-8">
          Discover extraordinary demonstration cakes and architectural patisserie concepts, handcrafted for Toronto celebrations with Parisian-inspired savoir-faire.
        </p>

        {/* Foundation Diagnostics Deck */}
        <div className="w-full max-w-3xl bg-surface-container-low/80 border border-outline-variant/30 rounded-2xl p-space-md shadow-sm text-left space-y-4 my-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <span className="font-label text-xs uppercase tracking-wider text-secondary font-semibold">
              Architecture & Adapter Verification
            </span>
            <span className="text-[10px] font-label uppercase px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container">
              {appConfig.environment} mode
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-body">
            <div>
              <p className="text-outline font-label uppercase text-[10px]">Framework Stack</p>
              <p className="text-primary font-medium mt-0.5">Vite + React 18 + TypeScript + Tailwind CSS</p>
            </div>
            <div>
              <p className="text-outline font-label uppercase text-[10px]">Hosting Target</p>
              <p className="text-primary font-medium mt-0.5">Vercel (Static CDN + Serverless Functions)</p>
            </div>
            <div>
              <p className="text-outline font-label uppercase text-[10px]">Inquiry Adapter Status</p>
              <p className="text-secondary font-medium mt-0.5">{adapterStatus}</p>
            </div>
            <div>
              <p className="text-outline font-label uppercase text-[10px]">Production Security Guard</p>
              <p className="text-emerald-700 font-medium mt-0.5">ACTIVE (MockAdapter forbidden in PROD)</p>
            </div>
          </div>

          {testResponse && (
            <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/20 text-xs">
              <p className="font-label uppercase text-[10px] text-secondary font-semibold mb-1">
                Development Adapter Verification Result:
              </p>
              <pre className="text-[11px] text-primary font-mono whitespace-pre-wrap">
                {JSON.stringify(testResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <a
            href="#vitrine-section"
            className="px-space-lg py-3.5 rounded-full bg-primary-container text-on-primary font-label text-[11px] uppercase tracking-[0.16em] shadow-md hover:bg-primary transition-all duration-300"
          >
            Explore Our Creations
          </a>
          <a
            href="#bespoke-studio-section"
            className="px-space-md py-3.5 rounded-full bg-surface-container-high text-primary font-label text-[11px] uppercase tracking-[0.16em] hover:bg-surface-container-highest transition-all duration-300"
          >
            Create a Custom Cake
          </a>
        </div>

      </section>
    </AppShell>
  );
};

export default App;
