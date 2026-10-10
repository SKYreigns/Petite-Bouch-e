import React from 'react';

export const Gallery: React.FC = () => {
  return (
    <section id="vitrine-section" className="w-full bg-surface-container-low/60 py-space-xl px-margin-mobile md:px-space-lg lg:px-margin">
      <div className="max-w-[1440px] mx-auto space-y-space-lg">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm pb-space-xs">
          <div className="space-y-space-xs text-left">
            <div className="flex items-center gap-2">
              <span className="font-label text-[11px] uppercase tracking-[0.2em] text-secondary font-semibold">CONCEPT COLLECTION · VITRINE</span>
              <span className="w-8 h-[1px] bg-secondary-container" />
            </div>
            <h2 className="font-display text-4xl lg:text-[44px] text-primary tracking-tight">The Vitrine Collection</h2>
            <p className="font-body text-body-md text-on-surface-variant max-w-xl">
              Each creation is an architectural harmony of textures and botanical infusions. All items shown are demonstration concepts; details to be confirmed.
            </p>
          </div>
          <a href="#bespoke-studio-section" className="inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-widest text-primary hover:text-secondary transition-colors group">
            <span>Configure in Bespoke Studio</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">east</span>
          </a>
        </div>

        {/* Asymmetrical Editorial Trio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md lg:gap-gutter text-left">
          
          {/* Card 1 */}
          <div className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col border border-outline-variant/10">
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-container">
              <img src="https://lh3.googleusercontent.com/aida/AEtjO1Vp7ibLJ0WGTsGoOejdzCZZQyWJrhe5_tYi89eu3KroCgqr1F4fgqfAdjIvZcBn7Ip2uoWkvuSxBPxkj5MO9xGuyCTmUWvgyd7u_iQS3gkXJS3TQSp591-F0Xc6wckv91jbI2miZGVPklY0gvL3Lw7Asou01ig-arMisTdDXEGIMg8QmwhHP0qM4jYVfO5cLRR2MY75qhPqD01Ts-9AjxaQf1cvfOCNz9tr-Bl3cgzHYvnEzZsH95tQRACs" alt="Noir Valrhona Mirror Glaze" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/80 backdrop-blur-md text-on-primary font-label text-[10px] uppercase tracking-widest">DEMONSTRATION</span>
              <span className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-display text-sm font-semibold shadow-sm">Concept: $84 CAD</span>
            </div>
            <div className="p-space-md flex flex-col flex-1 justify-between space-y-space-sm">
              <div className="space-y-1">
                <span className="font-label text-[10px] uppercase tracking-wider text-secondary">Dark Chocolate Entremet</span>
                <h3 className="font-display text-2xl text-primary">Noir Valrhona</h3>
                <p className="font-body text-sm text-on-surface-variant">Dark cocoa bean mousse, Madagascar vanilla crémeux, blackberry compote, and cocoa mirror finish.</p>
              </div>
              <div className="pt-space-xs flex items-center justify-between border-t border-outline-variant/10 mt-4">
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label text-[9px] uppercase">Serves 6–8</span>
                </div>
                <a href="#bespoke-studio-section" className="w-8 h-8 rounded-full bg-surface-container group-hover:bg-primary-container group-hover:text-on-primary text-primary flex items-center justify-center transition-colors mt-3">
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:-translate-y-4 border border-outline-variant/10">
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-container">
              <img src="https://lh3.googleusercontent.com/aida/AEtjO1WkVYj_WmfgnVFQzwlPqmSy0LS13xAZ2JKxCApB4MUZ5zHwp9U8rOQ2Lo9Pv1wJ3PezniVZ_QZCJhhIHiKmYwaCM8MEzVTEqEwzw60yaMbKrmM841RUgu-PKFBdYGvOSrpn27v8RY9tCirTGc3rJvJMB_zDIA4zNLxDdD2i0mkCxKaCNm-m2z5e5IcHgpLSWs0Zgkr15ccxb6Eok9vJbktWw4B6tSqUVPNvBorBe3BsG37wrFQGcVgPpfzp" alt="L'Ivoire Jasmine Architectural Cake" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label text-[10px] uppercase tracking-widest">CONCEPT COLLECTION</span>
              <span className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-display text-sm font-semibold shadow-sm">Estimate: From $320 CAD</span>
            </div>
            <div className="p-space-md flex flex-col flex-1 justify-between space-y-space-sm">
              <div className="space-y-1">
                <span className="font-label text-[10px] uppercase tracking-wider text-secondary">Architectural Wedding Cake</span>
                <h3 className="font-display text-2xl text-primary">L'Ivoire Jasmine</h3>
                <p className="font-body text-sm text-on-surface-variant">Rice paper sculptural waves cascading over delicate white velvet cake, infused with organic silver needle jasmine tea.</p>
              </div>
              <div className="pt-space-xs flex items-center justify-between border-t border-outline-variant/10 mt-4">
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label text-[9px] uppercase">Custom Sizing</span>
                </div>
                <a href="#bespoke-studio-section" className="w-8 h-8 rounded-full bg-surface-container group-hover:bg-primary-container group-hover:text-on-primary text-primary flex items-center justify-center transition-colors mt-3">
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col border border-outline-variant/10">
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-container">
              <img src="https://lh3.googleusercontent.com/aida/AEtjO1WuHWGeN0uFB2m1cHFLLHJjlYo0n0jbgn3DsOlkkEWxT6wXqu9_nU99e7WvcA3Ggw_FpuIkStex9ydIHTzEBBMpAj8-TJ8n9OGaf0Ke6HMRwBxHKXejkZtK1746sXBCrKa1IbLwx2Zoawa-UmxDryE_agt2MnuKIC_4wOrGwBqr0DZIPTwcvmWedBl7ZK6yc5NTA468iPxWb9Sjh5M-X42oNiGDcR9VrLUdoks0cqfZxu6S2x-dSqiML72_" alt="Le Fraisier Royal Strawberry Sponge" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-tertiary-fixed-dim/70 text-on-tertiary-fixed-variant font-label text-[10px] uppercase tracking-widest">DEMONSTRATION</span>
              <span className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-display text-sm font-semibold shadow-sm">Concept: $78 CAD</span>
            </div>
            <div className="p-space-md flex flex-col flex-1 justify-between space-y-space-sm">
              <div className="space-y-1">
                <span className="font-label text-[10px] uppercase tracking-wider text-secondary">Parisian Strawberry Sponge</span>
                <h3 className="font-display text-2xl text-primary">Le Fraisier Royal</h3>
                <p className="font-body text-sm text-on-surface-variant">Airy pistachio sponge, Tahitian vanilla mousseline cream, and crowned with hand-selected Ontario wild strawberries.</p>
              </div>
              <div className="pt-space-xs flex items-center justify-between border-t border-outline-variant/10 mt-4">
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label text-[9px] uppercase">Serves 8–10</span>
                </div>
                <a href="#bespoke-studio-section" className="w-8 h-8 rounded-full bg-surface-container group-hover:bg-primary-container group-hover:text-on-primary text-primary flex items-center justify-center transition-colors mt-3">
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
