import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';

function renderHeader() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Header />
    </MemoryRouter>
  );
}

describe('Header', () => {
  it('exposes the primary navigation', () => {
    renderHeader();

    const nav = screen.getByRole('navigation', { name: 'Primary' });
    expect(within(nav).getByRole('link', { name: 'Our Menu' })).toHaveAttribute(
      'href',
      '/menu'
    );
    expect(
      within(nav).getByRole('link', { name: 'Custom Cakes' })
    ).toHaveAttribute('href', '/custom-cakes');
  });

  it('opens and closes the mobile navigation dialog', async () => {
    const user = userEvent.setup();
    renderHeader();

    const trigger = screen.getByRole('button', {
      name: 'Open navigation menu',
    });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);

    const dialog = document.getElementById('mobile-navigation');
    expect(dialog).not.toBeNull();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(dialog).toHaveAttribute('open');
    expect(
      within(dialog as HTMLElement).getByRole('link', { name: 'Our Menu' })
    ).toBeInTheDocument();

    await user.click(
      within(dialog as HTMLElement).getByRole('button', {
        name: 'Close navigation menu',
      })
    );

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(dialog).not.toHaveAttribute('open');
  });

  it('marks the current page in the desktop navigation', () => {
    render(
      <MemoryRouter initialEntries={['/menu']}>
        <Header />
      </MemoryRouter>
    );

    const nav = screen.getByRole('navigation', { name: 'Primary' });
    const menuLink = within(nav).getByRole('link', { name: 'Our Menu' });
    expect(menuLink.className).toContain('text-primary');
    expect(menuLink.className).toContain('after:bg-secondary');
  });
});
