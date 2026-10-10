import React, { useState } from 'react';
import { appConfig, getInquiryAdapter } from '../../config/appConfig';

const OCCASIONS = [
  { id: 'Birthday', icon: 'cake', desc: 'Joyous signature cakes' },
  { id: 'Wedding', icon: 'favorite', desc: 'Tiered couture centerpieces' },
  { id: 'Anniversary', icon: 'celebration', desc: 'Romantic milestone gateaux' },
  { id: 'Engagement', icon: 'diamond', desc: 'Delicate sugar camellias' },
  { id: 'Baby Shower', icon: 'child_care', desc: 'Pastel botanical elegance' },
  { id: 'Corporate', icon: 'apartment', desc: 'Architectural brand galas' },
];

const SERVINGS = [
  { id: '6-8 Guests', desc: 'Single tier 6-inch', ref: '~$80-$100 CAD' },
  { id: '10-12 Guests', desc: 'Single tier 8-inch', ref: '~$120-$150 CAD' },
  { id: '15-20 Guests', desc: '2-tier compact arrangement', ref: '~$190-$240 CAD' },
  { id: '25-30 Guests', desc: '2-tier grand centerpiece', ref: '~$280-$350 CAD' },
  { id: '40+ Guests', desc: '3-tier haute couture', ref: 'From $420 CAD' },
];

