export interface InquiryOption {
  value: string;
  label: string;
  hint?: string;
}

export interface CakeInquiry {
  occasion: string;
  servings: string;
  flavour: string;
  style: string;
  eventDate: string;
  budget: string;
  dietaryNotes: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  message: string;
  demoAcknowledged: boolean;
}

export type InquiryErrors = Partial<Record<keyof CakeInquiry, string>>;

export const OCCASION_OPTIONS: InquiryOption[] = [
  { value: 'Birthday', label: 'Birthday' },
  { value: 'Wedding', label: 'Wedding' },
  { value: 'Anniversary', label: 'Anniversary' },
  { value: 'Baby shower', label: 'Baby shower' },
  { value: 'Corporate', label: 'Corporate event' },
  { value: 'Other', label: 'Other celebration' },
];

export const SERVING_OPTIONS: InquiryOption[] = [
  {
    value: '6–8 guests',
    label: '6–8 guests',
    hint: 'An intimate cake for a small gathering.',
  },
  {
    value: '10–14 guests',
    label: '10–14 guests',
    hint: 'A single-tier cake for a family celebration.',
  },
  {
    value: '18–24 guests',
    label: '18–24 guests',
    hint: 'A two-tier cake for a larger milestone.',
  },
  {
    value: '30+ guests',
    label: '30+ guests',
    hint: 'A larger celebration or wedding cake.',
  },
  {
    value: 'Not sure yet',
    label: 'Not sure yet',
    hint: 'Our team can help you choose a size.',
  },
];

export const FLAVOUR_OPTIONS: InquiryOption[] = [
  {
    value: 'Chocolate',
    label: 'Chocolate',
    hint: 'Dark chocolate, cocoa and a rich finish.',
  },
  {
    value: 'Vanilla & berry',
    label: 'Vanilla & berry',
    hint: 'Vanilla sponge with a bright berry filling.',
  },
  {
    value: 'Pistachio & strawberry',
    label: 'Pistachio & strawberry',
    hint: 'Nutty pistachio with fresh strawberry.',
  },
  {
    value: 'Caramel & pecan',
    label: 'Caramel & pecan',
    hint: 'Buttery caramel with toasted pecan.',
  },
  {
    value: "Baker's choice",
    label: "Baker's choice",
    hint: 'Tell us what you love and we will suggest a pairing.',
  },
];

export const STYLE_OPTIONS: InquiryOption[] = [
  {
    value: 'Pressed florals',
    label: 'Pressed florals',
    hint: 'Delicate botanical details and a soft palette.',
  },
  {
    value: 'Modern textured',
    label: 'Modern textured',
    hint: 'Sculptural buttercream with a clean finish.',
  },
  {
    value: 'Chocolate drip',
    label: 'Chocolate drip',
    hint: 'A glossy drip with fresh berries or chocolate.',
  },
  {
    value: 'Classic piping',
    label: 'Classic piping',
    hint: 'Traditional borders, scrolls and vintage details.',
  },
  {
    value: 'Not sure yet',
    label: 'Not sure yet',
    hint: 'Share inspiration and our team will guide you.',
  },
];

export const INQUIRY_STEPS = [
  { id: 1, title: 'Occasion & size', short: 'Occasion' },
  { id: 2, title: 'Flavour & style', short: 'Design' },
  { id: 3, title: 'Date & details', short: 'Details' },
  { id: 4, title: 'Review', short: 'Review' },
] as const;

export const INITIAL_INQUIRY: CakeInquiry = {
  occasion: '',
  servings: '',
  flavour: '',
  style: '',
  eventDate: '',
  budget: '',
  dietaryNotes: '',
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  message: '',
  demoAcknowledged: false,
};

export const FIELD_IDS: Record<keyof CakeInquiry, string> = {
  occasion: 'occasion',
  servings: 'servings',
  flavour: 'flavour',
  style: 'style',
  eventDate: 'event-date',
  budget: 'budget',
  dietaryNotes: 'dietary-notes',
  customerName: 'customer-name',
  customerEmail: 'customer-email',
  customerPhone: 'customer-phone',
  message: 'message',
  demoAcknowledged: 'demo-acknowledged',
};

const STEP_FIELDS: Record<number, Array<keyof CakeInquiry>> = {
  0: ['occasion', 'servings'],
  1: ['flavour', 'style'],
  2: [
    'eventDate',
    'customerName',
    'customerEmail',
    'customerPhone',
    'demoAcknowledged',
  ],
  3: [],
};

const FIELD_ORDER: Array<keyof CakeInquiry> = [
  'occasion',
  'servings',
  'flavour',
  'style',
  'eventDate',
  'customerName',
  'customerEmail',
  'customerPhone',
  'demoAcknowledged',
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d][\d\s().-]{6,}$/;

function isOption(value: string, options: InquiryOption[]): boolean {
  return options.some((option) => option.value === value);
}

