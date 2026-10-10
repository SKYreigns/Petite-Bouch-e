# Technology Stack and Engineering Constraints

**Status:** Approved by Project Lead (Phase 1 Foundation)

## Approved Architecture & Technology Stack

- **Build Engine & Bundler:** Vite
- **UI Framework:** React (TypeScript)
- **Styling:** Tailwind CSS + Custom Design System Tokens
- **Typography:** Google Fonts (`Playfair Display` for Display/Headlines, `DM Sans` for Body/Labels, `Material Symbols Outlined` for Icons)
- **Deployment & Hosting:** Vercel (Static CDN + Vercel Serverless Functions in `/api`)
- **Integration Layer:** Decoupled Adapter Pattern (`InquiryProviderAdapter`) with server-side API secret isolation.

## Architectural Constraints & Guardrails

1. **Visual Baseline:** The visual prototype (`Petite_Bouchée_ProtoType.html`), supplied screenshot, and `DESIGN.md` form the sole visual authority. Stitch MCP is strictly an auxiliary reference tool.
2. **Provider Decoupling:** The frontend application must not be coupled to any specific email or CRM provider (e.g. Resend, SendGrid, Supabase). All inquiry transmissions pass through `InquiryProviderAdapter`.
3. **Production Security Guard:** `MockInquiryAdapter` is strictly forbidden in production. Application configuration includes a mandatory security guard that throws a fatal error if `MockInquiryAdapter` is invoked in `production` environment mode.
4. **Data Privacy & Transient State:** No customer Personally Identifiable Information (PII) may be saved to `localStorage` by default. Configurator and form states remain transient in React state during the user session.
5. **No Secret Leaks:** Client-side environment variables (`VITE_*`) must never contain private provider API keys or administrative credentials.
