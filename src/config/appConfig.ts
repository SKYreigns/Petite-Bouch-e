import { business } from '../data/site';
import { DemoInquiryAdapter } from '../adapters/DemoInquiryAdapter';
import type { InquiryProviderAdapter } from '../adapters/InquiryProviderAdapter';
import type {
  AppConfig,
  BusinessDetailsConfig,
  FeatureFlags,
} from '../types/config';

const isProduction = import.meta.env.PROD;

export const businessDetails: BusinessDetailsConfig = {
  name: business.name,
  tagline: business.tagline,
  city: business.address.city,
  country: business.address.country,
  address: `${business.address.street}, ${business.address.city}, ${business.address.region} ${business.address.postalCode}`,
  phone: business.phone.display,
  // No public email address has been verified for the bakery.
  email: '',
  hours: business.hours
    .map((entry) => `${entry.day}: ${entry.open} – ${entry.close}`)
    .join('; '),
  instagram: business.instagram.handle,
  instagramUrl: business.instagram.url,
};

export const featureFlags: FeatureFlags = {
  conciergeEnabled: false,
  voiceEnabled: false,
  newsletterEnabled: false,
  // The form is a demonstration; nothing is sent to a provider.
  inquirySubmissionEnabled: false,
  demoInquiry: true,
};

export const appConfig: AppConfig = {
  environment: isProduction ? 'production' : 'development',
  inquiryAdapterType: 'demo',
  businessDetails,
  featureFlags,
};

/**
 * Resolve the configured inquiry adapter. The demonstration adapter is the
 * only implementation in this build. A real provider can be added here later
 * without changing the form or its validation.
 */
export function getInquiryAdapter(): InquiryProviderAdapter {
  return new DemoInquiryAdapter();
}
