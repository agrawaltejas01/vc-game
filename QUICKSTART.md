# Quick Start Guide

## Installation & Running

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser to http://localhost:3000
```

## Game Flow

### 1. Landing Page (`/`)
- Click "Start Game" to begin

### 2. Investor Intake (`/intake`)
Fill out your investor profile:
- **Preferred Sectors**: Select sectors you invest in
- **Avoided Sectors**: Select sectors you avoid (optional)
- **Stage Focus**: Pre-seed, Seed, Series A, Series B+
- **Geography**: US/Canada, Europe, India, Southeast Asia, Global, Other
- **Evaluation Weightages**: Adjust sliders to sum to 100%
  - Founders / Team
  - Sector / Market
  - Traction / Metrics
  - Product / Technology
  - Round Dynamics

Click "Start Playing" when ready.

### 3. Game Screen (`/game`)
**Split-screen layout:**
- **Left**: Scenario details + your response
- **Right**: Live preference vector analysis

For each scenario:
1. Read the scenario details
2. Record your response:
   - **Text**: Type your reasoning
   - **Audio**: Click "Record Audio" to record a voice note
   - You can provide both text and audio
3. Click "Submit Response"

You'll play through 5-6 scenarios total.

### 4. Summary Screen (`/summary`)
View your results:
- **Investor Archetype**: Your identified investment style
- **Decision Patterns**: Key patterns in your decisions
- **Stated vs Revealed**: How your actual choices compared to stated preferences
- **Evaluation Breakdown**: Your revealed weightages

Click "Play Again" to start over.

## Scenario Types

You'll encounter various scenarios including:
1. Pre-seed SaaS with strong founders, uncertain market
2. Seed AI Infrastructure with traction, high valuation
3. Series A Fintech with regulatory uncertainty
4. Pre-revenue Deeptech with breakthrough potential
5. Seed Consumer Internet with viral growth
6. Series A Climate Tech with capital intensity

Each scenario includes:
- Business overview (one-liner, description, business model)
- Founder profile (team background and expertise)
- Round details (size, valuation, ask amount, lead status)
- Traction metrics (if post-revenue)
- Key tensions and risks
- Missing information (info gaps)
- A specific question for you to answer

## Audio Recording

### How to Record:
1. Click "Record Audio" button
2. Allow microphone access if prompted
3. Speak your response (max 3 minutes)
4. Click "Stop Recording"
5. Listen to playback if desired
6. Re-record or delete if needed

### Supported Formats:
- WebM with Opus (Chrome, Firefox)
- MP4 with AAC (Safari)

### Requirements:
- Modern browser with MediaRecorder API
- Microphone access permission
- Good internet connection (if using real backend)

## Tips for Best Experience

1. **Be Instinctive**: This is about gut reactions, not deep analysis
2. **Use Audio**: Speaking your thoughts often reveals different patterns than writing
3. **Consider Trade-offs**: Each scenario has tensions - there's no "right" answer
4. **Be Honest**: The more authentic your responses, the more accurate your archetype

## Troubleshooting

### Microphone Not Working
- Check browser permissions
- Ensure microphone is connected
- Try refreshing the page
- Use text response as fallback

### Weightages Won't Sum to 100%
- Use the sliders in increments of 5%
- Watch the total indicator at the bottom
- All five categories must add up exactly

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

## Mock vs Real Backend

Currently using **mock data**. All scenarios and analysis are pre-generated.

To switch to real backend, update `.env`:
```
VITE_USE_MOCK=false
VITE_API_BASE_URL=https://your-backend-url.com/api
```

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **React Router v6** (routing)
- **MediaRecorder API** (audio recording)

## Next Steps

After playing the game:
1. Review your archetype and patterns
2. Compare stated vs revealed preferences
3. Consider how this aligns with your actual investment decisions
4. Share insights with your team (coming soon)

Enjoy the game!
