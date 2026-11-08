import { ArrowLeft, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { business } from '../data/site';
import { InstagramIcon } from '../components/ui/InstagramIcon';
import { usePageMeta } from '../lib/usePageMeta';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'enquiry-form', title: 'The cake enquiry form' },
  { id: 'automatic', title: 'Information collected automatically' },
  { id: 'storage', title: 'Cookies and browser storage' },
  { id: 'third-parties', title: 'Third-party links' },
  { id: 'choices', title: 'Your choices' },
  { id: 'changes', title: 'Changes to this notice' },
  { id: 'contact', title: 'Contact' },
];

export function Privacy() {
  usePageMeta(
    'Privacy — Petite Bouchée Patisserie',
    'How this Petite Bouchée website handles information, including the demonstration cake enquiry form and browser storage.'
  );

  return (
    <>
      <section className="border-b border-[#efe5d6] bg-surface-container-low/50">
        <div className="shell py-12 lg:py-16">
          <p className="eyebrow">Privacy</p>
          <h1 className="headline-lg mt-3 max-w-3xl">
            A short, plain-language
            <br />
            <span className="italic font-normal text-secondary">
              privacy notice.
            </span>
          </h1>
          <p className="body-lg mt-4 max-w-2xl text-on-surface-variant">
            This notice explains how this website handles information, including
            the demonstration cake enquiry form. It does not describe the
            bakery’s in-store or telephone practices.
          </p>
          <p className="label-caps mt-5 text-outline">
            Last updated: November 8, 2026
          </p>
        </div>
      </section>

      <section className="bg-surface py-12 lg:py-16">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
          <nav aria-label="Privacy sections" className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="label-caps text-secondary">On this page</p>
              <ul className="mt-3 space-y-0.5">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex min-h-[40px] items-center text-sm text-on-surface-variant transition-colors hover:text-primary"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="lg:col-span-9">
            <div className="max-w-3xl space-y-10">
              <section id="overview" aria-labelledby="overview-heading">
                <h2 id="overview-heading" className="headline-sm text-xl">
                  Overview
                </h2>
                <p className="body-md mt-3 text-on-surface-variant">
                  This website presents Petite Bouchée Patisserie, a bakery in
                  Toronto, Ontario. It is a brochure-style site: you can read
                  about the bakery, browse the menu, find opening hours and
                  start a cake enquiry. There is no account, newsletter or online
                  payment.
                </p>
              </section>

              <section id="enquiry-form" aria-labelledby="enquiry-heading">
                <h2 id="enquiry-heading" className="headline-sm text-xl">
                  The cake enquiry form
                </h2>
                <div className="body-md mt-3 space-y-3 text-on-surface-variant">
                  <p>
                    The cake enquiry form on this site is a{' '}
                    <strong className="font-semibold text-primary">
                      demonstration
                    </strong>
                    . It does not send your answers to the bakery, does not
                    create a booking and does not take payment. The confirmation
                    dialog tells you when nothing has been sent.
                  </p>
                  <p>
                    Because the form is a demonstration, no enquiry details are
                    transmitted to Petite Bouchée or stored on a bakery server.
                    To discuss a real cake, please call{' '}
                    <a
                      href={`tel:${business.phone.href}`}
                      className="font-medium text-primary underline decoration-champagne underline-offset-4"
                    >
                      {business.phone.display}
                    </a>{' '}
                    or send a message on Instagram.
                  </p>
                </div>
              </section>

              <section id="automatic" aria-labelledby="automatic-heading">
                <h2 id="automatic-heading" className="headline-sm text-xl">
                  Information collected automatically
                </h2>
                <div className="body-md mt-3 space-y-3 text-on-surface-variant">
                  <p>
                    This site does not include advertising, analytics or
                    behavioural tracking scripts, and it does not set its own
                    tracking cookies.
                  </p>
                  <p>
                    The site is served as a static website through GitHub Pages.
                    Like most web hosts, GitHub may process standard technical
                    information such as an IP address, browser type and the pages
                    requested in order to deliver the site and protect its
                    service. That processing is governed by GitHub’s own privacy
                    statement, not by the bakery.
                  </p>
                </div>
              </section>

              <section id="storage" aria-labelledby="storage-heading">
                <h2 id="storage-heading" className="headline-sm text-xl">
                  Cookies and browser storage
                </h2>
                <div className="body-md mt-3 space-y-3 text-on-surface-variant">
                  <p>
                    To keep your answers while you move between the four enquiry
                    steps, the form saves a draft in your browser’s{' '}
                    <code className="rounded-sm bg-surface-container px-1.5 py-0.5 text-xs text-primary">
                      sessionStorage
                    </code>{' '}
                    under the key{' '}
                    <code className="rounded-sm bg-surface-container px-1.5 py-0.5 text-xs text-primary">
                      pb:cake-inquiry-draft
                    </code>
                    . This draft stays in the current browser tab. It is not sent
                    anywhere.
                  </p>
                  <p>
                    You can remove the draft at any time by choosing “Clear this
                    demonstration and start again” in the confirmation dialog,
                    or by closing the browser tab. No persistent cookies are used
                    for this purpose.
                  </p>
                </div>
              </section>

              <section id="third-parties" aria-labelledby="third-parties-heading">
                <h2 id="third-parties-heading" className="headline-sm text-xl">
                  Third-party links
                </h2>
                <div className="body-md mt-3 space-y-3 text-on-surface-variant">
                  <p>
                    The site links to Instagram and Google Maps. If you follow
                    those links, the destination service may collect information
                    under its own privacy policy. The bakery does not control
                    those services.
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>
                      <a
                        href={business.instagram.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary underline decoration-champagne underline-offset-4"
                      >
                        Instagram
                      </a>{' '}
                      — for messages and daily posts.
                    </li>
                    <li>
                      <a
                        href={business.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary underline decoration-champagne underline-offset-4"
                      >
                        Google Maps
                      </a>{' '}
                      — for directions to the bakery.
                    </li>
                  </ul>
                </div>
              </section>

              <section id="choices" aria-labelledby="choices-heading">
                <h2 id="choices-heading" className="headline-sm text-xl">
                  Your choices
                </h2>
                <div className="body-md mt-3 space-y-3 text-on-surface-variant">
                  <p>
                    You can browse the entire site without entering any personal
                    information. If you use the demonstration form, you can clear
                    the saved draft at any time as described above.
                  </p>
                  <p>
                    For questions about information you have shared with the
                    bakery directly — by phone or Instagram, for example — please
                    contact the bakery using the details below.
                  </p>
                </div>
              </section>

              <section id="changes" aria-labelledby="changes-heading">
                <h2 id="changes-heading" className="headline-sm text-xl">
                  Changes to this notice
                </h2>
                <p className="body-md mt-3 text-on-surface-variant">
                  This notice may be updated if the website changes — for
                  example, if a real enquiry provider or analytics service is
                  added later. The date at the top of the page shows the latest
                  revision.
                </p>
              </section>

              <section id="contact" aria-labelledby="contact-heading">
                <h2 id="contact-heading" className="headline-sm text-xl">
                  Contact
                </h2>
                <p className="body-md mt-3 text-on-surface-variant">
                  Questions about this notice can be raised with the bakery
                  directly. There is no public email address listed for the
                  bakery on this site.
                </p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <a
                    href={`tel:${business.phone.href}`}
                    className="btn btn-primary"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {business.phone.display}
                  </a>
                  <a
                    href={business.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    <InstagramIcon className="h-4 w-4" />
                    {business.instagram.handle}
                  </a>
                </div>
              </section>

              <div className="border-t border-[#efe5d6] pt-6">
                <Link
                  to="/"
                  className="inline-flex min-h-[44px] items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-secondary transition-colors hover:text-primary"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
