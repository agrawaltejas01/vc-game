# Testing Checklist - Engagement Features Implementation

## Server Status
✅ Dev server running at: `http://localhost:3001/`
✅ No compilation errors
✅ Hot module reload (HMR) working

---

## What to Test

### Currently Visible Feature (Ready to Test Now)

#### ✅ Feature 7: Enhanced Progress Bar
**How to Test:**
1. Go to `http://localhost:3001/`
2. Navigate to `/intake` page
3. Fill out the intake form:
   - Select preferred sectors (e.g., fintech, ai)
   - Optionally select avoided sectors
   - Select stage focus (e.g., Seed, Series A)
   - Select geography (India should be auto-selected)
   - Adjust evaluation weightages (must sum to 100%)
4. Click "Start Playing"
5. You should now be on `/game` page

**Expected Behavior:**
- **Desktop & Mobile**: Top of page shows enhanced progress bar
- **Instead of**: Simple 1px black line
- **You should see**:
  - 5 circular milestone nodes in a row
  - Current scenario (1) in purple with pulsing animation and number
  - Remaining scenarios (2-5) in white/gray with numbers
  - Connector lines between nodes (black for completed, gray for upcoming)
  - Text below: "Scenario 1 of 5 • Your profile is 20% revealed"

**Responsive Checks:**
- Desktop (>1024px): Full milestone circles with numbers visible
- Mobile (<1024px): Milestone circles visible, scenario numbers hidden on very small screens

**Feature Flag:**
- Located in: `/src/config/engagementFeatures.ts`
- Toggle: `showEnhancedProgressBar: true` (currently enabled)
- To see original simple bar: Set to `false` and refresh

---

## Core Functionality Tests (Must Not Be Broken)

### 1. Intake Form (/intake)
**Test Steps:**
1. Navigate to `/intake`
2. Fill out all required fields
3. Try to submit without filling all fields (should show validation errors)
4. Fill all fields correctly
5. Click "Start Playing"

**Expected:**
- ✅ Form validation works
- ✅ Can select/deselect chips
- ✅ Can add custom sectors with "+ Add custom"
- ✅ Can add custom geographies with "+ Add custom" (India auto-selected)
- ✅ Weightage sliders sum to 100% validation
- ✅ Redirects to `/game` on successful submission

**Responsive:**
- ✅ Form layout adapts to mobile
- ✅ All inputs are tappable/clickable
- ✅ No horizontal scroll

### 2. Game Page (/game)
**Test Steps:**
1. Complete intake form to reach game page
2. Read the scenario details
3. Click "Pass" or "Invest" button
4. Try submitting without rationale (should be blocked)
5. Check "Skip - I don't want to add a rationale"
6. Submit decision
7. Next scenario loads

**Expected:**
- ✅ Scenario details display correctly
- ✅ Decision buttons (Pass/Invest) work
- ✅ Can't submit without decision
- ✅ Can't submit without rationale OR skip checkbox
- ✅ Text/Audio toggles work (from previous implementation)
- ✅ Skip checkbox works (from previous implementation)
- ✅ Submit button disabled when invalid
- ✅ Loading state shows during submission
- ✅ Next scenario loads after submission
- ✅ Progress bar advances (1 of 5 → 2 of 5)

**Responsive - Desktop (>1024px):**
- ✅ Split-screen layout (60% scenario | 40% decision vector)
- ✅ Both panels scroll independently
- ✅ Enhanced progress bar at top

**Responsive - Mobile (<1024px):**
- ✅ Tab navigation ("Investment Scenario" | "Your Decision Vector")
- ✅ Can switch between tabs
- ✅ Enhanced progress bar at top
- ✅ No horizontal scroll
- ✅ Buttons are easily tappable

### 3. Decision Vector Panel (/game - right side or tab)
**Test Steps:**
1. On game page (desktop: right panel, mobile: "Your Decision Vector" tab)
2. Initially should show placeholder message
3. After first decision, should show metrics

