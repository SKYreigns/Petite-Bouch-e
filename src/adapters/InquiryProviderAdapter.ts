import type { CakeInquiry } from '../lib/cakeInquiry';
import type { InquiryAdapterResponse } from '../types/inquiry';

export interface InquiryProviderAdapter {
  readonly name: string;
  submitInquiry(payload: CakeInquiry): Promise<InquiryAdapterResponse>;
}
