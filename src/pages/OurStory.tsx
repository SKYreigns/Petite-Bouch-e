import {
  ArrowRight,
  ArrowUpRight,
  Coffee,
  Croissant,
  Heart,
  MapPin,
  Wheat,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { business, formatAddress } from '../data/site';
import { asset } from '../lib/asset';
import { InstagramIcon } from '../components/ui/InstagramIcon';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { usePageMeta } from '../lib/usePageMeta';

const values = [
  {
    icon: Croissant,
    title: 'A daily bake',
    copy: 'Cruffins, croissants and viennoiserie are part of the morning rhythm at the counter, alongside the cakes and tarts in the vitrine.',
  },
  {
    icon: Wheat,
    title: 'French craft, local roots',
    copy: 'French-inspired pastry sits next to Portuguese country bread, bifana and the bakes that reflect the neighbourhood we serve.',
  },
  {
    icon: Heart,
    title: 'Made to be shared',
    copy: 'From a box of pastries to a celebration cake, the counter is built around the things people bring to the table together.',
  },
];

const counterLinks = [
  {
    title: 'Morning pastry',
    copy: 'Cruffins, croissants, danishes and the morning viennoiserie counter.',
    image: 'images/editorial/viennoiserie.jpg',
    alt: 'A table of croissants, pastries and bread',
    href: '/menu#cruffins',
    label: 'Explore viennoiserie',
  },
  {
    title: 'Bread & savoury',
    copy: 'Portuguese country bread, sourdough and savoury bakes for the table.',
    image: 'images/editorial/bread.jpg',
    alt: 'Fresh loaves of bread on a bakery counter',
    href: '/menu#bread',
    label: 'Explore bread',
  },
  {
    title: 'Cakes & celebration',
    copy: 'Vitrine cakes, cheesecakes and bespoke celebration commissions.',
    image: 'images/cakes/pressed-florals.jpg',
    alt: 'A celebration cake decorated with pressed flowers',
    href: '/custom-cakes',
    label: 'Explore custom cakes',
  },
];

export function OurStory() {
  usePageMeta(
    'Our Story — Petite Bouchée Patisserie, Toronto',
    'Petite Bouchée is a Toronto patisserie baking French-inspired viennoiserie, Portuguese country bread, seasonal tarts and bespoke celebration cakes.'
  );

  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={
          <>
            Rooted in Toronto.
            <br />
            <span className="italic font-normal text-secondary">
              Baked for the Everyday.
            </span>
          </>
        }
        description="Petite Bouchée is a neighbourhood patisserie built around the daily ritual of fresh baking — early mornings, laminated pastry, simmered fillings and a counter full of things to share."
        image="images/editorial/baking-hands.jpg"
        imageAlt="A baker shaping dough by hand in the Petite Bouchée kitchen"
        caption={`Toronto · Est. ${business.established}`}
        imageSide="left"
        actions={
          <>
            <Link to="/menu" className="btn btn-primary">
              Explore the Menu
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={business.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <InstagramIcon className="h-4 w-4" />
              Follow Along
            </a>
          </>
        }
      />

      <section className="bg-surface py-14 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="A neighbourhood bakery"
              title="A small counter with a wide table."
              description="We bake for the people who walk past the door, the families who order a cake for a milestone, and the neighbours who come back for the same morning pastry."
            />
          </div>
          <div className="space-y-4 lg:col-span-7">
            <p className="body-lg text-on-surface-variant">
              Petite Bouchée brings together two baking traditions that meet
              naturally in Toronto. There is the precision of French pastry —
              laminated dough, careful tarts, a considered finish — and the
              generous, everyday baking of a Portuguese bakery, from country
              bread to a bifana at lunch.
            </p>
            <p className="body-md text-on-surface-variant">
              The menu changes with the day and the season. Some mornings the
              vitrine is full of cruffins and danishes; other days the focus
              shifts to tarts, cheesecakes or a celebration cake being finished
              for collection. What stays the same is the approach: bake it with
              care, keep it honest, and make it worth coming back for.
            </p>
            <p className="body-md text-on-surface-variant">
              We are at 28 Sousa Mendes St in Toronto. Whether you are stopping
              in for a coffee and a pastry or planning something larger for a
              celebration, there is a place for you at the counter.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/contact" className="btn btn-secondary">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Visit the Bakery
              </Link>
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-secondary transition-colors hover:text-primary"
              >
                Get directions
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#efe5d6] bg-surface-container-low/50 py-14 lg:py-20">
        <div className="shell">
          <SectionHeading
            align="center"
            eyebrow="What guides us"
            title="Three things we care about."
            description="Simple principles, repeated every morning at the counter."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3 lg:gap-8">
            {values.map((value) => (
              <div key={value.title} className="card p-6 lg:p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-container/50 text-secondary">
                  <value.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="headline-sm mt-4 text-xl">{value.title}</h3>
                <p className="body-sm mt-2 text-on-surface-variant">
                  {value.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-14 lg:py-20" aria-labelledby="counter-heading">
        <div className="shell">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="counter-heading"
              eyebrow="At the counter"
              title="A little of everything."
              description="Three corners of the bakery, each with its own rhythm."
            />
            <Link
              to="/menu"
              className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-secondary transition-colors hover:text-primary"
            >
              View the full menu
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3 lg:gap-8">
            {counterLinks.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="card card-hover group overflow-hidden"
              >
                <div className="overflow-hidden">
                  <img
                    src={asset(item.image)}
                    alt={item.alt}
                    width={1408}
                    height={768}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-5">
                  <h3 className="headline-sm text-xl">{item.title}</h3>
                  <p className="body-sm mt-1.5 text-on-surface-variant">
                    {item.copy}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-secondary">
                    {item.label}
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary py-14 text-surface lg:py-20">
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-secondary/20 blur-[100px]" />
        <div className="shell relative grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="label-caps text-secondary-fixed">
              The everyday ritual
            </p>
            <h2 className="headline-lg mt-3 text-surface">
              Coffee, a pastry and
              <br />
              <span className="italic font-normal text-secondary-fixed">
                a moment to yourself.
              </span>
            </h2>
            <p className="body-lg mt-4 max-w-2xl text-outline-variant">
              Not every visit needs an occasion. Sometimes it is a coffee and a
              bake at the counter, or a loaf of Portuguese country bread on the
              way home. Those small rituals are just as much a part of the
              bakery as the celebration cakes.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/menu#cafe" className="btn btn-champagne">
                <Coffee className="h-4 w-4" aria-hidden="true" />
                Café & Drinks
              </Link>
              <a
                href={`tel:${business.phone.href}`}
                className="inline-flex min-h-[44px] items-center gap-2 px-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-secondary-fixed transition-colors hover:text-surface"
              >
                Call {business.phone.display}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-primary-container p-6 sm:p-8">
              <MapPin
                className="h-6 w-6 text-secondary-fixed"
                aria-hidden="true"
              />
              <p className="headline-sm mt-4 text-lg text-surface">
                Find us in Toronto
              </p>
              <address className="body-sm mt-2 not-italic text-outline-variant">
                {formatAddress()}
              </address>
              <p className="body-sm mt-4 text-outline-variant">
                {business.hoursNote}
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-secondary-fixed transition-colors hover:text-surface"
              >
                Contact & hours
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
