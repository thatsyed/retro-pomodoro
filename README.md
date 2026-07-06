# Cozy Retro Pomodoro

A beautiful, lightweight, and offline-ready Pomodoro timer web application featuring an 8-bit handheld gaming console / desktop widget aesthetic.

![Cozy Retro Pomodoro Vibe](https://raw.githubusercontent.com/thatsyed/retro-pomodoro/main/docs/assets/preview-placeholder.png) <!-- Replace with actual screenshot when available -->

## ☕ Features

- **Cozy Retro Design**: Tactile clicky buttons, checkerboard wallpaper, and a warm cream-beige console interface.
- **Visual Cozy Sprite**: A steaming coffee mug SVG that bubbles and bounces dynamically during active work sessions.
- **Precision Timing**: Uses system delta-timestamp tracking to calculate exact durations, preventing background tab timer drift.
- **Synthesized 8-Bit Audio Alerts**: 
  - Quick mechanical sound effects on button clicks.
  - An upbeat NES-style melody when a work session finishes.
  - A soft, soothing chime when a break session completes.
- **Local Storage Settings**: Remembers work, short break, and long break intervals, sound toggles, and volume levels.
- **Responsive Layout**: Adapts gracefully to all screen resolutions (desktops, tablets, mobile) and includes scroll support for small devices.
- **Zero API Abuse Risk**: Fully client-side app with programmatic sound generation (no external API key dependencies).

## 📁 File Structure

```text
├── index.html       # Structural layout and SEO meta tags
├── styles.css       # Layout designs, pixel-art styling, and keyframe animations
├── app.js           # Core state management, delta timer, and audio synthesis
├── LICENSE          # MIT Open-Source License
└── README.md        # This project documentation
```

## 🛠️ Tech Stack

- **Core**: Vanilla HTML5, CSS3, ES6+ JavaScript
- **Audio**: Web Audio API (Synthesized Oscillators)
- **Typography**: Google Fonts (`VT323` and `Courier Prime`)

## 🚀 Setup & Deployment

Since this is a fully static client-side application, there is no build step or package server required:

### Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/thatsyed/retro-pomodoro.git
   ```
2. Open `index.html` directly in your favorite web browser!

### Deploy Online
You can deploy this folder directly to any static web hosting service for free:
- **GitHub Pages**: Go to Repository Settings -> Pages, select the `main` branch, and save.
- **Vercel** / **Netlify**: Link the repository and trigger build (zero configuration needed).

## 📄 License

This project is licensed under the [MIT License](LICENSE).
