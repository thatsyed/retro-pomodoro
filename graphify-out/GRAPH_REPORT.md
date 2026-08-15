# Graph Report - retro pomodoro  (2026-08-15)

## Corpus Check
- Corpus is ~5,973 words - fits in a single context window. You may not need a graph.

## Summary
- 50 nodes · 69 edges · 6 communities (4 shown, 2 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.5)
- Token cost: 2,400 input · 1,200 output

## Community Hubs (Navigation)
- UI Controls & DOM Elements
- Timer State & Mode Engine
- Architecture Specs & Design System
- Web Audio Synthesizer
- Settings & Persistence Management
- Documentation & Tally System

## God Nodes (most connected - your core abstractions)
1. `updateDurationFromMode()` - 5 edges
2. `stopTimer()` - 5 edges
3. `handleTimerComplete()` - 5 edges
4. `Retro Pomodoro Design Spec` - 5 edges
5. `updateDisplay()` - 4 edges
6. `switchMode()` - 4 edges
7. `startTimer()` - 4 edges
8. `triggerCompletionAlert()` - 4 edges
9. `loadSettings()` - 3 edges
10. `resetTimer()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `HTML UI Structure` --styles_with--> `Cozy 8-bit Retro Aesthetic`  [EXTRACTED]
  index.html → docs/superpowers/specs/2026-07-06-cozy-pomodoro-design.md
- `Implementation Plan` --implements_spec--> `Retro Pomodoro Design Spec`  [EXTRACTED]
  docs/superpowers/plans/2026-07-06-cozy-pomodoro.md → docs/superpowers/specs/2026-07-06-cozy-pomodoro-design.md

## Import Cycles
- None detected.

## Communities (6 total, 2 thin omitted)

### Community 0 - "UI Controls & DOM Elements"
Cohesion: 0.07
Nodes (24): appState, cozySprite, DEFAULT_SETTINGS, inputLong, inputShort, inputVolume, inputWork, ledIndicator (+16 more)

### Community 1 - "Timer State & Mode Engine"
Cohesion: 0.39
Nodes (8): handleTimerComplete(), resetTimer(), startTimer(), stopTimer(), switchMode(), updateDisplay(), updateDurationFromMode(), updateTallyDots()

### Community 2 - "Architecture Specs & Design System"
Cohesion: 0.29
Nodes (7): AppState Schema, Cozy 8-bit Retro Aesthetic, Delta Timestamp Timer Precision, Web Audio API Retro Synthesizer, Implementation Plan, Retro Pomodoro Design Spec, HTML UI Structure

### Community 3 - "Web Audio Synthesizer"
Cohesion: 0.50
Nodes (4): initAudioContext(), playNote(), triggerClickSound(), triggerCompletionAlert()

## Knowledge Gaps
- **26 isolated node(s):** `ledIndicator`, `modeWorkBtn`, `modeShortBtn`, `modeLongBtn`, `timeDisplay` (+21 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Session Tally System` connect `Documentation & Tally System` to `UI Controls & DOM Elements`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Why does `HTML UI Structure` connect `Architecture Specs & Design System` to `UI Controls & DOM Elements`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **What connects `ledIndicator`, `modeWorkBtn`, `modeShortBtn` to the rest of the system?**
  _26 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI Controls & DOM Elements` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._