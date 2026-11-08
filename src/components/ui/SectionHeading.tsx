import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2' | 'h3';
  size?: 'lg' | 'md';
  className?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as = 'h2',
  size = 'lg',
  className = '',
  id,
}: SectionHeadingProps) {
  const Heading = as;
  const centred = align === 'center';

  return (
    <div
      className={[
        centred ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl',
        className,
      ].join(' ')}
    >
      {eyebrow ? (
        <p className={['eyebrow', centred ? 'justify-center' : ''].join(' ')}>
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className={[
          size === 'lg' ? 'headline-lg' : 'headline-md',
          eyebrow ? 'mt-3' : '',
        ].join(' ')}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={[
            'body-md mt-3 text-on-surface-variant',
            centred ? 'mx-auto' : '',
          ].join(' ')}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
