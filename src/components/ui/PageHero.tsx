import type { ReactNode } from 'react';
import { asset } from '../../lib/asset';

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  image: string;
  imageAlt: string;
  caption?: string;
  actions?: ReactNode;
  imageSide?: 'left' | 'right';
  imageAspect?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  caption,
  actions,
  imageSide = 'right',
  imageAspect = 'aspect-[4/3]',
  imageWidth = 1408,
  imageHeight = 768,
}: PageHeroProps) {
  const imageFirst = imageSide === 'left';

  return (
    <section className="border-b border-[#efe5d6] bg-surface-container-low/50">
      <div className="shell grid items-center gap-10 py-12 lg:grid-cols-12 lg:gap-14 lg:py-20">
        <div
          className={[
            'lg:col-span-6',
            imageFirst ? 'lg:order-2' : '',
          ].join(' ')}
        >
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="headline-lg mt-3">{title}</h1>
          <p className="body-lg mt-4 max-w-xl text-on-surface-variant">
            {description}
          </p>
          {actions ? (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {actions}
            </div>
          ) : null}
        </div>

        <div
          className={[
            'lg:col-span-6',
            imageFirst ? 'lg:order-1' : '',
          ].join(' ')}
        >
          <figure className="relative overflow-hidden rounded-3xl border border-[#efe5d6] bg-surface-container shadow-float">
            <img
              src={asset(image)}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              className={`${imageAspect} w-full object-cover`}
              loading="eager"
              decoding="async"
            />
            {caption ? (
              <figcaption className="absolute inset-x-4 bottom-4 rounded-xl border border-white/50 bg-surface/[0.94] p-3 text-xs text-on-surface-variant shadow-sm backdrop-blur-md">
                {caption}
              </figcaption>
            ) : null}
          </figure>
        </div>
      </div>
    </section>
  );
}
