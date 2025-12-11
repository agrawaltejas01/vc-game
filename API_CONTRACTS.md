# API Contracts for Backend Implementation

This document describes the API endpoints that the frontend expects. Use this to implement or replicate the backend APIs.

## Base URL

Development: `http://localhost:YOUR_PORT/api`
Production: `https://your-domain.com/api`

## Authentication

Currently, the frontend uses `investor_id` as a simple session identifier. For production, consider implementing proper authentication (JWT, sessions, etc.).

## Endpoints

### 1. Create Investor Profile

Create a new investor profile and start a game session.

**Endpoint**: `POST /investor-profile`

**Request Body**:
```json
{
  "profile": {
    "preferred_sectors": ["SaaS", "AI Infra / DevTools"],
    "avoided_sectors": ["Crypto", "Gambling"],
    "avoided_sectors_other": "Anything uncertain regulatory",
    "stage_focus": ["seed", "series_a"],
    "geography_focus": ["US/Canada", "Europe"],
    "evaluation_weights": {
      "founders": 30,
      "sector_market": 25,
      "traction": 20,
      "product_tech": 15,
      "round_dynamics": 10
    }
  }
}
```

**Response** (200 OK):
```json
{
  "investor_id": "inv_1234567890_abcdef123",
  "profile": { /* same as request */ }
}
```

**TypeScript Types**:
```typescript
// Request
interface CreateProfileRequest {
  profile: InvestorProfile;
}

// Response
interface CreateProfileResponse {
  investor_id: string;
  profile: InvestorProfile;
}
```

---

### 2. Get Next Scenario

Fetch the next scenario for the investor. Backend controls which scenario to show (can be sequential or adaptive based on previous responses).

**Endpoint**: `POST /game/next-scenario`

**Request Body**:
```json
{
  "investor_id": "inv_1234567890_abcdef123",
  "current_index": 0
}
```

**Response** (200 OK):
```json
{
  "scenario": {
    "scenario_id": "sc_1",
    "scenario_index": 0,
    "stage": "Pre-seed",
    "sector": "SaaS",
    "business": {
      "company_name": "Project Rocketship",
      "one_liner": "AI-powered sales intelligence platform",
      "description": "Full description here...",
      "business_model": "Usage-based SaaS...",
      "is_pre_product": false,
      "is_pre_revenue": true
    },
    "founder_profile": {
      "summary": "Stanford CS graduates...",
      "team_bullets": [
        "Sarah Chen - CEO: ...",
        "David Rodriguez - CTO: ..."
      ]
    },
    "round_details": {
      "round_type": "Pre-seed",
      "total_round_size_usd": 1000000,
      "investor_ask_usd": 150000,
      "lead_status": "no_lead_yet"
    },
    "traction_snapshot": null,
    "tension": {
      "description": "Strong tech team but weak GTM...",
      "key_risks": [
        "No revenue yet",
        "Weak GTM"
      ]
    },
    "info_gaps": [
      {
        "category": "Go-to-Market",
        "description": "Customer acquisition unclear"
      }
    ],
    "question_to_investor": "Would you invest at this stage?",
    "has_twist": false
  },
  "investor_vector": {
    "quantitative_metrics": {
      "founders": 30,
      "sector_market": 25,
      "traction": 20,
      "product_tech": 15,
      "round_dynamics": 10
    },
    "qualitative_insights": [
      "Initial profile established"
    ],
    "decision_patterns": [],
    "risk_tolerance": "Baseline established"
  },
  "has_more": true
}
```

**TypeScript Types**:
```typescript
interface GetNextScenarioRequest {
  investor_id: string;
  current_index: number;
}

interface GetNextScenarioResponse {
  scenario: Scenario;
  investor_vector: InvestorVector;
  has_more: boolean;
}
```

---

### 3. Submit Scenario Response

Submit investor's response to a scenario (text and/or audio).

**Endpoint**: `POST /game/scenario-response`

**Request** (with audio):
- **Content-Type**: `multipart/form-data`
- **Fields**:
  - `investor_id` (string)
  - `scenario_id` (string)
  - `text_response` (string, optional)
  - `audio_response` (File/Blob, optional)

**Request** (text only):
- **Content-Type**: `application/json`
```json
{
  "investor_id": "inv_1234567890_abcdef123",
  "scenario_id": "sc_1",
  "text_response": "I would pass on this because..."
}
```

**Response** (200 OK):
```json
{
  "has_more": true,
  "updated_vector": {
    "quantitative_metrics": {
      "founders": 33,
      "sector_market": 23,
      "traction": 20,
      "product_tech": 14,
      "round_dynamics": 10
    },
    "qualitative_insights": [
      "Shows increased emphasis on founder quality",
      "Willing to take technical risk with strong teams"
    ],
    "decision_patterns": [
      "Prioritizes founder pedigree",
      "Comfortable with pre-revenue if team is exceptional"
    ],
    "risk_tolerance": "Higher than initially stated"
  },
  "next_scenario_id": "sc_2"
}
```

**TypeScript Types**:
```typescript
interface SubmitResponseRequest {
  investor_id: string;
  scenario_id: string;
  text_response?: string;
  audio_response?: Blob;
}

interface SubmitResponseResponse {
  has_more: boolean;
  updated_vector: InvestorVector;
  next_scenario_id?: string;
}
```

---

### 4. Get Game Summary

Retrieve final analysis after completing all scenarios.

**Endpoint**: `GET /game/summary?investor_id={id}`

**Query Parameters**:
- `investor_id` (required)

