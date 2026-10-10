export interface BusinessDetailsConfig {
  name: string;
  subheading: string;
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export interface FeatureFlags {
  conciergeEnabled: boolean;
  voiceEnabled: boolean;
  newsletterEnabled: boolean;
  inquirySubmissionEnabled: boolean;
}

export type AdapterType = 'mock' | 'serverless' | 'webhook';

export interface AppConfig {
  environment: 'development' | 'staging' | 'production';
  inquiryAdapterType: AdapterType;
  businessDetails: BusinessDetailsConfig;
  featureFlags: FeatureFlags;
}
