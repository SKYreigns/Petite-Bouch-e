import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CakeSlice,
  Check,
  CheckCircle2,
  Info,
  Phone,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { business } from '../data/site';
import { getInquiryAdapter } from '../config/appConfig';
import {
  FIELD_IDS,
  FLAVOUR_OPTIONS,
  INITIAL_INQUIRY,
  INQUIRY_STEPS,
  OCCASION_OPTIONS,
  SERVING_OPTIONS,
  STYLE_OPTIONS,
  formatInquiryDate,
  formatInquirySummary,
  getFirstErrorField,
  getStepForField,
  isShortNotice,
  todayISO,
  validateInquiry,
  validateStep,
  type CakeInquiry,
  type InquiryErrors,
  type InquiryOption,
} from '../lib/cakeInquiry';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Dialog } from '../components/ui/Dialog';
import { InstagramIcon } from '../components/ui/InstagramIcon';
import { usePageMeta } from '../lib/usePageMeta';

const DRAFT_KEY = 'pb:cake-inquiry-draft';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

function loadDraft(): CakeInquiry {
  if (typeof window === 'undefined') return { ...INITIAL_INQUIRY };

  try {
    const raw = window.sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return { ...INITIAL_INQUIRY };
    const parsed = JSON.parse(raw) as Partial<CakeInquiry>;
    const text = (key: keyof CakeInquiry): string =>
      typeof parsed[key] === 'string' ? (parsed[key] as string) : '';

    return {
      occasion: text('occasion'),
      servings: text('servings'),
      flavour: text('flavour'),
      style: text('style'),
      eventDate: text('eventDate'),
      budget: text('budget'),
      dietaryNotes: text('dietaryNotes'),
      customerName: text('customerName'),
      customerEmail: text('customerEmail'),
      customerPhone: text('customerPhone'),
      message: text('message'),
      demoAcknowledged: parsed.demoAcknowledged === true,
    };
  } catch {
    return { ...INITIAL_INQUIRY };
  }
}

function saveDraft(values: CakeInquiry): void {
  try {
    window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(values));
  } catch {
    // Storage can be unavailable in private browsing; the form still works.
  }
}

function clearDraft(): void {
  try {
    window.sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    // Ignore storage failures.
  }
}

interface FieldErrorProps {
  id: string;
  message?: string;
}

function FieldError({ id, message }: FieldErrorProps) {
  if (!message) return null;
  return (
    <p id={id} className="field-error">
      {message}
    </p>
  );
}

interface OptionGroupProps {
  name: keyof CakeInquiry;
  legend: string;
  hint?: string;
  options: InquiryOption[];
  value: string;
  error?: string;
  onChange: (name: keyof CakeInquiry, value: string) => void;
}

function OptionGroup({
  name,
  legend,
  hint,
  options,
  value,
  error,
  onChange,
}: OptionGroupProps) {
  const fieldId = FIELD_IDS[name];
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;

  return (
    <fieldset
      id={fieldId}
      tabIndex={-1}
      aria-describedby={[hint ? hintId : '', error ? errorId : '']
        .filter(Boolean)
        .join(' ')}
      className="rounded-sm focus-visible:outline-none"
    >
      <legend className="field-label">
        {legend} <span className="text-bordeaux">*</span>
      </legend>
      {hint ? (
        <p id={hintId} className="field-hint mt-0">
          {hint}
        </p>
      ) : null}
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {options.map((option, index) => {
          const selected = value === option.value;
          return (
            <label
              key={option.value}
              className={[
                'option-card',
                selected ? 'option-card--selected' : '',
              ].join(' ')}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                id={index === 0 ? fieldId : `${fieldId}-${index}`}
                checked={selected}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  onChange(name, event.target.value)
                }
                aria-invalid={Boolean(error)}
                aria-describedby={
                  [hint ? hintId : '', error ? errorId : '']
                    .filter(Boolean)
                    .join(' ') || undefined
                }
                className="sr-only"
              />
              <span className="min-w-0">
                <span className="block font-medium">{option.label}</span>
                {option.hint ? (
                  <span className="mt-0.5 block text-xs leading-snug text-on-surface-variant">
                    {option.hint}
                  </span>
                ) : null}
              </span>
              <span
                aria-hidden="true"
                className={[
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors',
                  selected
                    ? 'border-secondary bg-secondary text-surface'
                    : 'border-outline-variant bg-surface',
                ].join(' ')}
              >
                {selected ? <Check className="h-3 w-3" /> : null}
              </span>
            </label>
          );
        })}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}

