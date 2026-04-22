# DIY Engineering Toolbox

A modern, high-performance React + Vite toolbox for common engineering calculations, featuring persistent storage, live data integration, and an integrated AI assistant.

## Overview

DIY Engineering Toolbox provides a comprehensive suite of essential utilities for engineers, hobbyists, and makers in a polished, responsive single-page application. Optimized for mobile use with a native-app feel.

### Key Tools
- **Electrical:** Ohm's Law, Resistor Color Code, PWM Calculator, RC Charge Time, Wire Gauge.
- **Mechanical:** Bolt Torque, Gear Ratio, RPM & Speed, Spring Rate.
- **Civil (NEW):** Concrete Volume, Slope Grade, Rebar Weight, Flow Rate, **Beam Load**, **Pipe Friction**, **Asphalt Tonnage**, **Soil Bearing Capacity**.
- **Financial (UPGRADED):** **Comprehensive Invoicing System**, Loan Calculator, Compound Interest, ROI, Break Even.
- **Dev & Termux:** **Advanced Termux Cheatsheet**, JSON Formatter, Regex Tester, JWT Decoder, Unix Timestamp, chmod Calculator.
- **General:** **Precision Level Tool (Inclinometer & Bubble)**, Unit Converter, Stopwatch, Flashlight.
- **AI Assistant:** Gemini Engineering Assistant for complex formulas and material science.

### Tech Stack
- **Framework:** React 18 (TypeScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4.0
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **AI:** Google Gemini SDK (@google/genai)
- **Persistence:** LocalStorage with custom hooks & automatic data migration

## New Features (v1.1.0 "Upgrade Core")

- **Live Data Integration:** Fetch real-time currency exchange rates and LLM API pricing (supports Frankfurter and OpenRouter).
- **Comprehensive Invoicing:** Manage clients, create itemized invoices, and export to PDF directly from the browser.
- **Hardware-Grade Level Tool:** 3-axis sensor support with digital calibration for high-precision surface leveling.
- **Termux Reference Guide:** Updated for Android 10-14+, including Phantom Process Killer fixes and PRoot/GUI installation guides.
- **API Key Management:** Securely store your own API keys in Settings to enable premium live data features.

## Getting Started

### Prerequisites

- Node.js (18.x or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/drewdroid86/Diy-Engineering-Toolbox.git
   cd Diy-Engineering-Toolbox
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

Create a `.env` file in the project root and add your Gemini API key:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

> **Note:** The AI Assistant requires a valid Google Gemini API key. Additional API keys (OpenRouter, etc.) can be configured directly in the app's **Settings** page.

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Project Structure

```text
src/
├── components/      # Reusable UI components
│   └── tools/       # 50+ Specialized Engineering Calculators
├── hooks/           # Custom React hooks (usePersistence, useChat, etc.)
├── views/           # Main application views (Home, ToolDetail, Settings)
├── data.ts          # Centralized tool definitions and metadata
├── types.ts         # TypeScript interfaces and types
├── App.tsx          # Main application logic and state management
└── main.tsx         # Entry point
```

## Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Compiles the application for production.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Runs ESLint for code quality checks.
- `npm test`: Executes the test suite using Vitest.

## License

MIT
