import React, { useState, useEffect, useCallback } from 'react';

const CAKES = [
  {
    title: 'Velvet Rose',
    category: 'CONCEPT COLLECTION',
    desc: 'Signature velvet sponge with rosewater essence and a delicate ruby chocolate finish. Details to be confirmed with the bakery.',
    price: 'Concept Demo: $75 CAD',
    img: 'https://lh3.googleusercontent.com/aida/AEtjO1XS8bBI1PBawDOb3vlp9Nxh_QZn70B1DZO2KvLr9ddwytOrtp0WTZTIIGKUhZGk6a9CRptWsOs_PY3doo1TwWnXRSHp9FltN2Ovv6iuZ4YDkpgUoXrvYJU7URO3gwn4tbbxw7EQs9Qv80mpY_UoVyeoG7_sWpV2ebxNrLe8G0D_IKPjveF-W90D1b3YGNKvLq2EAGpYp6f_L40I3_5IMSdFPsJLUFo_1UyEpYQgBRC25itborsOXnVnbvR1',
  },
  {
    title: 'Noir Valrhona',
    category: 'CONCEPT COLLECTION',
    desc: 'Dark cocoa bean mousse concept, fragrant vanilla crémeux, wild berry infusion, and a high-gloss chocolate mirror glaze.',
    price: 'Concept Demo: $84 CAD',
    img: 'https://lh3.googleusercontent.com/aida/AEtjO1Vp7ibLJ0WGTsGoOejdzCZZQyWJrhe5_tYi89eu3KroCgqr1F4fgqfAdjIvZcBn7Ip2uoWkvuSxBPxkj5MO9xGuyCTmUWvgyd7u_iQS3gkXJS3TQSp591-F0Xc6wckv91jbI2miZGVPklY0gvL3Lw7Asou01ig-arMisTdDXEGIMg8QmwhHP0qM4jYVfO5cLRR2MY75qhPqD01Ts-9AjxaQf1cvfOCNz9tr-Bl3cgzHYvnEzZsH95tQRACs',
  },
  {
    title: 'L\'Ivoire Jasmine',
    category: 'ARCHITECTURAL TIERED',
    desc: 'Rice paper sculptural waves cascading over delicate white velvet cake, infused with organic silver needle jasmine tea.',
    price: 'Concept Estimate: From $320 CAD',
    img: 'https://lh3.googleusercontent.com/aida/AEtjO1WkVYj_WmfgnVFQzwlPqmSy0LS13xAZ2JKxCApB4MUZ5zHwp9U8rOQ2Lo9Pv1wJ3PezniVZ_QZCJhhIHiKmYwaCM8MEzVTEqEwzw60yaMbKrmM841RUgu-PKFBdYGvOSrpn27v8RY9tCirTGc3rJvJMB_zDIA4zNLxDdD2i0mkCxKaCNm-m2z5e5IcHgpLSWs0Zgkr15ccxb6Eok9vJbktWw4B6tSqUVPNvBorBe3BsG37wrFQGcVgPpfzp',
  },
  {
    title: 'Le Fraisier Royal',
    category: 'SEASONAL CONCEPT',
    desc: 'Airy pistachio sponge, Tahitian vanilla mousseline cream, and crowned with hand-selected Ontario wild strawberries in kirsch glaze.',
    price: 'Concept Demo: $78 CAD',
    img: 'https://lh3.googleusercontent.com/aida/AEtjO1WuHWGeN0uFB2m1cHFLLHJjlYo0n0jbgn3DsOlkkEWxT6wXqu9_nU99e7WvcA3Ggw_FpuIkStex9ydIHTzEBBMpAj8-TJ8n9OGaf0Ke6HMRwBxHKXejkZtK1746sXBCrKa1IbLwx2Zoawa-UmxDryE_agt2MnuKIC_4wOrGwBqr0DZIPTwcvmWedBl7ZK6yc5NTA468iPxWb9Sjh5M-X42oNiGDcR9VrLUdoks0cqfZxu6S2x-dSqiML72_',
  },
  {
    title: 'Praliné Noisette',
    category: 'CONCEPT COLLECTION',
    desc: 'Gold spun sugar atop a roasted hazelnut praline crunch, milk chocolate bavarois, and a tender hazelnut dacquoise sponge.',
    price: 'Concept Demo: $82 CAD',
    img: 'https://lh3.googleusercontent.com/aida/AEtjO1U4AgiBGz9LDk0fwAvzeiUTMDpN5WWzLat9ClSyYQr5AD1Boyxsj67A3bXrcmugcyHGP9ugVqkGk0mlSCpl6nims4TQvlpb9VGPFez0uxlxS6Y5ZiOkmksYCYvLY4jEPJWsEyhl13dsdeLE2_WQr7EdchIcdjZ8L86tmEi-H1WjTIkJQCUxYKZifbCOuHVQQvcgENXHBurpWVEfR8vubSRifSaatMmE0HDBBGOTdZumtSnjtV8ZMc_mEFI',
  },
];