interface StepHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}

function StepHeading({
  id,
  eyebrow,
  title,
  description,
  children,
}: StepHeadingProps) {
  return (
    <div>
      <p className="label-caps text-secondary">{eyebrow}</p>
      <h2 id={id} tabIndex={-1} className="headline-md mt-1.5 outline-none">
        {title}
      </h2>
      <p className="body-md mt-2 text-on-surface-variant">{description}</p>
      {children}
    </div>
  );
}

export function CustomCakes() {
  usePageMeta(
    'Custom Celebration Cakes — Petite Bouchée Patisserie, Toronto',
    'Plan a bespoke celebration cake with Petite Bouchée in Toronto. Share your occasion, flavour and style direction, then contact the bakery to confirm details.'
  );

  const [values, setValues] = useState<CakeInquiry>(loadDraft);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [submission, setSubmission] = useState<SubmissionState>('idle');
  const [reference, setReference] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const hasMounted = useRef(false);
  const currentStep = INQUIRY_STEPS[step];
  const headingId = `step-${currentStep.id}-heading`;

  useEffect(() => {
    saveDraft(values);
  }, [values]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    document.getElementById(headingId)?.focus();
  }, [headingId]);

  function setField(name: keyof CakeInquiry, value: string | boolean): void {
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => {
      if (!previous[name]) return previous;
      const next = { ...previous };
      delete next[name];
      return next;
    });
  }

  function focusField(field: keyof CakeInquiry | undefined): void {
    if (!field) return;
    window.setTimeout(() => {
      document.getElementById(FIELD_IDS[field])?.focus();
    }, 30);
  }

  function handleNext(): void {
    const stepErrors = validateStep(step, values);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      focusField(getFirstErrorField(stepErrors));
      return;
    }
    setErrors({});
    setStep((previous) => Math.min(previous + 1, INQUIRY_STEPS.length - 1));
  }

  function handleBack(): void {
    setErrors({});
    setSubmission('idle');
    setStep((previous) => Math.max(previous - 1, 0));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (step < INQUIRY_STEPS.length - 1) {
      handleNext();
      return;
    }

    const allErrors = validateInquiry(values);
    if (Object.keys(allErrors).length > 0) {
      const firstField = getFirstErrorField(allErrors);
      setErrors(allErrors);
      if (firstField) {
        const errorStep = getStepForField(firstField);
        setStep(errorStep);
        focusField(firstField);
      }
      return;
    }

    setSubmission('submitting');
    setSubmitError('');

    try {
      const adapter = getInquiryAdapter();
      const response = await adapter.submitInquiry(values);

      if (!response.success) {
        setSubmission('error');
        setSubmitError(
          response.error?.message ??
            'Something went wrong. Please call the bakery instead.'
        );
        return;
      }

      setReference(response.transactionId ?? '');
      setSubmission('success');
      setDialogOpen(true);
    } catch {
      setSubmission('error');
      setSubmitError(
        'Something went wrong. Please call the bakery instead.'
      );
    }
  }

  function resetEnquiry(): void {
    clearDraft();
    setValues({ ...INITIAL_INQUIRY });
    setErrors({});
    setStep(0);
    setSubmission('idle');
    setSubmitError('');
    setReference('');
    setDialogOpen(false);
  }

  const summary = formatInquirySummary(values);
  const summaryGroups: Array<{
    title: string;
    labels: string[];
    step: number;
  }> = [
    {
      title: 'The cake',
      labels: ['Occasion', 'Guests', 'Flavour', 'Style'],
      step: 0,
    },
    {
      title: 'Celebration details',
      labels: ['Celebration date', 'Budget guidance', 'Dietary notes', 'Additional notes'],
      step: 2,
    },
    {
      title: 'Your details',
      labels: ['Name', 'Email', 'Phone'],
      step: 2,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="The custom cake atelier"
        title={
          <>
            A Cake Made for
            <br />
            <span className="italic font-normal text-secondary">
              Your Moment.
            </span>
          </>
        }
        description="Tell us about the celebration, the flavours you love and the feeling you want the cake to have. Our team will guide the design from first idea to final finish."
        image="images/cakes/pressed-florals.jpg"
        imageAlt="A celebration cake finished with pressed edible flowers"
        caption="Pressed florals, soft texture and a considered finish."
        actions={
          <>
            <a href={`tel:${business.phone.href}`} className="btn btn-primary">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call the Bakery
            </a>
            <a
              href={business.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <InstagramIcon className="h-4 w-4" />
              Message on Instagram
            </a>
          </>
        }
      />

      <section className="border-b border-[#efe5d6] bg-surface py-12 lg:py-16">
        <div className="shell">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Share your brief',
                copy: 'Tell us the occasion, guest count and the flavours and styles you are drawn to.',
              },
              {
                title: 'Design together',
                copy: 'Our team reviews the details with you and confirms the design, size and timing directly.',
              },
              {
                title: 'Confirm with the bakery',
                copy: 'Availability, pricing and collection details are always confirmed by the bakery, never by this form.',
              },
            ].map((item, index) => (
              <div key={item.title} className="border-t border-champagne/40 pt-4">
                <p className="label-caps text-secondary">
                  Step {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="title-lg mt-1.5">{item.title}</h2>
                <p className="body-sm mt-1.5 text-on-surface-variant">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="bg-surface-container-low/60 py-12 lg:py-20"
        aria-labelledby="enquiry-heading"
      >
        <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-12">
          <aside className="lg:col-span-4">
            <SectionHeading
              as="h2"
              size="md"
              id="enquiry-heading"
              eyebrow="Cake enquiry"
              title="Let’s begin with your celebration."
              description="Four short steps. You can move back at any point, and your answers stay in this browser tab."
            />

            <ol className="mt-7 space-y-1.5">
              {INQUIRY_STEPS.map((item, index) => {
                const active = index === step;
                const complete = index < step;
                return (
                  <li
                    key={item.id}
                    aria-current={active ? 'step' : undefined}
                    className={[
                      'flex items-center gap-3 rounded-sm border px-3 py-2.5 transition-colors',
                      active
                        ? 'border-secondary bg-secondary-container/25'
                        : 'border-transparent',
                    ].join(' ')}
                  >
                    <span
                      aria-hidden="true"
                      className={[
                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[0.6875rem] font-semibold',
                        complete
                          ? 'border-secondary bg-secondary text-surface'
                          : active
                            ? 'border-secondary bg-surface text-secondary'
                            : 'border-outline-variant bg-surface text-on-surface-variant',
                      ].join(' ')}
                    >
                      {complete ? <Check className="h-3.5 w-3.5" /> : item.id}
                    </span>
                    <span
                      className={[
                        'text-sm',
                        active
                          ? 'font-semibold text-primary'
                          : 'text-on-surface-variant',
                      ].join(' ')}
                    >
                      {item.title}
                      <span className="sr-only">
                        {active
                          ? ' — current step'
                          : complete
                            ? ' — completed'
                            : ''}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ol>

            <div className="card mt-7 p-5">
              <div className="flex items-start gap-3">
                <Info
                  className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="label-caps text-secondary">
                    Prefer to speak with us?
                  </h3>
                  <p className="body-sm mt-2 text-on-surface-variant">
                    Call the bakery for availability and a direct conversation
                    about your cake.
                  </p>
                  <a
                    href={`tel:${business.phone.href}`}
                    className="mt-2 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-primary"
                  >
                    <Phone
                      className="h-4 w-4 text-secondary"
                      aria-hidden="true"
                    />
                    {business.phone.display}
                  </a>
                  <a
                    href={business.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[44px] items-center gap-2 text-sm font-semibold text-primary"
                  >
                    <InstagramIcon className="h-4 w-4 text-secondary" />
                    {business.instagram.handle}
                  </a>
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <div className="card overflow-hidden">
              <div className="border-b border-[#efe5d6] bg-surface-container-lowest px-5 py-4 sm:px-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="label-caps text-secondary">
                    Step {currentStep.id} of {INQUIRY_STEPS.length}
                  </p>
                  <div
                    className="flex gap-1.5"
                    role="progressbar"
                    aria-valuemin={1}
                    aria-valuemax={INQUIRY_STEPS.length}
                    aria-valuenow={currentStep.id}
                    aria-label="Cake enquiry progress"
                  >
                    {INQUIRY_STEPS.map((item) => (
                      <span
                        key={item.id}
                        aria-hidden="true"
                        className={[
                          'h-1.5 w-7 rounded-full transition-colors',
                          item.id <= currentStep.id
                            ? 'bg-secondary'
                            : 'bg-surface-container-high',
                        ].join(' ')}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <form
                noValidate
                onSubmit={handleSubmit}
                className="px-5 py-6 sm:px-8 sm:py-8"
              >
                <p className="sr-only" aria-live="polite">
                  Step {currentStep.id} of {INQUIRY_STEPS.length}:{' '}
                  {currentStep.title}
                </p>

                {Object.keys(errors).length > 0 ? (
                  <div
                    role="alert"
                    className="mb-6 rounded-sm border border-bordeaux/30 bg-error-container/50 px-4 py-3"
                  >
                    <p className="text-sm font-semibold text-on-error-container">
                      Please check the highlighted fields.
                    </p>
                    <ul className="mt-1.5 list-inside list-disc space-y-0.5 text-xs text-on-error-container">
                      {Object.entries(errors).map(([field, message]) => (
                        <li key={field}>
                          <a
                            href={`#${FIELD_IDS[field as keyof CakeInquiry]}`}
                            className="underline underline-offset-2"
                          >
                            {message}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {step === 0 ? (
                  <div className="space-y-7">
                    <StepHeading
                      id={headingId}
                      eyebrow="Occasion & size"
                      title="What are we celebrating?"
                      description="A few details help us understand the scale of your celebration. Exact sizing will be confirmed by the bakery."
                    />
                    <OptionGroup
                      name="occasion"
                      legend="Occasion"
                      options={OCCASION_OPTIONS}
                      value={values.occasion}
                      error={errors.occasion}
                      onChange={setField}
                    />
                    <OptionGroup
                      name="servings"
                      legend="Approximate guest count"
                      hint="A guide only — our team will help you settle on the right size."
                      options={SERVING_OPTIONS}
                      value={values.servings}
                      error={errors.servings}
                      onChange={setField}
                    />
                  </div>
                ) : null}

                {step === 1 ? (
                  <div className="space-y-7">
                    <StepHeading
                      id={headingId}
                      eyebrow="Flavour & style"
                      title="What should the cake feel like?"
                      description="Choose a starting direction. These are conversation starters, not a fixed menu."
                    />
                    <OptionGroup
                      name="flavour"
                      legend="Flavour direction"
                      options={FLAVOUR_OPTIONS}
                      value={values.flavour}
                      error={errors.flavour}
                      onChange={setField}
                    />
                    <OptionGroup
                      name="style"
                      legend="Design direction"
                      options={STYLE_OPTIONS}
                      value={values.style}
                      error={errors.style}
                      onChange={setField}
                    />
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="space-y-7">
                    <StepHeading
                      id={headingId}
                      eyebrow="Date & details"
                      title="When is the celebration?"
                      description="Share the date and a little more context. If your date is close, please call the bakery directly."
                    />

                    <div>
                      <label htmlFor={FIELD_IDS.eventDate} className="field-label">
                        Celebration date <span className="text-bordeaux">*</span>
                      </label>
                      <input
                        id={FIELD_IDS.eventDate}
                        name="eventDate"
                        type="date"
                        min={todayISO()}
                        value={values.eventDate}
                        onChange={(event) => setField('eventDate', event.target.value)}
                        aria-invalid={Boolean(errors.eventDate)}
                        aria-describedby={
                          errors.eventDate
                            ? `${FIELD_IDS.eventDate}-error`
                            : undefined
                        }
                        className="field max-w-xs"
                      />
                      <FieldError
                        id={`${FIELD_IDS.eventDate}-error`}
                        message={errors.eventDate}
                      />
                      {isShortNotice(values.eventDate) ? (
                        <p className="mt-2 flex items-start gap-2 rounded-sm bg-secondary-container/30 px-3 py-2 text-xs text-on-secondary-container">
                          <Info
                            className="mt-0.5 h-3.5 w-3.5 shrink-0"
                            aria-hidden="true"
                          />
                          That date is less than two weeks away. Please call the
                          bakery to check availability before relying on this
                          form.
                        </p>
                      ) : null}
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor={FIELD_IDS.customerName}
                          className="field-label"
                        >
                          Your name <span className="text-bordeaux">*</span>
                        </label>
                        <input
                          id={FIELD_IDS.customerName}
                          name="customerName"
                          type="text"
                          autoComplete="name"
                          value={values.customerName}
                          onChange={(event) =>
                            setField('customerName', event.target.value)
                          }
                          aria-invalid={Boolean(errors.customerName)}
                          aria-describedby={
                            errors.customerName
                              ? `${FIELD_IDS.customerName}-error`
                              : undefined
                          }
                          className="field"
                        />
                        <FieldError
                          id={`${FIELD_IDS.customerName}-error`}
                          message={errors.customerName}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={FIELD_IDS.customerEmail}
                          className="field-label"
                        >
                          Email <span className="text-bordeaux">*</span>
                        </label>
                        <input
                          id={FIELD_IDS.customerEmail}
                          name="customerEmail"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          value={values.customerEmail}
                          onChange={(event) =>
                            setField('customerEmail', event.target.value)
                          }
                          aria-invalid={Boolean(errors.customerEmail)}
                          aria-describedby={
                            errors.customerEmail
                              ? `${FIELD_IDS.customerEmail}-error`
                              : undefined
                          }
                          className="field"
                        />
                        <FieldError
                          id={`${FIELD_IDS.customerEmail}-error`}
                          message={errors.customerEmail}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={FIELD_IDS.customerPhone}
                          className="field-label"
                        >
                          Phone{' '}
                          <span className="normal-case tracking-normal text-on-surface-variant">
                            (optional)
                          </span>
                        </label>
                        <input
                          id={FIELD_IDS.customerPhone}
                          name="customerPhone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          value={values.customerPhone}
                          onChange={(event) =>
                            setField('customerPhone', event.target.value)
                          }
                          aria-invalid={Boolean(errors.customerPhone)}
                          aria-describedby={
                            errors.customerPhone
                              ? `${FIELD_IDS.customerPhone}-error`
                              : undefined
                          }
                          className="field"
                        />
                        <FieldError
                          id={`${FIELD_IDS.customerPhone}-error`}
                          message={errors.customerPhone}
                        />
                      </div>

                      <div>
                        <label htmlFor={FIELD_IDS.budget} className="field-label">
                          Budget guidance{' '}
                          <span className="normal-case tracking-normal text-on-surface-variant">
                            (optional)
                          </span>
                        </label>
                        <input
                          id={FIELD_IDS.budget}
                          name="budget"
                          type="text"
                          value={values.budget}
                          onChange={(event) =>
                            setField('budget', event.target.value)
                          }
                          placeholder="A range you have in mind"
                          className="field"
                        />
                        <p className="field-hint">
                          Pricing is confirmed by the bakery after your
                          consultation.
                        </p>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor={FIELD_IDS.dietaryNotes}
                        className="field-label"
                      >
                        Dietary notes{' '}
                        <span className="normal-case tracking-normal text-on-surface-variant">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        id={FIELD_IDS.dietaryNotes}
                        name="dietaryNotes"
                        rows={2}
                        maxLength={500}
                        value={values.dietaryNotes}
                        onChange={(event) =>
                          setField('dietaryNotes', event.target.value)
                        }
                        placeholder="Allergies, dietary requirements or ingredients to avoid"
                        className="field resize-y"
                      />
                      <p className="field-hint">
                        Please note that allergen and dietary requests must be
                        confirmed directly with the bakery.
                      </p>
                    </div>

                    <div>
                      <label htmlFor={FIELD_IDS.message} className="field-label">
                        Anything else?{' '}
                        <span className="normal-case tracking-normal text-on-surface-variant">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        id={FIELD_IDS.message}
                        name="message"
                        rows={3}
                        maxLength={1000}
                        value={values.message}
                        onChange={(event) =>
                          setField('message', event.target.value)
                        }
                        placeholder="Inspiration, colours, a message for the cake, or anything we should know"
                        className="field resize-y"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={FIELD_IDS.demoAcknowledged}
                        className="flex cursor-pointer items-start gap-3 rounded-sm border border-[#e5dccd] bg-surface-container-low px-4 py-3"
                      >
                        <input
                          id={FIELD_IDS.demoAcknowledged}
                          name="demoAcknowledged"
                          type="checkbox"
                          checked={values.demoAcknowledged}
                          onChange={(event) =>
                            setField('demoAcknowledged', event.target.checked)
                          }
                          aria-invalid={Boolean(errors.demoAcknowledged)}
                          aria-describedby={
                            errors.demoAcknowledged
                              ? `${FIELD_IDS.demoAcknowledged}-error`
                              : undefined
                          }
                          className="mt-0.5 h-5 w-5 shrink-0 rounded-sm border-outline-variant accent-[#735A30]"
                        />
                        <span className="text-sm text-on-surface-variant">
                          I understand this enquiry form is a demonstration. It
                          does not send my details to the bakery.
                        </span>
                      </label>
                      <FieldError
                        id={`${FIELD_IDS.demoAcknowledged}-error`}
                        message={errors.demoAcknowledged}
                      />
                    </div>
                  </div>
                ) : null}

                {step === 3 ? (
                  <div className="space-y-6">
                    <StepHeading
                      id={headingId}
                      eyebrow="Review"
                      title="One last look."
                      description="Check your answers before submitting the demonstration form. You can still go back and edit anything."
                    />

                    <div className="rounded-sm border border-champagne/40 bg-secondary-container/15 px-4 py-3">
                      <p className="flex items-start gap-2 text-sm text-on-surface-variant">
                        <Info
                          className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
                          aria-hidden="true"
                        />
                        <span>
                          This form is a demonstration and does not send your
                          details. To confirm a cake, call{' '}
                          <a
                            href={`tel:${business.phone.href}`}
                            className="font-semibold text-primary underline decoration-champagne underline-offset-4"
                          >
                            {business.phone.display}
                          </a>{' '}
                          or message us on Instagram.
                        </span>
                      </p>
                    </div>

                    <div className="space-y-5">
                      {summaryGroups.map((group) => (
                        <div
                          key={group.title}
                          className="rounded-sm border border-[#efe5d6] bg-surface-container-lowest p-4"
                        >
                          <div className="flex items-center justify-between gap-3 border-b border-[#efe5d6] pb-2.5">
                            <h3 className="label-caps text-secondary">
                              {group.title}
                            </h3>
                            <button
                              type="button"
                              onClick={() => {
                                setErrors({});
                                setStep(group.step);
                              }}
                              className="min-h-[44px] px-2 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-secondary underline decoration-champagne underline-offset-4 hover:text-primary"
                            >
                              Edit
                              <span className="sr-only">
                                {' '}
                                {group.title.toLowerCase()}
                              </span>
                            </button>
                          </div>
                          <dl className="mt-2 divide-y divide-[#f2eade]">
                            {summary
                              .filter((item) => group.labels.includes(item.label))
                              .map((item) => (
                                <div
                                  key={item.label}
                                  className="grid gap-1 py-2 sm:grid-cols-[10rem_1fr] sm:gap-4"
                                >
                                  <dt className="text-xs font-medium uppercase tracking-[0.08em] text-outline">
                                    {item.label}
                                  </dt>
                                  <dd className="whitespace-pre-line break-words text-sm text-primary">
                                    {item.value}
                                  </dd>
                                </div>
                              ))}
                          </dl>
                        </div>
                      ))}
                    </div>

                    <p className="body-sm text-on-surface-variant">
                      Celebration date:{' '}
                      <span className="font-medium text-primary">
                        {formatInquiryDate(values.eventDate)}
                      </span>
                      . The bakery will confirm availability and final details
                      directly.
                    </p>

                    {submission === 'error' ? (
                      <div
                        role="alert"
                        className="rounded-sm border border-bordeaux/30 bg-error-container/50 px-4 py-3 text-sm text-on-error-container"
                      >
                        <p className="font-semibold">{submitError}</p>
                        <p className="mt-1">
                          You can reach the bakery on{' '}
                          <a
                            href={`tel:${business.phone.href}`}
                            className="underline underline-offset-2"
                          >
                            {business.phone.display}
                          </a>
                          .
                        </p>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#efe5d6] pt-5 sm:flex-row sm:items-center sm:justify-between">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn btn-secondary"
                    >
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      Back
                    </button>
                  ) : (
                    <Link to="/menu" className="btn btn-secondary">
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      View the Menu
                    </Link>
                  )}

                  {step < INQUIRY_STEPS.length - 1 ? (
                    <button type="submit" className="btn btn-primary sm:min-w-[12rem]">
                      Continue
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submission === 'submitting'}
                      className="btn btn-primary sm:min-w-[14rem]"
                    >
                      <CakeSlice className="h-4 w-4" aria-hidden="true" />
                      {submission === 'submitting'
                        ? 'Preparing…'
                        : 'Submit Demonstration'}
                    </button>
                  )}
                </div>
              </form>
            </div>

            <p className="body-sm mt-4 text-on-surface-variant">
              Your answers are kept only in this browser tab so you can move
              between steps. Nothing is sent to the bakery by this form.
            </p>
          </div>
        </div>
      </section>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        labelledBy="demo-dialog-title"
        className="modal-dialog"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="label-caps text-secondary">Demonstration only</p>
              <h2 id="demo-dialog-title" className="headline-sm mt-1 text-xl">
                Your enquiry was not sent.
              </h2>
            </div>
          </div>

          <p className="body-md mt-4 text-on-surface-variant">
            This form is a demonstration. Nothing was transmitted to Petite
            Bouchée, and no cake is reserved.
          </p>

          {reference ? (
            <p className="mt-3 rounded-sm bg-surface-container-low px-3 py-2 text-xs text-on-surface-variant">
              Demonstration reference:{' '}
              <span className="font-semibold tracking-wide text-primary">
                {reference}
              </span>
            </p>
          ) : null}

          <p className="body-sm mt-3 text-on-surface-variant">
            To discuss a real cake, call the bakery or send a message on
            Instagram. Your answers remain in this tab if you would like to
            refer to them.
          </p>

          <div className="mt-5 flex flex-col gap-2.5">
            <a
              href={`tel:${business.phone.href}`}
              className="btn btn-primary w-full"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {business.phone.display}
            </a>
            <a
              href={business.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary w-full"
            >
              <InstagramIcon className="h-4 w-4" />
              Message on Instagram
            </a>
            <button
              type="button"
              onClick={() => setDialogOpen(false)}
              className="btn btn-ghost w-full"
            >
              Keep editing
            </button>
          </div>

          <button
            type="button"
            onClick={resetEnquiry}
            className="mt-4 w-full text-center text-xs font-medium text-on-surface-variant underline decoration-outline-variant underline-offset-4 hover:text-primary"
          >
            Clear this demonstration and start again
          </button>
        </div>
      </Dialog>
    </>
  );
}
