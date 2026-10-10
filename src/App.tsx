import React, { useState } from 'react';
import { AppShell } from './components/layout/AppShell';
import { appConfig, getInquiryAdapter } from './config/appConfig';
import { InquiryAdapterResponse } from './types/inquiry';
import { Hero } from './components/home/Hero';
import { Gallery } from './components/home/Gallery';
import { Inquiry } from './components/home/Inquiry';
import { Story } from './components/home/Story';

export const App: React.FC = () => {
  const [adapterStatus, setAdapterStatus] = useState<string>('Adapter Standby');
  const [testResponse, setTestResponse] = useState<InquiryAdapterResponse | null>(null);
  const [showDevTools, setShowDevTools] = useState<boolean>(false);

  const handleTestAdapter = async () => {
    try {
      const adapter = getInquiryAdapter();
      setAdapterStatus(`Testing Adapter: ${adapter.name}...`);

      const res = await adapter.submitInquiry({
        occasion: 'Demo Event',
        servings: '1-2 Guests',
        flavour: 'Test Flavour',
        design: 'Test Design',
        colour: 'Test Colour',
        eventDate: '2099-01-01',
        targetBudget: 'Test Budget',
        customerName: 'Test User',
        customerEmail: 'test@example.local',
        submittedAt: new Date().toISOString(),
      });
      setTestResponse(res);
      setAdapterStatus(`Adapter Active: ${adapter.name}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setAdapterStatus(`Adapter Error: ${err.message}`);
      } else {
        setAdapterStatus('Adapter Error: Unknown failure');
      }
    }
  };

  return (
    <AppShell>
      <div className="flex flex-col w-full relative overflow-x-hidden">
        <Hero />
        <Gallery />
        <Inquiry />
        <Story />
      </div>

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
                  <p className="text-secondary font-medium mt-0.5 text-[11px] truncate mb-2">{adapterStatus}</p>
                  <button
                    type="button"
                    onClick={handleTestAdapter}
                    className="w-full py-1.5 rounded bg-secondary-container text-on-secondary-container font-label text-[10px] uppercase tracking-wider hover:bg-secondary hover:text-on-secondary transition-colors focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none"
                  >
                    Test Mock Adapter
                  </button>
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
