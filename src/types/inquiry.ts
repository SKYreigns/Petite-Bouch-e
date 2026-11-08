import type { CakeInquiry } from '../lib/cakeInquiry';

/**
 * Payload accepted by an inquiry provider. The site currently uses a
 * demonstration adapter, so no payload ever leaves the browser.
 */
export type InquiryPayload = CakeInquiry;

export interface InquiryAdapterResponse {
  success: boolean;
  demo?: boolean;
  transactionId?: string;
  submittedAt?: string;
  error?: {
    code: string;
    message: string;
  };
}
