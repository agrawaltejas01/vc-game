# VC Deal Judgment Game

An interactive game for venture capitalists to test their investment instincts and discover their investor archetype.

## Features

- **Investor Profile Intake**: Collect investor preferences including sectors, stages, geographies, and evaluation weightages
- **Interactive Scenarios**: Play through 5-6 realistic startup scenarios with detailed business information
- **Audio + Text Responses**: Capture investor reasoning via text or audio recording (using MediaRecorder API)
- **Split-Screen Layout**: View scenario details alongside live preference vector analysis
- **Investor Archetype Analysis**: Receive detailed analysis of decision patterns and revealed preferences

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Context API
- **Audio Recording**: MediaRecorder API

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server (runs on http://localhost:3000)
npm run dev
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
vc-game/
├── src/
│   ├── routes/              # Page components
│   │   ├── Landing.tsx      # Landing page
│   │   ├── Intake.tsx       # Investor intake form
│   │   ├── Game.tsx         # Main game screen
│   │   └── Summary.tsx      # Results/archetype screen
│   ├── components/          # Reusable components
│   │   ├── layout/          # Layout components
│   │   ├── intake/          # Intake form components
│   │   ├── game/            # Game screen components
│   │   └── summary/         # Summary screen components
│   ├── context/             # React Context for global state
│   ├── api/                 # API client and mock data
│   ├── types/               # TypeScript type definitions
│   ├── hooks/               # Custom React hooks
│   └── utils/               # Utility functions
├── public/                  # Static assets
└── index.html              # HTML entry point
```

## Game Flow

1. **Landing** (`/`) - Introduction and start game
2. **Intake** (`/intake`) - Collect investor preferences
   - Preferred/avoided sectors
   - Stage focus
   - Geography focus
   - Evaluation weightages (must sum to 100%)
3. **Game** (`/game`) - Play through scenarios
   - View detailed scenario information
   - Record text or audio response
   - See live preference vector updates
4. **Summary** (`/summary`) - View results
   - Investor archetype
   - Decision patterns
   - Stated vs revealed preferences comparison

## Mock API

The application currently uses mocked APIs for development. All scenario data, investor vectors, and summaries are generated client-side.

### Switching to Real Backend

To connect to a real backend API:

1. Update `.env`:
   ```
   VITE_USE_MOCK=false
   VITE_API_BASE_URL=https://your-backend-url.com/api
   ```

2. Ensure backend implements these endpoints:
   - `POST /api/investor-profile` - Create investor profile
   - `POST /api/game/next-scenario` - Get next scenario
   - `POST /api/game/scenario-response` - Submit response
   - `GET /api/game/summary` - Get game summary

## API Integration Notes

### Expected Backend Endpoints

#### 1. Create Investor Profile
```
POST /api/investor-profile
Body: { profile: InvestorProfile }
Response: { investor_id: string, profile: InvestorProfile }
```

#### 2. Get Next Scenario
```
POST /api/game/next-scenario
Body: { investor_id: string, current_index: number }
Response: {
  scenario: Scenario,
  investor_vector: InvestorVector,
  has_more: boolean
}
```

#### 3. Submit Scenario Response
```
POST /api/game/scenario-response
Body: FormData or JSON {
  investor_id: string,
  scenario_id: string,
  text_response?: string,
  audio_response?: Blob
}
Response: {
  has_more: boolean,
  updated_vector: InvestorVector,
  next_scenario_id?: string
}
```

#### 4. Get Game Summary
```
GET /api/game/summary?investor_id={id}
Response: { summary: GameSummary }
```

## Audio Recording

The application uses the MediaRecorder API to record audio responses:

- **Format**: WebM with Opus codec (fallback to MP4/AAC for Safari)
- **Sample Rate**: 16kHz (optimized for voice)
- **Max Duration**: 3 minutes
- **Max File Size**: 5MB

Audio recordings are captured as Blobs and can be sent to the backend via FormData.

## Type Definitions

All TypeScript types are located in `src/types/`:

- `investor.ts` - Investor profile, sectors, stages, geographies
- `scenario.ts` - Scenario structure, business details, traction, etc.
- `game.ts` - Game state, responses, summaries
- `api.ts` - API request/response types

## Key Features

### Form Validation
- Weightages must sum exactly to 100%
- At least 1 sector, stage, and geography required
- Real-time validation feedback

### Split-Screen Game Layout
- **Left (60%)**: Scenario details + response input
- **Right (40%)**: Live investor preference vector

### Audio Recording States
1. **Ready**: Initial state with record button
2. **Recording**: Active recording with timer
3. **Recorded**: Playback controls + re-record/delete options
4. **Error**: Permission/browser compatibility issues

### Responsive Design
- Mobile: Stacked vertical layout
- Tablet: Adjusted split ratios
- Desktop: Full split-screen experience

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (with MP4/AAC audio fallback)
- Requires modern browser with MediaRecorder API for audio recording

## Future Enhancements

- Real backend API integration
- Share results functionality
- Audio playback in summary
- Enhanced data visualizations (radar charts)
- Downloadable reports
- Multi-language support

## License

MIT

## Contributing

This is a demonstration project. For production use, ensure:
- Proper error handling and logging
- Backend API security (authentication, rate limiting)
- Audio file processing and storage
- GDPR compliance for user data
- Accessibility improvements (ARIA labels, keyboard navigation)
