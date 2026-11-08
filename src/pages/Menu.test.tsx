import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Menu } from './Menu';

function renderPage() {
  return render(
    <MemoryRouter>
      <Menu />
    </MemoryRouter>
  );
}

describe('Menu', () => {
  it('shows every product collection by default', () => {
    renderPage();

    expect(
      screen.getByRole('heading', { name: 'Cruffins & Viennoiserie' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Café & Drinks' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Bread & Savoury Bakes' })
    ).toBeInTheDocument();
  });

  it('filters to a single collection with an accessible pressed state', async () => {
    const user = userEvent.setup();
    renderPage();

    const filter = screen.getByRole('button', { name: 'Café & Drinks' });
    expect(filter).toHaveAttribute('aria-pressed', 'false');

    await user.click(filter);

    expect(filter).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.getByRole('heading', { name: 'Café & Drinks' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Cruffins & Viennoiserie' })
    ).not.toBeInTheDocument();
    expect(screen.getByText('1 collection')).toBeInTheDocument();
  });

  it('returns to all collections', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: 'Café & Drinks' }));
    await user.click(screen.getByRole('button', { name: 'All' }));

    expect(
      screen.getByRole('heading', { name: 'Cruffins & Viennoiserie' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Café & Drinks' })
    ).toBeInTheDocument();
  });
});
