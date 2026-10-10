import { InquiryProviderAdapter } from './InquiryProviderAdapter';
import { InquiryPayload, InquiryAdapterResponse } from '../types/inquiry';

export class MockInquiryAdapter implements InquiryProviderAdapter {
  readonly name = 'MockInquiryAdapter (Development Only)';

  async submitInquiry(payload: InquiryPayload): Promise<InquiryAdapterResponse> {
    // SECURITY GUARD: Never allow MockInquiryAdapter in production
    if (import.meta.env.MODE === 'production' || import.meta.env.PROD) {
      throw new Error(
        'SECURITY CRITICAL FATAL EXCEPTION: MockInquiryAdapter is prohibited in production mode. ' +
        'Configure a real InquiryProviderAdapter before deploying.'
      );
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Basic dev validation check
    if (!payload.customerEmail || !payload.customerName) {
      return {
        success: false,
        providerStatus: 400,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Customer name and email are required for inquiry submission.',
        },
      };
    }

    const mockReferenceId = `PB-MOCK-${Math.floor(1000 + Math.random() * 9000)}`;

    return {
      success: true,
      transactionId: mockReferenceId,
      providerStatus: 200,
    };
  }
}
