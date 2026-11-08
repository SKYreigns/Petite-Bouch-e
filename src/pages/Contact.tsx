import {
  ArrowRight,
  ArrowUpRight,
  CakeSlice,
  Clock,
  MapPin,
  Phone,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { business, formatAddress } from '../data/site';
import { HoursCard } from '../components/ui/HoursCard';
import { InstagramIcon } from '../components/ui/InstagramIcon';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { usePageMeta } from '../lib/usePageMeta';

const faqs = [
  {
    question: 'Where is the bakery?',
    answer: `${formatAddress()}. Use the directions link for Google Maps.`,
  },
  {
    question: 'What are your opening hours?',
    answer:
      'Monday 12:00 pm – 7:00 pm, Tuesday to Sunday 10:00 am – 7:00 pm. Please call ahead to confirm holiday hours, as they can differ from the regular schedule.',
  },
  {
    question: 'Do you make custom celebration cakes?',
    answer:
      'Yes. Celebration cakes are made to order. Share your occasion, date and design direction through the cake enquiry page, or call the bakery to speak with the team directly.',
  },
  {
    question: 'How do I ask about allergens or dietary requirements?',
    answer:
      'Ingredient and allergen information is available in store. Please speak with our team before ordering if you have an allergy or dietary requirement, so the bakery can advise you directly.',
  },
  {
    question: 'Can I check what is available today?',
    answer:
      'Menu availability changes daily. Call the bakery for the day’s counter selection before making a special trip.',
  },
  {
    question: 'How do I ask about collection or delivery?',
    answer:
      'Please contact the bakery directly to ask about collection and any delivery options for your order. Details are confirmed by the team rather than by this website.',
  },
];

export function Contact() {
  usePageMeta(
    'Contact & Visit — Petite Bouchée Patisserie, Toronto',
    'Visit Petite Bouchée at 28 Sousa Mendes St, Toronto, or call +1 416-588-8882. Opening hours, directions, Instagram and custom cake enquiries.'
  );

  return (
    <>
      <PageHero
        eyebrow="Contact & visit"
        title={
          <>
            Come Say
            <br />
            <span className="italic font-normal text-secondary">Hello.</span>
          </>
        }
        description="Find us at 28 Sousa Mendes St in Toronto. Call the bakery for today’s counter, opening hours or a cake enquiry — or send a message on Instagram."
        image="images/editorial/fresh-bakes.jpg"
        imageAlt="Freshly baked pastries and bread arranged on a bakery table"
        caption="The counter at 28 Sousa Mendes St."
        actions={
          <>
            <a href={`tel:${business.phone.href}`} className="btn btn-primary">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call the Bakery
            </a>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Get Directions
            </a>
          </>
        }
      />

      <section className="bg-surface py-14 lg:py-20" aria-labelledby="contact-details">
        <div className="shell">
          <SectionHeading
            id="contact-details"
            eyebrow="The details"
            title="Everything you need for a visit."
            description="No contact form, no waiting on an inbox — reach the bakery the way that suits you."
          />

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card group flex flex-col p-6 transition-colors hover:border-secondary"
            >
              <MapPin className="h-5 w-5 text-secondary" aria-hidden="true" />
              <h3 className="label-caps mt-4 text-secondary">Visit</h3>
              <address className="body-md mt-2 not-italic text-primary">
                {business.address.street}
                <br />
                {business.address.city}, {business.address.region}{' '}
                {business.address.postalCode}
              </address>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-secondary">
                Open in Maps
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </a>

            <a
              href={`tel:${business.phone.href}`}
              className="card group flex flex-col p-6 transition-colors hover:border-secondary"
            >
              <Phone className="h-5 w-5 text-secondary" aria-hidden="true" />
              <h3 className="label-caps mt-4 text-secondary">Call</h3>
              <p className="body-md mt-2 font-medium text-primary">
                {business.phone.display}
              </p>
              <p className="body-sm mt-2 text-on-surface-variant">
                For today’s counter, hours and cake questions.
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-secondary">
                Call now
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </a>

            <a
              href={business.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card group flex flex-col p-6 transition-colors hover:border-secondary"
            >
              <InstagramIcon className="h-5 w-5 text-secondary" />
              <h3 className="label-caps mt-4 text-secondary">Instagram</h3>
              <p className="body-md mt-2 break-all font-medium text-primary">
                {business.instagram.handle}
              </p>
              <p className="body-sm mt-2 text-on-surface-variant">
                Daily bakes, new arrivals and messages.
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-secondary">
                Send a message
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </a>

            <div className="card flex flex-col p-6">
              <Clock className="h-5 w-5 text-secondary" aria-hidden="true" />
              <h3 className="label-caps mt-4 text-secondary">Hours</h3>
              <p className="body-md mt-2 text-primary">
                Monday
                <br />
                12:00 pm – 7:00 pm
              </p>
              <p className="body-md mt-2 text-primary">
                Tuesday – Sunday
                <br />
                10:00 am – 7:00 pm
              </p>
              <p className="body-sm mt-2 text-on-surface-variant">
                Please call ahead to confirm holiday hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#efe5d6] bg-surface-container-low/50 py-14 lg:py-20">
        <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <HoursCard />
            <div className="mt-5 rounded-lg border border-champagne/40 bg-secondary-container/15 p-5">
              <h3 className="label-caps text-secondary">Before you visit</h3>
              <ul className="body-sm mt-3 space-y-2 text-on-surface-variant">
                <li>
                  Menu availability changes throughout the day. Call ahead for a
                  specific bake.
                </li>
                <li>
                  Holiday hours can differ from the regular schedule — please
                  confirm by phone.
                </li>
                <li>
                  For allergens and dietary requirements, speak with the team in
                  store before ordering.
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="card overflow-hidden">
              <div className="relative flex min-h-[220px] flex-col items-center justify-center overflow-hidden bg-surface-container p-8 text-center">
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 1px 1px, rgba(184,154,106,0.3) 1px, transparent 0)',
                    backgroundSize: '18px 18px',
                  }}
                  aria-hidden="true"
                />
                <div className="relative">
                  <MapPin
                    className="mx-auto h-9 w-9 text-secondary"
                    aria-hidden="true"
                  />
                  <p className="headline-sm mt-3 text-xl">
                    Petite Bouchée Patisserie
                  </p>
                  <address className="body-md mt-1 not-italic text-on-surface-variant">
                    {formatAddress()}
                  </address>
                  <a
                    href={business.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mt-5"
                  >
                    Open in Google Maps
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
              <div className="border-t border-[#efe5d6] px-5 py-4 sm:px-6">
                <p className="body-sm text-on-surface-variant">
                  The bakery is at 28 Sousa Mendes St. Please use the map link
                  for current directions and transit options.
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 rounded-lg bg-primary p-6 text-surface sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="label-caps text-secondary-fixed">
                  Planning a celebration?
                </p>
                <p className="headline-sm mt-1 text-lg text-surface">
                  Start a custom cake enquiry.
                </p>
              </div>
              <Link to="/custom-cakes" className="btn btn-champagne shrink-0">
                <CakeSlice className="h-4 w-4" aria-hidden="true" />
                Cake Enquiries
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-14 lg:py-20" aria-labelledby="faq-heading">
        <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              id="faq-heading"
              eyebrow="Good to know"
              title="Questions, answered."
              description="A few practical notes before you visit or place an order."
            />
            <a
              href={`tel:${business.phone.href}`}
              className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-primary"
            >
              <Phone className="h-4 w-4 text-secondary" aria-hidden="true" />
              Still curious? Call {business.phone.display}
            </a>
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-[#efe5d6] border-y border-[#efe5d6]">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-1">
                  <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-3 text-left">
                    <span className="text-sm font-semibold text-primary">
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#e5dccd] text-secondary transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="body-sm max-w-2xl pb-4 pr-10 text-on-surface-variant">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
