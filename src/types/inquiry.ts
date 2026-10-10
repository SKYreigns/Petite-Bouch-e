export interface InquiryPayload {
  occasion: string;
  servings: string;
  flavour: string;
  design: string;
  colour: string;
  eventDate: string;
  targetBudget: string;
  customerName: string;
  customerEmail: string;
  dietaryNotes?: string;
  submittedAt: string; // ISO 8601 string timestamp
}

export interface InquiryAdapterResponse {
  success: boolean;
  transactionId?: string;
  providerStatus?: number | string;
  error?: {
    code: string;
    message: string;
  };
}
