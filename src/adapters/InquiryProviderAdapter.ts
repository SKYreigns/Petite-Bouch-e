import { InquiryPayload, InquiryAdapterResponse } from '../types/inquiry';

export interface InquiryProviderAdapter {
  readonly name: string;
  submitInquiry(payload: InquiryPayload): Promise<InquiryAdapterResponse>;
}
