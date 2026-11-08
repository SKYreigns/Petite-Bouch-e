import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CustomCakes } from './CustomCakes';

function renderPage() {
  return render(
    <MemoryRouter>
      <CustomCakes />
    </MemoryRouter>
  );
}

async function completeSteps() {
  const user = userEvent.setup();

  await user.click(screen.getByRole('radio', { name: /^Birthday/ }));
  await user.click(screen.getByRole('radio', { name: /10–14 guests/ }));
  await user.click(screen.getByRole('button', { name: /Continue/i }));

  await user.click(
    screen.getByRole('radio', { name: /^Chocolate Dark chocolate/ })
  );
  await user.click(screen.getByRole('radio', { name: /^Pressed florals/ }));
  await user.click(screen.getByRole('button', { name: /Continue/i }));

  fireEvent.change(screen.getByLabelText(/Celebration date/), {
    target: { value: '2099-06-01' },
  });
  await user.type(screen.getByLabelText(/Your name/), 'Ada Lovelace');
  await user.type(screen.getByLabelText(/^Email/), 'ada@example.com');
  await user.click(
    screen.getByLabelText(/I understand this enquiry form is a demonstration/)
  );
  await user.click(screen.getByRole('button', { name: /Continue/i }));

  return user;
}

describe('CustomCakes', () => {
  it('shows validation errors and keeps the user on the first step', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: /Continue/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Please check the highlighted fields'
    );
    expect(
      screen.getByText('Please choose an occasion.', { selector: 'p' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Please choose a guest count.', { selector: 'p' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'What are we celebrating?' })
    ).toBeInTheDocument();
  });

  it('moves between steps and preserves earlier answers', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('radio', { name: /^Birthday/ }));
    await user.click(screen.getByRole('radio', { name: /10–14 guests/ }));
    await user.click(screen.getByRole('button', { name: /Continue/i }));

    expect(
      screen.getByRole('heading', { name: 'What should the cake feel like?' })
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Back/i }));

    expect(
      screen.getByRole('radio', { name: /^Birthday/ })
    ).toBeChecked();
    expect(
      screen.getByRole('radio', { name: /10–14 guests/ })
    ).toBeChecked();
  });

  it('saves the draft in sessionStorage for the current tab', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('radio', { name: /^Birthday/ }));

    await waitFor(() => {
      const raw = window.sessionStorage.getItem('pb:cake-inquiry-draft');
      expect(raw).toContain('Birthday');
    });
  });

  it('completes the wizard and clearly reports that nothing was sent', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockRejectedValue(new Error('Network should not be used'));

    renderPage();
    const user = await completeSteps();

    expect(
      screen.getByRole('heading', { name: 'One last look.' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('June 1, 2099', { selector: 'dd' })
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: /Submit Demonstration/i })
    );

    expect(
      await screen.findByText(/Your enquiry was not sent/i)
    ).toBeInTheDocument();
    const dialog = document.querySelector('dialog');
    expect(dialog).not.toBeNull();
    await waitFor(() => {
      expect(dialog).toHaveTextContent(/PB-DEMO-/);
    });
    expect(dialog).toHaveTextContent(
      /Nothing was transmitted to Petite Bouchée/i
    );
    expect(fetchSpy).not.toHaveBeenCalled();

    fetchSpy.mockRestore();
  });

  it('shows a short-notice warning for a date within two weeks', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('radio', { name: /^Birthday/ }));
    await user.click(screen.getByRole('radio', { name: /10–14 guests/ }));
    await user.click(screen.getByRole('button', { name: /Continue/i }));
    await user.click(
      screen.getByRole('radio', { name: /^Chocolate Dark chocolate/ })
    );
    await user.click(screen.getByRole('radio', { name: /^Pressed florals/ }));
    await user.click(screen.getByRole('button', { name: /Continue/i }));

    const now = new Date();
    now.setDate(now.getDate() + 3);
    const value = now.toISOString().slice(0, 10);

    fireEvent.change(screen.getByLabelText(/Celebration date/), {
      target: { value },
    });

    expect(
      screen.getByText(/less than two weeks away/i)
    ).toBeInTheDocument();
  });
});