export const Hero: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % CAKES.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + CAKES.length) % CAKES.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          nextSlide();
          return 0;
        }
        return p + 2; // 50 ticks = 5 seconds
      });
    }, 100);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const getStyleForOffset = (offset: number) => {
    // For mobile, reduce translation distances
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const baseTranslateX = isMobile ? 80 : 155;
    const outerTranslateX = isMobile ? 140 : 285;
    const translateYInner = isMobile ? -10 : -18;
    const translateYOuter = isMobile ? -20 : -42;
    const scaleInner = isMobile ? 0.8 : 0.76;
    const scaleOuter = isMobile ? 0.6 : 0.52;

    if (offset === 0) {
      return {
        transform: 'translateX(0px) translateY(0px) scale(1)',
        zIndex: 30,
        opacity: 1,
        filter: 'drop-shadow(rgba(57, 39, 31, 0.22) 0px 20px 30px)',
      };
    } else if (offset === -1 || offset === 4) {
      return {
        transform: `translateX(-${baseTranslateX}px) translateY(${translateYInner}px) scale(${scaleInner})`,
        zIndex: 20,
        opacity: 0.85,
        filter: 'drop-shadow(rgba(57, 39, 31, 0.12) 0px 10px 18px)',
      };
    } else if (offset === 1 || offset === -4) {
      return {
        transform: `translateX(${baseTranslateX}px) translateY(${translateYInner}px) scale(${scaleInner})`,
        zIndex: 20,
        opacity: 0.85,
        filter: 'drop-shadow(rgba(57, 39, 31, 0.12) 0px 10px 18px)',
      };
    } else if (offset === -2 || offset === 3) {
      return {
        transform: `translateX(-${outerTranslateX}px) translateY(${translateYOuter}px) scale(${scaleOuter})`,
        zIndex: 10,
        opacity: 0.45,
        filter: 'drop-shadow(rgba(57, 39, 31, 0.06) 0px 4px 10px)',
      };
    } else {
      return {
        transform: `translateX(${outerTranslateX}px) translateY(${translateYOuter}px) scale(${scaleOuter})`,
        zIndex: 10,
        opacity: 0.45,
        filter: 'drop-shadow(rgba(57, 39, 31, 0.06) 0px 4px 10px)',
      };
    }
  };

  const activeCake = CAKES[activeIndex];

  return (
    <section id="home" className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center bg-surface overflow-hidden px-margin-mobile md:px-space-lg lg:px-margin py-space-xl lg:py-0">
      {/* Ambient Light Effects */}
      <div className="absolute -top-40 right-1/4 w-[620px] h-[620px] rounded-full bg-secondary-container/20 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -left-32 w-[520px] h-[520px] rounded-full bg-tertiary-fixed-dim/25 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute -bottom-20 right-10 w-[420px] h-[420px] rounded-full bg-secondary-fixed/20 blur-[100px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-gutter items-center relative z-10">
        
        {/* Left Column: Editorial Storytelling */}
        <div className="lg:col-span-5 flex flex-col items-start space-y-space-md text-left pt-space-sm lg:pt-0">
          <div className="inline-flex items-center gap-2.5 px-space-sm py-1.5 rounded-full bg-surface-container shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="font-label text-[11px] uppercase tracking-[0.22em] text-secondary font-semibold">Artisan Patisserie · Toronto</span>
          </div>
          
          <div className="space-y-space-xs">
            <h1 className="font-display text-5xl sm:text-6xl lg:text-[64px] text-primary tracking-tight leading-[1.08]">
              Crafted with Love. <br />
              <span className="italic font-display text-secondary font-light">Designed to Delight.</span>
            </h1>
          </div>
          
          <p className="font-body text-body-lg text-on-surface-variant max-w-lg leading-relaxed">
            Discover extraordinary demonstration cakes and architectural patisserie concepts, handcrafted for life's most unforgettable celebrations with Parisian-inspired savoir-faire in Toronto, Canada.
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm pt-space-xs w-full sm:w-auto">
            <a href="#vitrine-section" className="inline-flex items-center justify-center px-space-lg py-3.5 rounded-full bg-primary-container text-on-primary font-label text-[11px] uppercase tracking-[0.16em] shadow-lg hover:bg-primary transition-all duration-300 group">
              <span>Explore Our Creations</span>
              <span className="material-symbols-outlined ml-2 text-[16px] text-secondary-fixed group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
            <a href="#bespoke-studio-section" className="inline-flex items-center justify-center px-space-md py-3.5 rounded-full bg-surface-container-low text-primary font-label text-[11px] uppercase tracking-[0.16em] hover:bg-surface-container-high transition-all duration-300 border border-outline-variant/30">
              <span>Create a Custom Cake</span>
            </a>
          </div>
        </div>

        {/* Right Column: Orbital Carousel */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative w-full pt-10 lg:pt-0">
          <div className="relative w-full h-[320px] sm:h-[420px] md:h-[460px] flex items-center justify-center select-none">
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-[260px] rounded-[50%] bg-gradient-to-b from-secondary-container/10 to-transparent pointer-events-none -z-0" />
            <div className="absolute bottom-6 w-[280px] h-[36px] bg-secondary/15 rounded-[100%] blur-[28px] pointer-events-none" />
            
            <div className="relative w-full h-full flex items-center justify-center overflow-visible">
              {CAKES.map((cake, index) => {
                const offset = index - activeIndex;
                const style = getStyleForOffset(offset);
                
                return (
                  <div
                    key={cake.title}
                    className="absolute cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col items-center"
                    style={style}
                    onClick={() => {
                      setActiveIndex(index);
                      setProgress(0);
                    }}
                  >
                    <div className="w-[180px] sm:w-[290px] md:w-[330px] aspect-square rounded-full p-2 bg-gradient-to-b from-surface-container-lowest to-surface-container shadow-2xl flex items-center justify-center overflow-hidden">
                      <img
                        src={cake.img}
                        alt={cake.title}
                        className="w-full h-full object-cover rounded-full pointer-events-none transform transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Controls & Active Info */}
          <div className="w-full max-w-xl bg-surface-container-lowest/90 backdrop-blur-md rounded-2xl p-space-md shadow-lg flex flex-col gap-space-sm mt-4 relative z-20 border border-outline-variant/20">
            <div className="flex items-start justify-between gap-space-sm">
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary font-semibold">{activeCake.category}</span>
                  <span className="px-2 py-0.5 rounded text-[9px] uppercase font-label bg-surface-container text-outline">Demo</span>
                </div>
                <h3 className="font-display text-2xl text-primary tracking-tight">{activeCake.title}</h3>
                <p className="font-body text-xs text-on-surface-variant max-w-md line-clamp-2">{activeCake.desc}</p>
                <span className="text-xs font-label text-secondary font-semibold block pt-1">{activeCake.price}</span>
              </div>
              <a href="#bespoke-studio-section" className="hidden sm:inline-flex items-center gap-1.5 px-space-sm py-2 rounded-full bg-secondary-container text-on-secondary-container font-label text-[10px] uppercase tracking-wider shrink-0 hover:bg-secondary-fixed transition-colors">
                <span>Customize</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </a>
            </div>
            
            <div className="pt-space-xs flex items-center justify-between border-t border-outline-variant/20 mt-2">
              <div className="flex items-center gap-1.5 mt-2">
                {CAKES.map((_, idx) => (
                  <button
                    key={idx}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all ${activeIndex === idx ? 'w-7 bg-secondary' : 'w-2 bg-outline-variant/60 hover:bg-secondary/60'}`}
                    onClick={() => {
                      setActiveIndex(idx);
                      setProgress(0);
                    }}
                  />
                ))}
              </div>
              <div className="hidden sm:block w-28 h-1 bg-surface-container rounded-full overflow-hidden mt-2">
                <div className="h-full bg-secondary transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button aria-label="Previous" onClick={prevSlide} className="w-8 h-8 rounded-full bg-surface-container hover:bg-secondary-container text-primary flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-[16px]">west</span>
                </button>
                <button aria-label="Next" onClick={nextSlide} className="w-8 h-8 rounded-full bg-secondary-container hover:bg-secondary-fixed text-primary flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-[16px]">east</span>
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