**Expected:**
- ✅ Before first decision: "Your preference profile will appear here after you respond to scenarios."
- ✅ After first decision: Quantitative metrics (5 progress bars)
- ✅ Qualitative insights (bulleted list)
- ✅ Decision patterns (bulleted list)
- ✅ Risk tolerance (text)
- ✅ All metric bars animate smoothly
- ✅ Cards have proper styling (cyan/blue/gold accents)

**Responsive:**
- ✅ Desktop: Sticky position (stays visible while scrolling)
- ✅ Mobile: Full-width in tab view
- ✅ All text readable, no overflow

### 4. Text/Audio Input (from previous implementation)
**Test Steps:**
1. Make a decision (Pass or Invest)
2. Click "Text" button
3. Type some text
4. Click "Audio" button
5. Click "Text" button again to toggle off

**Expected:**
- ✅ Text button shows border when active (purple border-3)
- ✅ Audio button shows border when active (purple border-3)
- ✅ Text area appears when Text is active
- ✅ Audio recorder appears when Audio is active
- ✅ Can have both text and audio active
- ✅ Helper text shows: "You've added both text and audio"
- ✅ Toggle off clears the input

### 5. Skip Checkbox (from previous implementation)
**Test Steps:**
1. Make a decision
2. Activate Text or Audio
3. Check "Skip - I don't want to add a rationale"
4. Verify text/audio clears and deactivates
5. Uncheck Skip
6. Activate Text again
7. Verify Skip unchecks automatically

**Expected:**
- ✅ Skip checkbox positioned right before Submit button
- ✅ Checking Skip → clears and deactivates text/audio
- ✅ Activating text/audio → unchecks Skip
- ✅ Submit button enabled when Skip is checked (no rationale required)

### 6. Summary Page (/summary)
**Test Steps:**
1. Complete all 5 scenarios
2. Should redirect to `/summary` automatically

**Expected:**
- ✅ Archetype card displays
- ✅ Decision patterns display
- ✅ Stated vs Revealed comparison displays
- ✅ Evaluation breakdown displays
- ✅ "Play Again" button works (redirects to /intake)
- ✅ All sections have proper styling

**Responsive:**
- ✅ Cards stack vertically on mobile
- ✅ Two-column layout for stated/revealed on desktop
- ✅ No horizontal scroll

---

## New Features Tests (Currently Inactive - Will Test After Integration)

These features exist in the codebase but aren't triggered yet:

### Toast Notifications
- **Status**: Component exists, not integrated
- **Will test**: After Game.tsx integration

### Celebration Modal
- **Status**: Component exists, not integrated
- **Will test**: After Game.tsx integration (scenario 3)

### Badge Components
- **Status**: Component exists, not integrated
- **Will test**: After InvestorVector.tsx integration

