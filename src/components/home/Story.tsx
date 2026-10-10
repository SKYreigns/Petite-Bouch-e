import React from 'react';

export const Story: React.FC = () => {
  return (
    <section id="story-section" className="w-full py-space-xl px-margin-mobile md:px-space-lg lg:px-margin bg-surface-container-low/40">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
        <div className="lg:col-span-6 relative flex justify-center">
          <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl bg-surface-container">
            <img 
              src="https://lh3.googleusercontent.com/aida/AEtjO1XS8bBI1PBawDOb3vlp9Nxh_QZn70B1DZO2KvLr9ddwytOrtp0WTZTIIGKUhZGk6a9CRptWsOs_PY3doo1TwWnXRSHp9FltN2Ovv6iuZ4YDkpgUoXrvYJU7URO3gwn4tbbxw7EQs9Qv80mpY_UoVyeoG7_sWpV2ebxNrLe8G0D_IKPjveF-W90D1b3YGNKvLq2EAGpYp6f_L40I3_5IMSdFPsJLUFo_1UyEpYQgBRC25itborsOXnVnbvR1" 
              alt="Petite Bouchée Detail" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md">
              <p className="font-display text-sm text-primary">"Thoughtfully Crafted. Beautifully Presented."</p>
              <p className="font-body text-xs text-on-surface-variant mt-0.5">Haute confectionery concepts for Toronto celebrations · Toronto, Canada</p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-6 space-y-space-md text-left">
          <div className="flex items-center gap-2">
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary font-semibold">Our Story & Philosophy</span>
            <span className="w-8 h-[1px] bg-secondary-container" />
          </div>
          <h2 className="font-display text-4xl lg:text-[44px] text-primary tracking-tight">The Art of the Micro-Bouche</h2>
          <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
            Petite Bouchée was envisioned as a sanctuary where classical French technique meets contemporary architectural pastry design in Toronto, Canada. Every entremet and custom tiered centerpiece is calibrated to balance refined sweetness with vivid botanical and fruit notes.
          </p>
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            From our tasting previews to private courier deliveries, our atelier designs demonstration concepts that turn milestones into enduring memories.
          </p>
          <div className="pt-2 flex items-center gap-4">
            <a href="#bespoke-studio-section" className="px-space-md py-3 rounded-full bg-primary text-on-primary font-label text-[11px] uppercase tracking-wider hover:bg-primary-container transition-colors inline-block">
              Explore Studio Configurator
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
