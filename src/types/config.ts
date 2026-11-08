export interface BusinessDetailsConfig {
  name: string;
  tagline: string;
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  instagram: string;
  instagramUrl: string;
}

export interface FeatureFlags {
  conciergeEnabled: boolean;
  voiceEnabled: boolean;
  newsletterEnabled: boolean;
  inquirySubmissionEnabled: boolean;
  demoInquiry: boolean;
}

export type AdapterType = 'demo' | 'serverless' | 'webhook';

export interface AppConfig {
  environment: 'development' | 'staging' | 'production';
  inquiryAdapterType: AdapterType;
  businessDetails: BusinessDetailsConfig;
  featureFlags: FeatureFlags;
}