export const Inquiry: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    occasion: '',
    servings: '',
    flavour: 'Custom Atelier Infusion',
    design: 'Minimalist Sculptural',
    colour: 'Porcelain Ivory',
    date: '',
    budget: '',
    name: '',
    email: '',
    notes: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const nextStep = () => {
    if (step === 1 && !formData.occasion) return setErrorMsg('Please select an occasion.');
    if (step === 2 && !formData.servings) return setErrorMsg('Please select estimated servings.');
    setErrorMsg('');
    setStep((s) => Math.min(s + 1, 6));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const updateForm = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date) {
      setErrorMsg('Name, email, and date are required.');
      return;
    }
    
    if (!appConfig.featureFlags.inquirySubmissionEnabled) {
      setErrorMsg('Inquiry submissions are currently disabled in production. Please contact us directly via email.');
      return;
    }

    try {
      setStatus('submitting');
      const adapter = getInquiryAdapter();
      await adapter.submitInquiry({
        occasion: formData.occasion,
        servings: formData.servings,
        flavour: formData.flavour,
        design: formData.design,
        colour: formData.colour,
        eventDate: formData.date,
        targetBudget: formData.budget,
        customerName: formData.name,
        customerEmail: formData.email,
        submittedAt: new Date().toISOString(),
      });
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'An unknown error occurred.');
    }
  };

  return (
    <section id="bespoke-studio-section" className="w-full py-space-xl px-margin-mobile md:px-space-lg lg:px-margin bg-surface relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto rounded-3xl bg-primary text-on-primary p-space-lg md:p-space-xl relative overflow-hidden shadow-2xl">
        <div className="absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full bg-secondary/20 blur-[100px] pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-[360px] h-[360px] rounded-full bg-tertiary-fixed-dim/15 blur-[90px] pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start relative z-10 text-left">
          
          {/* Left Proposition */}
          <div className="lg:col-span-5 space-y-space-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container text-secondary-fixed text-[10px] font-label uppercase tracking-widest">
              <span className="material-symbols-outlined text-[14px]">brush</span>
              <span>Interactive Bespoke Studio</span>
            </div>
            <h2 className="font-display text-4xl lg:text-[56px] text-surface tracking-tight leading-tight">
              Build Your Vision in <br />
              <span className="italic font-display text-secondary-fixed">Real-Time Haute Confectionery.</span>
            </h2>
            <p className="font-body text-body-lg text-outline-variant max-w-xl">
              Configure every detail of your demonstration cake inquiry—from tier geometry and sponge infusions to floral styling. Complete the workflow to submit a structured atelier brief.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs text-sm font-body text-surface-container-low">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-fixed text-[18px]">check_circle</span>
                <span>3D Cross-Section Preview</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-fixed text-[18px]">check_circle</span>
                <span>Courier Tasting Box</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-fixed text-[18px]">check_circle</span>
                <span>Direct Atelier Consultation</span>
              </div>
            </div>
          </div>

          {/* Right Configurator */}
          <div className="lg:col-span-7 relative flex justify-center w-full">
            <div className="w-full max-w-2xl bg-surface-container-lowest/10 backdrop-blur-xl border border-white/15 rounded-2xl p-space-md sm:p-space-lg shadow-2xl">
              
              {status === 'success' ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container mx-auto flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-[32px]">mark_email_read</span>
                  </div>
                  <h3 className="font-display text-2xl text-surface">Inquiry Received</h3>
                  <p className="text-outline-variant">Thank you, {formData.name}. Our atelier will review your preferences and contact you to confirm availability.</p>
                  <button onClick={() => { setStatus('idle'); setStep(1); }} className="mt-4 px-6 py-2.5 rounded-full border border-white/20 text-surface text-xs font-label uppercase tracking-wider hover:bg-white/10 transition-colors">
                    Start New Inquiry
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse" />
                      <span className="font-label text-[10px] uppercase text-secondary-fixed tracking-wider">Demonstration Inquiry</span>
                    </div>
                    <span className="font-label text-[10px] text-outline-variant">Step 0{step} / 06</span>
                  </div>

                  <div className="min-h-[300px]">
                    {errorMsg && (
                      <div className="mb-4 p-3 rounded-lg bg-error-container/20 border border-error text-error-container text-xs">
                        {errorMsg}
                      </div>
                    )}
                    
                    {step === 1 && (
                      <div className="space-y-4 animate-fade-in">
                        <div>
                          <h4 className="font-display text-2xl text-surface">Select Occasion</h4>
                          <p className="text-xs text-outline-variant mt-1">What special celebration are we crafting this demonstration piece for?</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {OCCASIONS.map(occ => (
                            <button key={occ.id} onClick={() => updateForm('occasion', occ.id)} className={`p-3 rounded-xl border text-left transition-all group ${formData.occasion === occ.id ? 'bg-secondary-fixed/20 border-secondary-fixed' : 'bg-white/5 border-white/20 hover:border-secondary-fixed/50'}`}>
                              <span className="material-symbols-outlined text-secondary-fixed text-lg">{occ.icon}</span>
                              <div className="text-surface font-medium text-sm mt-1">{occ.id}</div>
                              <div className="text-[10px] text-outline-variant">{occ.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-4 animate-fade-in">
                        <div>
                          <h4 className="font-display text-2xl text-surface">Estimated Servings</h4>
                          <p className="text-xs text-outline-variant mt-1">Approximate portion count for your celebration.</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {SERVINGS.map(srv => (
                            <button key={srv.id} onClick={() => updateForm('servings', srv.id)} className={`p-3 rounded-xl border text-left transition-all group ${formData.servings === srv.id ? 'bg-secondary-fixed/20 border-secondary-fixed' : 'bg-white/5 border-white/20 hover:border-secondary-fixed/50'}`}>
                              <div className="text-secondary-fixed font-display text-sm">{srv.id}</div>
                              <div className="text-[10px] text-outline-variant mt-1">{srv.desc}</div>
                              <div className="text-[9px] text-secondary-fixed/80 mt-1">{srv.ref}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-4 animate-fade-in">
                        <div>
                          <h4 className="font-display text-2xl text-surface">Flavour Profile</h4>
                          <p className="text-xs text-outline-variant mt-1">Select the core confectionery sponge and infusion profile.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <button onClick={() => updateForm('flavour', 'Velvet Chocolate')} className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${formData.flavour === 'Velvet Chocolate' ? 'bg-secondary-fixed/20 border-secondary-fixed' : 'bg-white/5 border-white/20'}`}>
                            <div>
                              <div className="text-surface font-medium text-sm">Velvet Chocolate</div>
                              <div className="text-[11px] text-outline-variant">Dark cocoa sponge, vanilla bean mousse</div>
                            </div>
                          </button>
                          <button onClick={() => updateForm('flavour', 'Custom Atelier Infusion')} className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${formData.flavour === 'Custom Atelier Infusion' ? 'bg-secondary-fixed/20 border-secondary-fixed' : 'bg-white/5 border-white/20'}`}>
                            <div>
                              <div className="text-surface font-medium text-sm">Custom Atelier Infusion</div>
                              <div className="text-[11px] text-outline-variant">Collaborative recipe crafted specifically with our pastry chef</div>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 4 && (
                      <div className="space-y-4 animate-fade-in">
                        <div>
                          <h4 className="font-display text-2xl text-surface">Aesthetic Design Styling</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {['Minimalist Sculptural', 'Pressed Botanical Floral', 'Modern Mirror Glaze', 'Heritage French Crown'].map(d => (
                            <button key={d} onClick={() => updateForm('design', d)} className={`p-3 rounded-xl border text-left transition-all ${formData.design === d ? 'bg-secondary-fixed/20 border-secondary-fixed' : 'bg-white/5 border-white/20'}`}>
                              <div className="text-secondary-fixed font-display text-sm">{d}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 5 && (
                      <div className="space-y-4 animate-fade-in">
                        <div>
                          <h4 className="font-display text-2xl text-surface">Colour Harmony</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {['Porcelain Ivory', 'Blush Rose', 'Warm Chocolate', 'Champagne Gold', 'Sage Botanique'].map(c => (
                            <button key={c} onClick={() => updateForm('colour', c)} className={`p-3 rounded-xl border text-left transition-all ${formData.colour === c ? 'bg-secondary-fixed/20 border-secondary-fixed' : 'bg-white/5 border-white/20'}`}>
                              <div className="text-surface font-medium text-sm">{c}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 6 && (
                      <div className="space-y-4 animate-fade-in">
                        <div>
                          <h4 className="font-display text-2xl text-surface">Review & Submit</h4>
                          <p className="text-xs text-outline-variant mt-1">Verify your choices and enter your contact details.</p>
                        </div>
                        
                        <div className="bg-surface-container-lowest/15 rounded-xl p-3 text-xs space-y-1.5 border border-white/10">
                          <div className="flex justify-between"><span className="text-outline-variant">Occasion:</span> <span className="text-surface font-medium">{formData.occasion}</span></div>
                          <div className="flex justify-between"><span className="text-outline-variant">Servings:</span> <span className="text-surface font-medium">{formData.servings}</span></div>
                          <div className="flex justify-between"><span className="text-outline-variant">Flavour:</span> <span className="text-surface font-medium">{formData.flavour}</span></div>
                        </div>

                        <form id="inquiry-form" onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div>
                            <label className="block text-outline-variant mb-1 font-label uppercase">Celebration Date</label>
                            <input required type="date" value={formData.date} onChange={e => updateForm('date', e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-surface text-xs focus:outline-none focus:border-secondary-fixed" />
                          </div>
                          <div>
                            <label className="block text-outline-variant mb-1 font-label uppercase">Target Budget</label>
                            <input type="text" value={formData.budget} onChange={e => updateForm('budget', e.target.value)} placeholder="e.g. $150 – $300 CAD" className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-surface text-xs focus:outline-none focus:border-secondary-fixed" />
                          </div>
                          <div>
                            <label className="block text-outline-variant mb-1 font-label uppercase">Name</label>
                            <input required type="text" value={formData.name} onChange={e => updateForm('name', e.target.value)} placeholder="Your Name" className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-surface text-xs focus:outline-none focus:border-secondary-fixed" />
                          </div>
                          <div>
                            <label className="block text-outline-variant mb-1 font-label uppercase">Email</label>
                            <input required type="email" value={formData.email} onChange={e => updateForm('email', e.target.value)} placeholder="your@email.com" className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-surface text-xs focus:outline-none focus:border-secondary-fixed" />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-outline-variant mb-1 font-label uppercase">Special Notes</label>
                            <textarea rows={2} value={formData.notes} onChange={e => updateForm('notes', e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-surface text-xs focus:outline-none focus:border-secondary-fixed resize-none" />
                          </div>
                        </form>
                      </div>
                    )}
                  </div>

                  {/* Controls Bottom Bar */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-6">
                    <button onClick={prevStep} disabled={step === 1} className="px-4 py-2 rounded-full border border-white/20 text-surface text-xs font-label uppercase tracking-wider hover:bg-white/10 transition-colors disabled:opacity-30">
                      Previous
                    </button>
                    {step < 6 ? (
                      <button onClick={nextStep} className="px-5 py-2.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label text-[11px] uppercase tracking-widest hover:bg-secondary-fixed-dim transition-all flex items-center gap-1.5">
                        <span>Next Step</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                    ) : (
                      <button type="submit" form="inquiry-form" disabled={status === 'submitting'} className="px-5 py-2.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label text-[11px] uppercase tracking-widest hover:bg-secondary-fixed-dim transition-all flex items-center gap-1.5 disabled:opacity-70">
                        <span>{status === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}</span>
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
