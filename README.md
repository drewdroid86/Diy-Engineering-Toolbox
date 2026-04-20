# DIY Engineering Toolbox

A modern, high-performance React + Vite toolbox for common engineering calculations, featuring persistent storage and an integrated AI assistant.

## Overview

DIY Engineering Toolbox provides a suite of essential utilities for engineers, hobbyists, and makers in a polished, responsive single-page application.

### Key Tools
- **Electrical:** Ohm's Law, Resistor Color Code, Voltage Divider, LED Resistor.
- **Mechanical:** Torque Calculator, Gear Ratio.
- **Civil:** Concrete Volume, Slope Calculator.
- **General:** Unit Converter.
- **AI Assistant:** Gemini Engineering Assistant for complex formulas and material science.

### Tech Stack
- **Framework:** React 18 (TypeScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4.0
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **AI:** Google Gemini SDK (@google/genai)
- **Persistence:** LocalStorage with custom hooks

## Features

- **Categorized Browsing:** Quickly find tools via category pills (Electrical, Mechanical, etc.).
- **Smart Search:** Instant filtering of tools by name or description.
- **Pinned Tools:** Save your most-used calculators to the home screen for quick access.
- **View-Based Navigation:** Clean separation between the Home dashboard, detailed Tool views, and Settings.
- **Responsive Design:** Optimized for both mobile and desktop use with a modern "App-like" feel.

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

> **Note:** The AI Assistant requires a valid Google Gemini API key.

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Project Structure

```text
src/
├── components/      # Reusable UI components (BottomNav, SearchBar, ToolCard, etc.)
├── hooks/           # Custom React hooks (usePersistence for LocalStorage)
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
