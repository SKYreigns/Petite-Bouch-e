import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { business } from '../../data/site';
import { asset } from '../../lib/asset';
import { InstagramIcon } from '../ui/InstagramIcon';
import { SectionHeading } from '../ui/SectionHeading';

export function StoryTeaser() {
  return (
    <section className="border-t border-[#efe5d6] bg-surface py-16 lg:py-24">
      <div className="shell grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="Our story & philosophy"
            title={
              <>
                Baked with Heart,
                <br />
                <span className="italic font-normal text-secondary">
                  Rooted in Toronto.
                </span>
              </>
            }
            description="Petite Bouchée is a Toronto patisserie built around the daily ritual of fresh baking — early mornings, laminated pastry, simmered fillings and a counter full of things to share."
          />
          <p className="body-md mt-4 max-w-xl text-on-surface-variant">
            You’ll find French-inspired viennoiserie alongside Portuguese country
            bread, seasonal tarts and celebration cakes. Everything is baked in
            our Toronto kitchen for our neighbourhood.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link to="/our-story" className="btn btn-primary">
              Read Our Story
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={business.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-secondary transition-colors hover:text-primary"
            >
              <InstagramIcon className="h-4 w-4" />
              Follow along
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-4">
            <figure className="relative overflow-hidden rounded-2xl bg-surface-container">
              <img
                src={asset('images/editorial/baking-hands.jpg')}
                alt="A baker shaping dough in the Petite Bouchée kitchen"
                width={1408}
                height={768}
                className="aspect-[3/4] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="absolute left-3 top-3 rounded-sm bg-surface/[0.94] px-2.5 py-1 text-[0.5625rem] font-semibold uppercase tracking-[0.12em] text-secondary backdrop-blur-md">
                Toronto · Est. {business.established}
              </figcaption>
            </figure>
            <figure className="mt-6 overflow-hidden rounded-2xl bg-surface-container">
              <img
                src={asset('images/editorial/fresh-bakes.jpg')}
                alt="Freshly baked bread and pastries on a wooden bakery table"
                width={1408}
                height={768}
                className="aspect-[3/4] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