export function todayISO(): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Toronto',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());

  const year = parts.find((part) => part.type === 'year')?.value ?? '1970';
  const month = parts.find((part) => part.type === 'month')?.value ?? '01';
  const day = parts.find((part) => part.type === 'day')?.value ?? '01';
  return `${year}-${month}-${day}`;
}

function toUtcDay(value: string): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }
  return date.getTime();
}

export function formatInquiryDate(value: string): string {
  if (!value) return 'Not specified';
  const day = toUtcDay(value);
  if (day === null) return value;
  return new Intl.DateTimeFormat('en-CA', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(day));
}

export function isShortNotice(value: string, days = 14): boolean {
  const selected = toUtcDay(value);
  const today = toUtcDay(todayISO());
  if (selected === null || today === null) return false;
  const difference = selected - today;
  return difference >= 0 && difference < days * 24 * 60 * 60 * 1000;
}

export function validateInquiry(values: CakeInquiry): InquiryErrors {
  const errors: InquiryErrors = {};

  if (!values.occasion) {
    errors.occasion = 'Please choose an occasion.';
  } else if (!isOption(values.occasion, OCCASION_OPTIONS)) {
    errors.occasion = 'Please choose an occasion from the list.';
  }

  if (!values.servings) {
    errors.servings = 'Please choose a guest count.';
  } else if (!isOption(values.servings, SERVING_OPTIONS)) {
    errors.servings = 'Please choose a guest count from the list.';
  }

  if (!values.flavour) {
    errors.flavour = 'Please choose a flavour direction.';
  } else if (!isOption(values.flavour, FLAVOUR_OPTIONS)) {
    errors.flavour = 'Please choose a flavour direction from the list.';
  }

  if (!values.style) {
    errors.style = 'Please choose a style direction.';
  } else if (!isOption(values.style, STYLE_OPTIONS)) {
    errors.style = 'Please choose a style direction from the list.';
  }

  if (!values.eventDate) {
    errors.eventDate = 'Please choose your celebration date.';
  } else if (toUtcDay(values.eventDate) === null) {
    errors.eventDate = 'Please enter a valid date.';
  } else if (values.eventDate < todayISO()) {
    errors.eventDate = 'Please choose today or a future date.';
  }

  const name = values.customerName.trim();
  if (!name) {
    errors.customerName = 'Please enter your name.';
  } else if (name.length < 2) {
    errors.customerName = 'Please enter at least 2 characters.';
  }

  const email = values.customerEmail.trim();
  if (!email) {
    errors.customerEmail = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.customerEmail = 'Please enter a valid email address.';
  }

  const phone = values.customerPhone.trim();
  if (phone && !PHONE_PATTERN.test(phone)) {
    errors.customerPhone = 'Please enter a valid phone number, or leave this blank.';
  }

  if (!values.demoAcknowledged) {
    errors.demoAcknowledged =
      'Please confirm that you understand this is a demonstration form.';
  }

  return errors;
}

export function validateStep(
  step: number,
  values: CakeInquiry
): InquiryErrors {
  const allErrors = validateInquiry(values);
  const fields = STEP_FIELDS[step] ?? [];
  const stepErrors: InquiryErrors = {};

  for (const field of fields) {
    if (allErrors[field]) {
      stepErrors[field] = allErrors[field];
    }
  }

  return stepErrors;
}

export function getFirstErrorField(
  errors: InquiryErrors
): keyof CakeInquiry | undefined {
  return FIELD_ORDER.find((field) => Boolean(errors[field]));
}

export function getStepForField(field: keyof CakeInquiry): number {
  for (const [step, fields] of Object.entries(STEP_FIELDS)) {
    if (fields.includes(field)) {
      return Number(step);
    }
  }
  return 0;
}

export interface SummaryItem {
  label: string;
  value: string;
}

export function formatInquirySummary(values: CakeInquiry): SummaryItem[] {
  return [
    { label: 'Occasion', value: values.occasion || 'Not specified' },
    { label: 'Guests', value: values.servings || 'Not specified' },
    { label: 'Flavour', value: values.flavour || 'Not specified' },
    { label: 'Style', value: values.style || 'Not specified' },
    { label: 'Celebration date', value: formatInquiryDate(values.eventDate) },
    { label: 'Budget guidance', value: values.budget.trim() || 'Not specified' },
    {
      label: 'Dietary notes',
      value: values.dietaryNotes.trim() || 'None provided',
    },
    { label: 'Name', value: values.customerName.trim() || 'Not specified' },
    { label: 'Email', value: values.customerEmail.trim() || 'Not specified' },
    {
      label: 'Phone',
      value: values.customerPhone.trim() || 'Not provided',
    },
    {
      label: 'Additional notes',
      value: values.message.trim() || 'None provided',
    },
  ];
}

export function createDemoReference(): string {
  const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `PB-DEMO-${suffix}`;
}
