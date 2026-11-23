# MarketMind AI (Mastermind) — Autonomous Marketing Workspace

> Autonomous AI Marketing Platform for multi-channel strategy, multi-agent fleet delegation, content generation, competitor research, and publishing.

**Live Deployment (Render):** [https://marketmind-ai-bhargavi-2026.onrender.com/](https://marketmind-ai-bhargavi-2026.onrender.com/)

---

## Architecture Overview

This project consists of two core layers:

1. **Web Application (`src/`, `api/`)**:
   - Modern React 19 + TypeScript + Vite + Tailwind CSS.
   - Autonomous AI workforce fleet: CEO Orchestration Workspace, Tasks Matrix, Agent Directory, Content Generator (powered by Gemini Flash), SEO Center, and Publishing Pipeline.
   - Fully responsive on both desktop and mobile viewports with an off-canvas drawer and a native-style bottom navigation bar.

2. **Mobile Application (`mobile/`)**:
   - Cross-platform Android application powered by Flutter.
   - Zero-lag WebView architecture integrated with native Android hardware acceleration (`android:hardwareAccelerated="true"`).
   - Built-in edge-to-edge system chrome, native back gesture navigation (`PopScope`), non-blocking animated top progress bar, offline/server-sleep resilience, and dynamic mobile layout adaptation.

---

## Pre-Built Release APKs

For quick testing on physical Android devices, compiled release APK binaries are located in the [`apks/`](./apks/) directory:

| Architecture | File | Recommended Use |
| :--- | :--- | :--- |
| **arm64-v8a** | [`apks/app-arm64-v8a-release.apk`](./apks/app-arm64-v8a-release.apk) | **Recommended**: Modern Android smartphones (Lowest latency, fastest cold launch) |
| **Universal** | [`apks/app-release.apk`](./apks/app-release.apk) | All Android CPU architectures |
| **armeabi-v7a** | [`apks/app-armeabi-v7a-release.apk`](./apks/app-armeabi-v7a-release.apk) | Older 32-bit Android phones |
| **x86_64** | [`apks/app-x86_64-release.apk`](./apks/app-x86_64-release.apk) | Android Emulators & Chromebooks |

---

## Getting Started

### 1. Web Application Setup

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your GEMINI_API_KEY and database credentials

# Run development server
npm run dev

# Build for production
npm run build
```

### 2. Flutter Mobile Setup

```bash
cd mobile

# Get Flutter dependencies
flutter pub get

# Run on connected Android device or emulator
flutter run

# Build Release APK
flutter build apk --release --split-per-abi
```

---

## Environment Variables

Refer to `.env.example`:
* `GEMINI_API_KEY`: API key for Gemini AI calls.
* `POSTGRES_URL`: PostgreSQL connection string (Neon / Supabase / Vercel Postgres).
* `JWT_SECRET`: Secret key for JWT session authentication.
* `CRON_SECRET`: Verification secret for background cron endpoints.

---

## Project Structure

```text
├── api/                  # Serverless API routes (AI generation, agents, auth, tasks, tools)
├── apks/                 # Pre-built release Android APK binaries
├── mobile/               # Flutter mobile application
│   ├── android/          # Android native project config, Gradle, AndroidManifest
│   └── lib/
│       └── main.dart     # WebView controller, native gestures, mobile optimizations
├── public/               # Public assets
├── src/                  # React application frontend
│   ├── components/       # Views: CEO Workspace, Tasks, Fleet, Generator, Header, Sidebar
│   ├── data/             # Initial datasets and templates
│   ├── services/         # State management & Agent Store
│   └── types/            # TypeScript type definitions
├── index.html            # HTML entry point with mobile viewport config
├── package.json          # Node dependencies and scripts
└── vite.config.ts        # Vite build configuration
```
