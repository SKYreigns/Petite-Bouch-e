import { AppConfig, BusinessDetailsConfig, FeatureFlags } from '../types/config';
import { InquiryProviderAdapter } from '../adapters/InquiryProviderAdapter';
import { MockInquiryAdapter } from '../adapters/MockInquiryAdapter';

const isProduction = import.meta.env.MODE === 'production' || import.meta.env.PROD;

export const businessDetails: BusinessDetailsConfig = {
  name: 'Petite Bouchée',
  tagline: 'Artisan Patisserie · Toronto',
  city: 'Toronto',
  country: 'Canada',
  // In production, we omit unverified placeholders until client provides final data
  address: isProduction ? '' : 'Toronto, Ontario, Canada (Address To Be Confirmed)',
  phone: isProduction ? '' : '+1 (416) 555-0199 (Development Placeholder)',
  email: isProduction ? '' : 'inquiries@petitebouchee-demo.ca (Development Placeholder)',
  hours: isProduction ? '' : 'Tuesday – Sunday: 10:00 AM – 6:00 PM (To Be Confirmed)',
};

export const featureFlags: FeatureFlags = {
  conciergeEnabled: false, // Disabled until Phase 5 client authorization
  voiceEnabled: false,      // Disabled until Phase 5 client authorization
  newsletterEnabled: false, // Disabled until CASL/provider consent approval
  inquirySubmissionEnabled: !isProduction, // Disabled in prod until a real provider exists
};

export const appConfig: AppConfig = {
  environment: isProduction ? 'production' : 'development',
  inquiryAdapterType: isProduction ? 'serverless' : 'mock',
  businessDetails,
  featureFlags,
};

/**
 * Factory function to resolve the configured InquiryProviderAdapter.
 * Enforces a strict security guard preventing MockInquiryAdapter in production.
 */
export function getInquiryAdapter(): InquiryProviderAdapter {
  if (isProduction && appConfig.inquiryAdapterType === 'mock') {
    throw new Error(
      'CRITICAL SECURITY CONFIGURATION ERROR: MockInquiryAdapter cannot be used in production mode.'
    );
  }

  if (appConfig.inquiryAdapterType === 'mock') {
    return new MockInquiryAdapter();
  }

  // Placeholder for serverless adapter (Phase 4 integration)
  throw new Error(`Inquiry adapter type '${appConfig.inquiryAdapterType}' not yet configured.`);
}
