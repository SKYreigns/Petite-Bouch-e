/**
 * Prefix a public asset path with Vite's configured base URL.
 *
 * GitHub Pages serves this project from a sub-path, so every image and
 * public file must go through this helper rather than a hard-coded "/".
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const normalisedBase = base.endsWith('/') ? base : `${base}/`;
  const normalisedPath = path.replace(/^\/+/, '');
  return `${normalisedBase}${normalisedPath}`;
}
