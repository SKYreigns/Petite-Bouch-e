import { describe, expect, it } from 'vitest';
import {
  INITIAL_INQUIRY,
  formatInquiryDate,
  formatInquirySummary,
  getFirstErrorField,
  getStepForField,
  isShortNotice,
  todayISO,
  validateInquiry,
  validateStep,
  type CakeInquiry,
} from './cakeInquiry';

function validInquiry(overrides: Partial<CakeInquiry> = {}): CakeInquiry {
  return {
    ...INITIAL_INQUIRY,
    occasion: 'Birthday',
    servings: '10–14 guests',
    flavour: 'Chocolate',
    style: 'Pressed florals',
    eventDate: '2099-06-01',
    customerName: 'Ada Lovelace',
    customerEmail: 'ada@example.com',
    demoAcknowledged: true,
    ...overrides,
  };
}

describe('validateInquiry', () => {
  it('accepts a complete, valid enquiry', () => {
    expect(validateInquiry(validInquiry())).toEqual({});
  });

  it('requires the core selections and contact details', () => {
    const errors = validateInquiry({ ...INITIAL_INQUIRY });
    expect(errors.occasion).toBeDefined();
    expect(errors.servings).toBeDefined();
    expect(errors.flavour).toBeDefined();
    expect(errors.style).toBeDefined();
    expect(errors.eventDate).toBeDefined();
    expect(errors.customerName).toBeDefined();
    expect(errors.customerEmail).toBeDefined();
    expect(errors.demoAcknowledged).toBeDefined();
  });

  it('rejects a date in the past', () => {
    const errors = validateInquiry(validInquiry({ eventDate: '2000-01-01' }));
    expect(errors.eventDate).toBe('Please choose today or a future date.');
  });

  it('rejects an invalid calendar date', () => {
    const errors = validateInquiry(validInquiry({ eventDate: '2027-02-30' }));
    expect(errors.eventDate).toBe('Please enter a valid date.');
  });

  it('rejects an invalid email address', () => {
    const errors = validateInquiry(
      validInquiry({ customerEmail: 'not-an-email' })
    );
    expect(errors.customerEmail).toBe('Please enter a valid email address.');
  });

  it('allows an optional phone number to be blank', () => {
    expect(validateInquiry(validInquiry({ customerPhone: '' }))).toEqual({});
  });

  it('validates a supplied phone number', () => {
    const errors = validateInquiry(
      validInquiry({ customerPhone: 'abc' })
    );
    expect(errors.customerPhone).toBeDefined();
  });

  it('rejects values that are not in the option lists', () => {
    const errors = validateInquiry(
      validInquiry({ occasion: 'Invented occasion' })
    );
    expect(errors.occasion).toBe('Please choose an occasion from the list.');
  });
});

describe('validateStep', () => {
  it('only returns errors for the current step', () => {
    const errors = validateStep(0, { ...INITIAL_INQUIRY });
    expect(Object.keys(errors).sort()).toEqual(['occasion', 'servings']);
  });

  it('validates contact details on the third step', () => {
    const values = validInquiry({
      eventDate: '',
      customerName: '',
      customerEmail: '',
      demoAcknowledged: false,
    });
    const errors = validateStep(2, values);
    expect(Object.keys(errors).sort()).toEqual([
      'customerEmail',
      'customerName',
      'demoAcknowledged',
      'eventDate',
    ]);
  });
});

describe('error helpers', () => {
  it('returns the first field in the expected order', () => {
    expect(
      getFirstErrorField({ customerEmail: 'bad', occasion: 'missing' })
    ).toBe('occasion');
  });

  it('maps fields back to their wizard step', () => {
    expect(getStepForField('occasion')).toBe(0);
    expect(getStepForField('flavour')).toBe(1);
    expect(getStepForField('customerEmail')).toBe(2);
  });
});

describe('date helpers', () => {
  it('formats a valid ISO date without timezone drift', () => {
    expect(formatInquiryDate('2027-06-01')).toBe('June 1, 2027');
  });

  it('returns a fallback for an empty date', () => {
    expect(formatInquiryDate('')).toBe('Not specified');
  });

  it('detects a date less than two weeks away', () => {
    const today = todayISO();
    const [year, month, day] = today.split('-').map(Number);
    const soon = new Date(Date.UTC(year, month - 1, day + 3));
    const value = soon.toISOString().slice(0, 10);
    expect(isShortNotice(value)).toBe(true);
  });

  it('does not flag a distant date as short notice', () => {
    expect(isShortNotice('2099-06-01')).toBe(false);
  });
});

describe('formatInquirySummary', () => {
  it('returns a readable summary and falls back for optional fields', () => {
    const summary = formatInquirySummary(validInquiry());
    const map = Object.fromEntries(
      summary.map((item) => [item.label, item.value])
    );

    expect(map.Occasion).toBe('Birthday');
    expect(map.Guests).toBe('10–14 guests');
    expect(map['Celebration date']).toBe('June 1, 2099');
    expect(map.Phone).toBe('Not provided');
    expect(map['Dietary notes']).toBe('None provided');
  });
});
