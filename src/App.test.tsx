import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App routing', () => {
  it('renders the home page at the root route', () => {
    window.history.pushState({}, '', '/');
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: /A Little Something/i })
    ).toBeInTheDocument();
  });

  it('renders the not-found page for an unknown route', () => {
    window.history.pushState({}, '', '/this-page-does-not-exist');
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: /gone missing/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to Home/i })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
