import React, { useState, useEffect } from 'react';
import { AppShell } from './components/layout/AppShell';
import { appConfig, getInquiryAdapter } from './config/appConfig';
import { InquiryAdapterResponse } from './types/inquiry';

export const App: React.FC = () => {
  const [adapterStatus, setAdapterStatus] = useState<string>('Initializing Adapter Verification...');
  const [testResponse, setTestResponse] = useState<InquiryAdapterResponse | null>(null);
  const [showDevTools, setShowDevTools] = useState<boolean>(false);

  useEffect(() => {
    // Only mount dev tools logic if not in production, or if explicitly enabled
    if (appConfig.environment !== 'production') {
      try {
        const adapter = getInquiryAdapter();
        setAdapterStatus(`Active Adapter: ${adapter.name}`);

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
    }
  }, []);

  return (
    <AppShell>
      <section id="home" className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-margin-mobile md:px-space-lg lg:px-margin py-space-xl text-center relative overflow-hidden">
        
        {/* Ambient Light Effects */}
        <div className="absolute -top-40 right-1/4 w-[620px] h-[620px] rounded-full bg-secondary-container/20 blur-[130px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 -left-32 w-[520px] h-[520px] rounded-full bg-tertiary-fixed-dim/25 blur-[120px] pointer-events-none -z-10" />

        {/* Hero Title */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl text-primary tracking-tight leading-[1.08] max-w-4xl mb-6 mt-12 z-10">
          Crafted with Love. <br />
          <span className="italic font-display text-secondary font-light">Designed to Delight.</span>
        </h1>

        {/* Description */}
        <p className="font-body text-body-lg text-on-surface-variant max-w-2xl leading-relaxed mb-10 z-10">
          Discover extraordinary demonstration cakes and architectural patisserie concepts, handcrafted for Toronto celebrations with Parisian-inspired savoir-faire.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 z-10">
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

      {/* Development Overlay Toggle & Panel */}
      {appConfig.environment !== 'production' && (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col items-end">
          {showDevTools && (
            <div className="mb-2 w-full max-w-sm bg-surface-container-low/95 backdrop-blur-md border border-outline-variant/50 rounded-2xl p-space-md shadow-xl text-left space-y-4">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                <span className="font-label text-[10px] uppercase tracking-wider text-secondary font-semibold">
                  Dev Diagnostics
                </span>
                <span className="text-[9px] font-label uppercase px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-container">
                  {appConfig.environment}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3 text-xs font-body">
                <div>
                  <p className="text-outline font-label uppercase text-[9px]">Stack</p>
                  <p className="text-primary font-medium mt-0.5 text-[11px]">Vite + React 18 + TS + Tailwind</p>
                </div>
                <div>
                  <p className="text-outline font-label uppercase text-[9px]">Inquiry Adapter</p>
                  <p className="text-secondary font-medium mt-0.5 text-[11px] truncate">{adapterStatus}</p>
                </div>
              </div>
              {testResponse && (
                <div className="p-2 bg-surface-container-lowest rounded-xl border border-outline-variant/20 text-xs overflow-x-auto">
                  <pre className="text-[10px] text-primary font-mono whitespace-pre-wrap">
                    {JSON.stringify(testResponse, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
          <button
            type="button"
            onClick={() => setShowDevTools(!showDevTools)}
            className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant/40 shadow-lg flex items-center justify-center text-secondary hover:bg-secondary-container transition-colors focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none"
            aria-label="Toggle Dev Tools"
          >
            <span className="material-symbols-outlined text-[20px]">
              {showDevTools ? 'close' : 'build'}
            </span>
          </button>
        </div>
      )}
    </AppShell>
  );
};

export default App;
