import { Croissant } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  responsiveSubtitle?: boolean;
}

export function Logo({
  variant = 'light',
  responsiveSubtitle = false,
}: LogoProps) {
  const isDark = variant === 'dark';

  return (
    <Link
      to="/"
      className="group inline-flex min-h-[44px] items-center gap-3"
      aria-label="Petite Bouchée — return to the home page"
    >
      <span
        className={[
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300',
          isDark
            ? 'border-secondary/50 bg-white/5 text-secondary-fixed group-hover:bg-surface group-hover:text-primary'
            : 'border-secondary/40 bg-primary-container/5 text-secondary group-hover:bg-primary group-hover:text-surface',
        ].join(' ')}
      >
        <Croissant className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="flex flex-col text-left">
        <span
          className={[
            'font-display text-xl leading-none tracking-tight',
            isDark ? 'text-surface' : 'text-primary',
          ].join(' ')}
        >
          Petite Bouchée
        </span>
        <span
          className={[
            'mt-1 text-[0.5625rem] font-semibold uppercase tracking-[0.22em]',
            isDark ? 'text-secondary-fixed/80' : 'text-secondary',
            responsiveSubtitle ? 'hidden sm:block' : '',
          ].join(' ')}
        >
          Patisserie &amp; Bakery · Toronto
        </span>
      </span>
    </Link>
  );
}