**Response** (200 OK):
```json
{
  "summary": {
    "archetype_name": "The Conviction-Driven Catalyst",
    "archetype_description": "You are a conviction-driven investor who backs exceptional founders...",
    "decision_patterns": [
      {
        "pattern": "Founder-First Philosophy",
        "examples": [
          "Backed pre-seed SaaS despite weak GTM",
          "Invested in deeptech despite 7-year timeline"
        ],
        "confidence": "high"
      }
    ],
    "comparison_to_initial": [
      {
        "stated_preference": "Founder weight: 30%",
        "revealed_preference": "Founder weight: ~45%",
        "alignment": "partially_aligned",
        "insights": "Your actual decisions placed 15% more weight on founders..."
      }
    ],
    "evaluation_breakdown": {
      "founders": 42,
      "sector_market": 18,
      "traction": 15,
      "product_tech": 15,
      "round_dynamics": 10
    },
    "additional_insights": {
      "risk_profile": "Higher risk tolerance than stated",
      "stage_preference": "Can invest across all stages"
    }
  }
}
```

**TypeScript Types**:
```typescript
interface GetSummaryRequest {
  investor_id: string;
}

interface GetSummaryResponse {
  summary: GameSummary;
}
```

---

## Type Definitions Reference

### InvestorProfile
```typescript
interface InvestorProfile {
  preferred_sectors: Sector[];
  avoided_sectors: Sector[];
  avoided_sectors_other?: string;
  stage_focus: Stage[];
  geography_focus: Geography[];
  evaluation_weights: EvaluationWeights;
}

enum Sector {
  SAAS = 'SaaS',
  AI_INFRA = 'AI Infra / DevTools',
  FINTECH_INFRA = 'Fintech Infra (non-regulated)',
  // ... etc
}

enum Stage {
  PRE_SEED = 'pre-seed',
  SEED = 'seed',
  SERIES_A = 'series_a',
  SERIES_B_PLUS = 'series_b_plus',
}

interface EvaluationWeights {
  founders: number;
  sector_market: number;
  traction: number;
  product_tech: number;
  round_dynamics: number;
}
```

### Scenario
```typescript
interface Scenario {
  scenario_id: string;
  scenario_index: number;
  stage: string;
  sector: string;
  business: Business;
  founder_profile: FounderProfile;
  round_details: RoundDetails;
  traction_snapshot: TractionSnapshot | null;
  tension: Tension;
  info_gaps: InfoGap[];
  question_to_investor: string;
  has_twist: boolean;
}

interface Business {
  one_liner: string;
  description: string;
  business_model: string;
  is_pre_product: boolean;
  is_pre_revenue: boolean;
}

interface FounderProfile {
  summary: string;
  team_bullets: string[];
}

interface RoundDetails {
  round_type: string;
  total_round_size_usd: number;  // in dollars
  valuation?: number;  // in dollars
  investor_ask_usd: number;  // in dollars
  lead_status: 'leading' | 'following' | 'no_lead_yet';
  other_investors?: string[];
}

interface TractionSnapshot {
  revenue_arr_mrr?: string;
  growth_rate?: string;
  key_metrics: Record<string, string | number>;
  customer_count?: number;
}
```

### InvestorVector
```typescript
interface InvestorVector {
  quantitative_metrics: {
    founders: number;
    sector_market: number;
    traction: number;
    product_tech: number;
    round_dynamics: number;
  };
  qualitative_insights: string[];
  decision_patterns: string[];
  risk_tolerance?: string;
  other_metadata?: Record<string, any>;
}
```

### GameSummary
```typescript
interface GameSummary {
  archetype_name: string;
  archetype_description: string;
  decision_patterns: DecisionPattern[];
  comparison_to_initial: ArchetypeComparison[];
  evaluation_breakdown: {
    founders: number;
    sector_market: number;
    traction: number;
    product_tech: number;
    round_dynamics: number;
  };
  additional_insights?: Record<string, any>;
}

interface DecisionPattern {
  pattern: string;
  examples: string[];
  confidence: 'high' | 'medium' | 'low';
}

interface ArchetypeComparison {
  stated_preference: string;
  revealed_preference: string;
  alignment: 'aligned' | 'partially_aligned' | 'misaligned';
  insights: string;
}
```

---

## Error Handling

All endpoints should return appropriate HTTP status codes:

- `200 OK` - Success
- `400 Bad Request` - Invalid input
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

**Error Response Format**:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Evaluation weights must sum to 100%",
    "details": {
      "sum": 95
    }
  }
}
```

---

## Implementation Notes

### Scenario Generation
- Use LLM to generate realistic scenarios based on investor profile
- Ensure scenarios test different dimensions (founder quality, market timing, traction, etc.)
- Include various stages, sectors, and risk profiles
- Add specific tensions and info gaps to make decisions non-trivial

### Investor Vector Analysis
- Update vector after each response
- Analyze both what they said (text/audio) and the implicit choices
- Track deviations from stated preferences
- Build pattern recognition over multiple responses

### Audio Processing
- Accept WebM (Opus) and MP4 (AAC) formats
- Transcribe audio to text (using Whisper or similar)
- Analyze sentiment and key phrases
- Store audio files securely (S3, Cloud Storage)

### Database Schema
Consider storing:
- Investor profiles
- Game sessions
- Scenario responses (text + audio URL)
- Calculated vectors over time
- Final summaries

### Security
- Validate all inputs
- Sanitize text responses
- Limit audio file sizes (5MB max)
- Rate limit API calls
- Implement proper authentication

---

## Testing the APIs

Use the frontend's mock data as reference for expected formats. See:
- `src/api/mock.ts` - Mock scenarios and summaries
- `src/types/*.ts` - Complete type definitions

When backend is ready, update frontend `.env`:
```
VITE_USE_MOCK=false
VITE_API_BASE_URL=https://your-backend.com/api
```
