# Data Schema and API Contracts

Status: Proposed contract. Adapt to the approved backend and inquiry destination.

## Principles

- Store only data needed to respond to the inquiry.
- Treat all browser input as untrusted.
- Validate on the server.
- Do not accept client-supplied final prices.
- Do not store voice recordings by default.
- Use UTC timestamps internally and display dates in the user's locale.
- Confirm retention and deletion policy with the client.

## Core entities

### Creation

- id: string
- slug: string
- name: string
- description: string
- imageUrl: string
- category: string
- status: "published" | "draft" | "archived"
- priceLabel?: string
- priceDisclaimer?: string
- sortOrder: number

All descriptions, ingredients, pricing, and availability must be client-approved.

### Inquiry

- id: string
- createdAt: ISO datetime
- status: "new" | "reviewing" | "responded" | "closed"
- occasion: string
- servings: integer
- eventDate?: YYYY-MM-DD
- flavourPreference?: string
- designPreference?: string
- colourPreference?: string
- budgetRange?: string
- notes?: string
- contactName: string
- contactEmail?: string
- contactPhone?: string
- preferredContactMethod: "email" | "phone"
- consentToContact: boolean
- source: "configurator" | "concierge"
- idempotencyKey?: string

Require at least one valid contact channel. Confirm whether phone, email, or both
are required with the client.

### Concierge conversation

Do not persist by default.

If persistence is approved:
- id
- sessionId
- createdAt
- expiresAt
- messages with role and content
- consent state

Do not store unnecessary identifiers, audio, or sensitive personal information.

## API proposal

### POST /api/inquiries

Purpose:
Validate and deliver a custom cake inquiry.

Request:
{
  "occasion": "Birthday",
  "servings": 12,
  "eventDate": "2027-05-22",
  "flavourPreference": "Chocolate",
  "designPreference": "Botanical",
  "colourPreference": "Ivory",
  "budgetRange": "CAD 200-300",
  "notes": "Please contact me about options.",
  "contactName": "Alex Example",
  "contactEmail": "alex@example.com",
  "contactPhone": "",
  "preferredContactMethod": "email",
  "consentToContact": true,
  "source": "configurator"
}

Success: HTTP 201
{
  "ok": true,
  "inquiryId": "server-generated-id",
  "message": "Inquiry received."
}

Validation failure: HTTP 400
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please review the highlighted fields.",
    "fields": {
      "contactEmail": "Enter a valid email address."
    }
  }
}

Rate limited: HTTP 429
{
  "ok": false,
  "error": {
    "code": "RATE_LIMITED",
    "message": "Please wait before trying again."
  }
}

Server/provider failure: HTTP 503
{
  "ok": false,
  "error": {
    "code": "SUBMISSION_UNAVAILABLE",
    "message": "We couldn't send your inquiry. Please try again."
  }
}

Do not expose internal provider errors or secrets.

## Validation rules

- Trim strings.
- Enforce maximum lengths.
- Reject malformed email and phone formats.
- Reject invalid dates.
- Reject dates that violate client-approved lead-time rules.
- Servings must be a positive integer within a client-approved range.
- Reject unexpected enum values.
- Require consentToContact = true before submission.
- Apply rate limiting and spam checks.
- Escape output when rendering user-provided text.
- Never interpret user text as HTML.

## Delivery semantics

A success response means the inquiry has been accepted by the configured
destination or durably stored. Do not return success merely because the
frontend opened a modal.

If email is the only delivery mechanism, document provider reliability,
failure handling, and whether failed sends are retried.

## AI/concierge boundary

If an AI endpoint is approved, use a server-side adapter such as:

POST /api/concierge/message

The model may use only approved business knowledge. The API must not expose
provider credentials. AI-generated content is not authoritative for price,
availability, allergens, or order status.

The assistant can prepare a draft inquiry, but submission must use the
inquiry endpoint after explicit user confirmation.

## Versioning

If the API is consumed by external systems, version it before public release.
For an internal first-party endpoint, maintain backward-compatible changes
where practical and document breaking changes.