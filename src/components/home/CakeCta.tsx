import {
  ArrowRight,
  CakeSlice,
  CalendarDays,
  CheckCircle2,
  Palette,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { asset } from '../../lib/asset';

const highlights = [
  {
    icon: CalendarDays,
    title: 'Made to order',
    copy: 'Each cake is planned around your date, guest count and design direction.',
  },
  {
    icon: Palette,
    title: 'Flavour & finish',
    copy: 'Choose a flavour direction and a style, from pressed florals to classic piping.',
  },
  {
    icon: CheckCircle2,
    title: 'Clear quotes',
    copy: 'Pricing is confirmed by our team after we review your request. No payment is taken online.',
  },
];

export function CakeCta() {
  return (
    <section className="relative overflow-hidden bg-primary py-16 text-surface lg:py-24">
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-secondary/20 blur-[100px]" />
      <div className="shell relative grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <figure className="relative mx-auto w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-primary-container shadow-bloom">
            <img
              src={asset('images/cakes/pressed-florals.jpg')}
              alt="Two-tier celebration cake with smooth ivory buttercream and pressed edible flowers"
              width={1024}
              height={1024}
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-5 bottom-5 rounded-xl border border-white/20 bg-primary/30 p-4 backdrop-blur-md">
              <p className="label-caps text-secondary-fixed">
                Handcrafted for your milestone
              </p>
              <p className="headline-sm mt-1 text-sm text-surface">
                Pressed botanical celebration cake
              </p>
              <p className="mt-1 text-[0.6875rem] leading-relaxed text-outline-variant">
                A bespoke design, planned with our team.
              </p>
            </figcaption>
          </figure>
        </div>

        <div className="lg:col-span-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-primary-container px-3 py-1.5">
            <CakeSlice
              className="h-3.5 w-3.5 text-secondary-fixed"
              aria-hidden="true"
            />
            <span className="label-caps text-secondary-fixed">
              Custom milestone commissions
            </span>
          </p>

          <h2 className="headline-lg mt-4 text-surface">
            Something Special for
            <br />
            <span className="italic font-normal text-secondary-fixed">
              Your Celebration.
            </span>
          </h2>

          <p className="body-lg mt-4 text-outline-variant">
            Every celebration cake is made to order. Share your occasion, guest
            count, flavour direction and date, and our team will confirm
            availability and a tailored quote.
          </p>

          <div className="mt-7 space-y-4">
            {highlights.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <item.icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-secondary-fixed"
                  aria-hidden="true"
                />
                <p className="body-sm text-outline-variant">
                  <strong className="font-medium text-surface">
                    {item.title}:
                  </strong>{' '}
                  {item.copy}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <Link to="/custom-cakes" className="btn btn-champagne">
              Start a Cake Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
