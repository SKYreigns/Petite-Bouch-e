import type { InquiryProviderAdapter } from './InquiryProviderAdapter';
import type { CakeInquiry } from '../lib/cakeInquiry';
import type { InquiryAdapterResponse } from '../types/inquiry';
import { createDemoReference } from '../lib/cakeInquiry';

/**
 * A deliberately local adapter.
 *
 * It returns a reference so the interface can be exercised end-to-end, but it
 * never performs a network request and never stores the payload. Replace this
 * with a real provider only after the bakery has approved a destination and a
 * privacy process for enquiry data.
 */
export class DemoInquiryAdapter implements InquiryProviderAdapter {
  readonly name = 'Demonstration enquiry adapter';

  async submitInquiry(_payload: CakeInquiry): Promise<InquiryAdapterResponse> {
    await new Promise((resolve) => {
      window.setTimeout(resolve, 350);
    });

    return {
      success: true,
      demo: true,
      transactionId: createDemoReference(),
      submittedAt: new Date().toISOString(),
    };
  }
}