### Mobile Vector Notification Dot (Feature 16)
**Test on mobile only (< 1024px):**
- [ ] Open Chrome DevTools → Toggle Device Toolbar (Ctrl+Shift+M)
- [ ] Select iPhone 12 Pro or similar mobile device
- [ ] Complete intake form and start game
- [ ] Submit first scenario → Check for toast (Feature 1)
- [ ] Verify you're on "Investment Scenario" tab
- [ ] Submit second scenario
- [ ] **Notification dot should appear** on "Your Decision Vector" tab
- [ ] Dot is positioned correctly (top-right of tab button)
- [ ] Dot pulses smoothly with animation
- [ ] Dot color is primary purple (#7B61FF)
- [ ] Click "Your Decision Vector" tab → Dot disappears immediately
- [ ] Switch back to "Investment Scenario" tab
- [ ] Submit third scenario → Dot reappears
- [ ] Wait 5 seconds without clicking → Dot auto-dismisses
- [ ] **No dot appears on desktop** (≥ 1024px width)
- [ ] Feature flag toggle works correctly (`showMobileVectorNotificationDot` in config)

---

## CSS Animation Tests

### Accessibility Check
**Test Steps:**
1. Open browser DevTools
2. Open Settings → Rendering
3. Enable "Emulate CSS media feature prefers-reduced-motion"
4. Refresh the page

**Expected:**
- ✅ All animations should be disabled
- ✅ Progress bar still functions but without transitions
- ✅ No motion sickness triggers

---

## Browser Compatibility

### Recommended Test Browsers:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (if on Mac)

### Mobile Testing:
**Option 1: Browser DevTools**
1. Open Chrome DevTools (F12)
2. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Select device: iPhone 12 Pro, iPad, etc.
4. Test all flows

**Option 2: Real Device**
1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Access from phone: `http://[YOUR_IP]:3001/`
3. Test all flows

---

## Known Issues to Watch For

### Potential Issues (Should NOT occur):
- ❌ Progress bar not showing milestone circles
- ❌ TypeScript errors in console
- ❌ Layout shifts or broken responsive design
- ❌ Can't submit decisions
- ❌ Text/Audio toggles not working
- ❌ Skip checkbox not working
- ❌ Vector panel not updating after decisions

### If You Encounter Issues:
1. Check browser console for errors (F12 → Console tab)
2. Check terminal for compilation errors
3. Verify feature flags in `/src/config/engagementFeatures.ts`
4. Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

---

## Performance Checks

### Page Load Times:
- ✅ Landing page: Should load instantly
- ✅ Intake page: Should load instantly
- ✅ Game page: Should load within 1-2 seconds
- ✅ Summary page: Should load within 1-2 seconds

### Animation Performance:
- ✅ Progress bar animation: Smooth 60fps
- ✅ No janky scrolling
- ✅ No layout thrashing

---

## Testing Summary

### Must Pass (Core Functionality):
1. ✅ Intake form works
2. ✅ Geography auto-selects India
3. ✅ Can add custom geographies
4. ✅ Game page loads
5. ✅ Can make decisions (Pass/Invest)
6. ✅ Text/Audio toggles work
7. ✅ Skip checkbox works
8. ✅ Submit decisions successfully
9. ✅ Progress advances through scenarios
10. ✅ Summary page displays after 5 scenarios
11. ✅ "Play Again" works

### New Visual Features to Verify:
1. ✅ Enhanced progress bar displays milestone circles
2. ✅ Current scenario has pulsing purple animation
3. ✅ Connector lines show progress
4. ✅ Progress text shows "X of 5 • Y% revealed"
5. ✅ Responsive on mobile (circles visible)

### Accessibility:
1. ✅ prefers-reduced-motion disables animations
2. ✅ All interactive elements keyboard accessible
3. ✅ Focus states visible

---

## Next Steps After Testing

Once you confirm everything works:
1. Report any bugs or issues found
2. Confirm which features you want to keep/remove
3. I'll integrate the remaining features (toasts, modals, animations)
4. We'll do another round of testing

---

## Quick Test Scenario (5 minutes)

1. ✅ Go to http://localhost:3001/
2. ✅ Click "Get Started" → /intake
3. ✅ Fill form:
   - Sectors: fintech, ai
   - Stage: Seed
   - Geography: India (should be pre-selected)
   - Weights: Leave defaults (they sum to 100%)
4. ✅ Click "Start Playing"
5. ✅ **Check enhanced progress bar** - Should see 5 circles with #1 pulsing purple
6. ✅ Make a decision: Click "Invest"
7. ✅ Click "Text" button
8. ✅ Type: "Interesting founder"
9. ✅ Click "Submit Decision"
10. ✅ **Check progress bar advances** - Should now show scenario 2 of 5 (40% revealed)
11. ✅ Check Decision Vector panel (desktop right side, mobile tab)
12. ✅ Complete all 5 scenarios
13. ✅ Verify Summary page displays

**Total Time**: ~5 minutes
**Result**: If all ✅ pass, implementation is solid and non-breaking!
