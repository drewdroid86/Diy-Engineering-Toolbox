# DIY Engineering Toolbox

A lightweight React + Vite toolbox for common engineering calculations and an AI assistant.

## Overview

This project includes useful engineering utilities in a single-page application:

- Ohm's Law Calculator
- Resistor Color Code Reader
- Voltage Divider Calculator
- LED Resistor Calculator
- Torque Calculator
- Gear Ratio Calculator
- Unit Converter
- Concrete Volume Calculator
- Slope Calculator
- Gemini AI Assistant

The app is built with:

- React 19
- Vite
- Tailwind CSS
- Lucide Icons
- Google Gemini GenAI integration

## Features

- Browse tools by category
- Search and pin frequently used calculators
- Switch between tool views
- Ask engineering questions using Gemini Assistant

## Getting Started

### Prerequisites

- Node.js (recommended 18+)
- npm

### Install dependencies

```bash
npm install
```

### Configure environment

Create a `.env.local` or `.env` file in the project root and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> The AI assistant feature requires a valid `GEMINI_API_KEY`.

### Run locally

```bash
npm run dev
```

Open the local server URL shown in the terminal, usually `http://localhost:3000`.

## Build and Preview

Build the production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

- `src/App.tsx` — main application and tool routing
- `src/main.tsx` — app entry point
- `src/lib/gemini.ts` — Gemini API wrapper
- `src/components/` — individual calculator components
- `src/index.css` — global styles
- `vite.config.ts` — Vite configuration

## Notes

- `npm run lint` runs TypeScript type checking
- `npm test` runs Vitest tests

If you want, I can also add a short deployment section for Vercel or Netlify.