import { Tool } from './types';

export const TOOLS: Tool[] = [
  // Electrical
  { 
    id: 'ohms-law', 
    name: 'Ohm\'s Law', 
    description: 'Calculate V, I, R, or P', 
    longDescription: 'The fundamental relationship between voltage, current, and resistance. This tool allows you to calculate any of the three values given the other two, and automatically computes the total power output in Watts.',
    icon: '⚡', 
    color: '#00e5ff', 
    category: 'Electrical' 
  },
  { 
    id: 'pwm-calc', 
    name: 'PWM Calculator', 
    description: 'Freq, Duty, Period, T-on/off', 
    longDescription: 'A comprehensive pulse width modulation utility. Calculate period, on-time, and off-time from frequency and duty cycle. Features a real-time morphing waveform visualization to help visualize the signal behavior.',
    icon: '〰️', 
    color: '#00e5ff', 
    category: 'Electrical' 
  },
  { 
    id: 'resistor-code', 
    name: 'Resistor Code', 
    description: 'Color band calculator', 
    longDescription: 'Decode standard 4-band resistor color codes instantly. Select colors for the two significant digits, multiplier, and tolerance to get the final resistance value with an interactive visual preview of the component.',
    icon: '📟', 
    color: '#ff1744', 
    category: 'Electrical' 
  },
  { 
    id: 'capacitor-calc', 
    name: 'RC Charge Time', 
    description: 'RC Time constant & charge curve', 
    longDescription: 'Analyze the charging characteristics of an RC circuit. Calculates the time constant (tau) and provides a detailed breakdown of the voltage percentage at each step (1t through 5t) of the charging curve.',
    icon: '🔋', 
    color: '#00e5ff', 
    category: 'Electrical' 
  },
  { 
    id: 'wire-gauge', 
    name: 'Wire Gauge', 
    description: 'AWG to Diameter & Ampacity', 
    longDescription: 'A reference utility for American Wire Gauge (AWG) standards. Look up wire diameters in millimeters and find recommended maximum ampacity for chassis wiring across the standard 4-26 AWG range.',
    icon: '🧵', 
    color: '#00e5ff', 
    category: 'Electrical' 
  },
  
  // Mechanical
  { 
    id: 'bolt-torque', 
    name: 'Bolt Torque', 
    description: 'Tension calculations', 
    longDescription: 'Calculate torque requirements using force and lever arm distance. Supports multiple output units including N·m, ft·lbf, and in·lbf, featuring a dynamic visual representation of the mechanical system.',
    icon: '🔩', 
    color: '#90a4ae', 
    category: 'Mechanical' 
  },
  { 
    id: 'gear-ratio', 
    name: 'Gear Ratio', 
    description: 'RPM & torque transfer', 
    longDescription: 'Essential tool for drivetrain and transmission design. Calculate the ratio between drive and driven gears, and predict output RPM and torque multiplication based on gear tooth counts.',
    icon: '⚙️', 
    color: '#78909c', 
    category: 'Mechanical' 
  },
  { 
    id: 'rpm-speed', 
    name: 'RPM & Speed', 
    description: 'Vehicle & Pulley RPM calc', 
    longDescription: 'A dual-mode rotation calculator. Switch between Vehicle mode to calculate engine RPM from speed and tire size, or Pulley mode to determine output speeds in belt-driven systems.',
    icon: '⏲️', 
    color: '#00e5ff', 
    category: 'Mechanical' 
  },
  { 
    id: 'spring-rate', 
    name: 'Spring Rate', 
    description: 'Coil spring force constant', 
    longDescription: 'Determine the stiffness of a compression spring based on its physical geometry. Uses the standard helical spring rate formula considering wire diameter, coil diameter, and active coil count.',
    icon: '🌀', 
    color: '#00e5ff', 
    category: 'Mechanical' 
  },

  // Civil
  { 
    id: 'concrete-calc', 
    name: 'Concrete Volume', 
    description: 'Volume & bag count estimator', 
    longDescription: 'Estimate materials for concrete slabs and footings. Input length, width, and depth to calculate the total cubic yardage required and the number of standard 60lb bags needed for the job.',
    icon: '🧱', 
    color: '#00e5ff', 
    category: 'Civil' 
  },
  { 
    id: 'slope-grade', 
    name: 'Slope Grade', 
    description: 'Angle & pitch calculator', 
    longDescription: 'Convert between rise/run, angle in degrees, and percentage grade. Ideal for landscaping, roofing, and accessibility ramp design with a live-updating geometric triangle visualization.',
    icon: '📐', 
    color: '#00e5ff', 
    category: 'Civil' 
  },
  { 
    id: 'rebar-weight', 
    name: 'Rebar Weight', 
    description: 'Length to mass converter', 
    longDescription: 'Calculate the total weight of steel reinforcement bars. Select standard rebar sizes and input lengths to get weight estimates in pounds or kilograms for structural planning.',
    icon: '🔗', 
    color: '#795548', 
    category: 'Civil' 
  },
  { 
    id: 'flow-rate', 
    name: 'Flow Rate', 
    description: 'Pipe capacity & velocity', 
    longDescription: 'Hydraulic calculator for determining pipe flow characteristics. Estimate water velocity and volumetric flow rate based on pipe diameter and pressure gradients or gravity fall.',
    icon: '🌊', 
    color: '#29b6f6', 
    category: 'Civil' 
  },
  { 
    id: 'beam-load', 
    name: 'Beam Load', 
    description: 'Bending & Deflection', 
    longDescription: 'Calculate structural loads, bending moments, and deflection for simple beams. Essential for structural framing and material selection in construction projects.',
    icon: '🏗️', 
    color: '#29b6f6', 
    category: 'Civil' 
  },
  { 
    id: 'pipe-friction', 
    name: 'Pipe Friction', 
    description: 'Hazen-Williams Head Loss', 
    longDescription: 'Calculate pressure drop in pipes due to friction using the Hazen-Williams equation. Supports various pipe materials and diameters for hydraulic systems.',
    icon: '🚰', 
    color: '#29b6f6', 
    category: 'Civil' 
  },
  { 
    id: 'asphalt-volume', 
    name: 'Asphalt Volume', 
    description: 'Paving Tonnage Estimator', 
    longDescription: 'Estimate the amount of asphalt required for a paving project. Calculate total tonnage based on area, desired thickness, and mix density.',
    icon: '🛣️', 
    color: '#29b6f6', 
    category: 'Civil' 
  },
  { 
    id: 'soil-bearing', 
    name: 'Soil Bearing', 
    description: 'Foundation Load Capacity', 
    longDescription: 'Basic estimator for soil bearing capacity and footing design. Helps determine appropriate footing sizes based on soil type and structural loads.',
    icon: '🏜️', 
    color: '#29b6f6', 
    category: 'Civil' 
  },

  // Woodworking
  { 
    id: 'board-foot', 
    name: 'Board Foot', 
    description: 'Lumber volume calculator', 
    longDescription: 'Standard volume calculator for rough-cut lumber. Calculate board feet based on thickness, width, and length, with support for multi-board quantities and isometric visual feedback.',
    icon: '🪵', 
    color: '#00e5ff', 
    category: 'Woodworking' 
  },
  { 
    id: 'finish-coverage', 
    name: 'Finish Coverage', 
    description: 'Paint & stain quantity estimator', 
    longDescription: 'Calculate the amount of finish needed for a woodworking project. Considers surface area, coverage rate of the product, and number of coats to estimate total gallons and material cost.',
    icon: '🎨', 
    color: '#00e5ff', 
    category: 'Woodworking' 
  },
  { 
    id: 'dovetail-angle', 
    name: 'Dovetail Angle', 
    description: 'Ratio & pitch reference', 
    longDescription: 'A guide for classic joinery layout. Select standard ratios for softwoods, hardwoods, or exotic dense woods to find the correct marking angle and understand the mechanical benefits of each.',
    icon: '📐', 
    color: '#00e5ff', 
    category: 'Woodworking' 
  },
  { 
    id: 'shelf-sag', 
    name: 'Shelf Sag', 
    description: 'Sagulator load limit', 
    longDescription: 'Estimate the deflection of a bookshelf under load. Calculate whether your shelf design will sag noticeably based on wood species, span length, thickness, and total weight distribution.',
    icon: '📚', 
    color: '#f57c00', 
    category: 'Woodworking' 
  },

  // Dev
  { 
    id: 'url-encoder', 
    name: 'URL Encoder', 
    description: 'Safe character conversion', 
    longDescription: 'Sanitize strings for use in URLs. Encodes reserved characters into their percent-encoded equivalents or decodes existing URLs with real-time highlighting of modified segments.',
    icon: '🔗', 
    color: '#00e5ff', 
    category: 'Dev' 
  },
  { 
    id: 'json-formatter', 
    name: 'JSON Formatter', 
    description: 'Format & validate JSON', 
    longDescription: 'A developer utility to beautify and validate JSON structures. Includes automatic indentation, syntax highlighting for keys and values, and descriptive error reporting for malformed data.',
    icon: 'JSON', 
    color: '#00e5ff', 
    category: 'Dev' 
  },
  { 
    id: 'regex-tester', 
    name: 'Regex Tester', 
    description: 'Pattern matching & capture', 
    longDescription: 'Test regular expressions against target strings in real-time. Features flag selection (g, i, m, s), inline match highlighting, and a detailed breakdown of all captured groups.',
    icon: '.*', 
    color: '#00e5ff', 
    category: 'Dev' 
  },
  { 
    id: 'timestamp-converter', 
    name: 'Unix Timestamp', 
    description: 'Epoch time converter & reference', 
    longDescription: 'Convert between Unix epoch timestamps and human-readable dates. Features a live-updating system clock and supports multiple formats including UTC, Local, ISO 8601, and relative time.',
    icon: '🕒', 
    color: '#00e5ff', 
    category: 'Dev' 
  },
  { 
    id: 'hash-generator', 
    name: 'Hash Generator', 
    description: 'MD5, SHA-1, SHA-256, SHA-512', 
    longDescription: 'Securely generate cryptographic checksums using the Web Crypto API. Support for MD5, SHA-1, SHA-256, and SHA-512 with a convenient file drop area for hashing large blobs of data locally.',
    icon: '#', 
    color: '#00e5ff', 
    category: 'Dev' 
  },
  { 
    id: 'base64-tool', 
    name: 'Base64 Tool', 
    description: 'String to Base64 converter', 
    longDescription: 'Bidirectional Base64 encoding utility. Quickly convert strings to Base64 data for binary-safe transmission or decode existing payloads with character count tracking and whitespace visualization.',
    icon: '📦', 
    color: '#00e5ff', 
    category: 'Dev' 
  },
  { 
    id: 'chmod-calc', 
    name: 'chmod Calculator', 
    description: 'Unix permissions calculator', 
    longDescription: 'A visual tool for calculating Unix file permissions. Toggle read, write, and execute bits for Owner, Group, and Other users to instantly generate both numeric (e.g., 755) and symbolic (e.g., rwxr-xr-x) notation for the chmod command.',
    icon: '🔒', 
    color: '#00e5ff', 
    category: 'Dev' 
  },
  { 
    id: 'http-status', 
    name: 'HTTP Status Codes', 
    category: 'Dev', 
    description: 'HTTP response code reference', 
    longDescription: 'A complete reference for HTTP response status codes. Quickly look up the meaning of standard codes across Informational (1xx), Success (2xx), Redirection (3xx), Client Error (4xx), and Server Error (5xx) categories.',
    icon: '🌐', 
    color: '#6366f1' 
  },
  { 
    id: 'curl-builder', 
    name: 'cURL Builder', 
    category: 'Dev', 
    description: 'Build curl commands visually', 
    longDescription: 'Generate complex cURL commands through an intuitive interface. Add headers, specify methods (GET, POST, etc.), and include data payloads to get a copy-paste ready command for your terminal.',
    icon: '⚡', 
    color: '#6366f1' 
  },
  { 
    id: 'mime-types', 
    name: 'MIME Types', 
    category: 'Dev', 
    description: 'Content type reference', 
    longDescription: 'Browse common Multipurpose Internet Mail Extensions (MIME) types. Find the correct content-type header for various file extensions including images, application data, text, and video.',
    icon: '📄', 
    color: '#6366f1' 
  },
  { id: "password-gen", name: "Password Generator", category: "Dev", description: "Secure password generator with strength meter", icon: "🔐", color: "#6366f1", longDescription: "Generate strong, secure passwords with customizable length and character types. Includes a real-time strength meter to evaluate the complexity of your generated passwords." },
  { id: "jwt-tool", name: "JWT Decoder", category: "Dev", description: "Decode and inspect JWT tokens", icon: "🔑", color: "#6366f1", longDescription: "Easily decode JSON Web Tokens (JWT) to inspect their header, payload, and signature. Perfect for debugging authentication flows and verifying token claims." },
  { id: "caesar-cipher", name: "Caesar Cipher", category: "Dev", description: "ROT13 and shift cipher encoder", icon: "🔒", color: "#6366f1", longDescription: "A classic substitution cipher tool. Encode or decode text using the Caesar cipher method with adjustable shifts, including the popular ROT13 variant." },
  { id: "color-picker", name: "Color Converter", category: "Dev", description: "HEX, RGB, HSL color converter", icon: "🎨", color: "#6366f1", longDescription: "Convert colors between HEX, RGB, and HSL formats instantly. Features an interactive color preview and easy-copy values for web development." },
  { id: "gradient-gen", name: "Gradient Generator", category: "Dev", description: "CSS gradient builder with preview", icon: "🌈", color: "#6366f1", longDescription: "Create beautiful CSS linear gradients with a live visual preview. Adjust colors and angles, and get the exact CSS code for your project." },
  { id: "text-diff", name: "Text Diff", category: "Dev", description: "Compare two text blocks side by side", icon: "📝", color: "#6366f1", longDescription: "Compare two pieces of text to identify differences. Features a side-by-side view with highlighting for added, removed, and modified segments." },
  { id: "termux-ref", name: "Termux Cheatsheet", category: "Dev", description: "Termux and Android terminal command reference", icon: "📱", color: "#6366f1", longDescription: "A comprehensive reference guide for Termux users. Includes essential commands for package management, file system navigation, development environments, and networking on Android." },

  // AI/ML
  { 
    id: 'gemini-assistant', 
    name: 'Gemini Assistant', 
    description: 'AI Engineering Partner', 
    longDescription: 'A sophisticated AI interface powered by Google\'s latest Gemini models. Designed to help you solve complex multi-step problems, optimize material selections, and debug code snippets within an engineering context.',
    icon: '✨', 
    color: '#00e5ff', 
    category: 'AI/ML' 
  },
  { 
    id: 'token-counter', 
    name: 'Token Counter', 
    description: 'Estimate LLM cost & context', 
    longDescription: 'Analyze prompt length for large language models. Provides live counts of characters, words, and estimated tokens with visual progress indicators for common model context limits.',
    icon: '🪙', 
    color: '#00e5ff', 
    category: 'AI/ML' 
  },
  { 
    id: 'prompt-cost', 
    name: 'Prompt Cost', 
    description: 'Estimate LLM API costs', 
    longDescription: 'Calculate the expected cost of an LLM request across different providers. Select latest models from OpenAI, Anthropic, or Google and input token counts to see per-request price estimates.',
    icon: '✨', 
    color: '#00e5ff', 
    category: 'AI/ML' 
  },
  { 
    id: 'context-window', 
    name: 'Context Windows', 
    description: 'LLM context limits compared', 
    longDescription: 'A comparative reference guide for LLM context window capacities. View a relative bar chart of popular model families and deep-dive into specific details for each provider.',
    icon: '📏', 
    color: '#00e5ff', 
    category: 'AI/ML' 
  },
  { 
    id: 'model-comparison', 
    name: 'Model Comparison', 
    description: 'Major LLM specs compared', 
    longDescription: 'A comprehensive specification table for modern LLMs. Compare context size, pricing, and recommended use cases across high-tier reasoning models and fast edge-optimized variants.',
    icon: '📊', 
    color: '#00e5ff', 
    category: 'AI/ML' 
  },

  // General
  { 
    id: 'unit-converter', 
    name: 'Unit Converter', 
    description: 'Length, Mass, Temp', 
    longDescription: 'Quick reference for common unit conversions. Easily switch between metric and imperial systems for distance, weight, and temperature with high-precision results.',
    icon: '⚖️', 
    color: '#ffffff', 
    category: 'General' 
  },
  { 
    id: 'level-tool', 
    name: 'Level Tool', 
    description: 'Surface inclination', 
    longDescription: 'Digital inclinometer for leveling tasks. Uses the device accelerometer (when available) or manual input to measure surface pitch and alignment for construction or framing.',
    icon: '📏', 
    color: '#ffffff', 
    category: 'General' 
  },
  { 
    id: 'stopwatch', 
    name: 'Stopwatch', 
    description: 'Precision timer', 
    longDescription: 'High-precision engineering stopwatch with lap tracking. Ideal for timing mechanical cycles, process workflows, or structural testing with millisecond accuracy.',
    icon: '⏱️', 
    color: '#ffffff', 
    category: 'General' 
  },
  { 
    id: 'flashlight', 
    name: 'Flashlight', 
    description: 'Screen white-out', 
    longDescription: 'Maximizes screen brightness and fills the display with pure white light. Useful as an emergency inspection lamp or for visual testing in dark environments.',
    icon: '🔦', 
    color: '#ffffff', 
    category: 'General' 
  },

  // Financial
  {
    id: 'loan-calc',
    name: 'Loan Calculator',
    description: 'Mortgage & loan payments',
    longDescription: 'Calculate monthly payments for mortgages or personal loans. Includes a total breakdown of interest paid and a visual amortization chart showing the balance over time.',
    icon: '🏠',
    color: '#00e5ff',
    category: 'Financial'
  },
  {
    id: 'compound-interest',
    name: 'Compound Interest',
    description: 'Wealth growth estimator',
    longDescription: 'Calculate the future value of an investment using compound interest. Visualize wealth accumulation over time with a growth chart showing the effect of different compounding frequencies.',
    icon: '📈',
    color: '#00e5ff',
    category: 'Financial'
  },
  {
    id: 'tip-calc',
    name: 'Tip Calculator',
    description: 'Bill split & gratuity',
    longDescription: 'Quickly calculate tips and split bills between multiple people. Ideal for dining and services, providing a clear breakdown of the total tip and amount per person.',
    icon: '🍽️',
    color: '#00e5ff',
    category: 'Financial'
  },
  {
    id: 'currency-ref',
    name: 'Currency Reference',
    description: 'Approximate exchange rates',
    longDescription: 'A static reference table for major world currencies. Note that these rates are approximate for quick estimation and do not represent live market data.',
    icon: '💵',
    color: '#00e5ff',
    category: 'Financial'
  },
  {
    id: 'invoice-estimator',
    name: 'Invoice Estimator',
    description: 'Hourly rate billing',
    longDescription: 'Create professional billing estimates based on hourly rates. Automatically calculates taxes and discounts to provide a clean itemized preview for clients.',
    icon: '📄',
    color: '#00e5ff',
    category: 'Financial'
  },
  {
    id: 'roi-calc',
    name: 'ROI Calculator',
    description: 'Return on investment',
    longDescription: 'Measure the efficiency of an investment. Calculate the total return percentage, annualized return rate, and absolute profit or loss for any venture.',
    icon: '💰',
    color: '#00e5ff',
    category: 'Financial'
  },
  {
    id: 'budget-split',
    name: 'Budget Splitter',
    description: '50/30/20 rule guide',
    longDescription: 'Apply the classic 50/30/20 budgeting rule to your income. Automatically allocates funds into Needs, Wants, and Savings with an interactive pie chart breakdown.',
    icon: '🥧',
    color: '#00e5ff',
    category: 'Financial'
  },
  {
    id: 'break-even',
    name: 'Break Even',
    description: 'Profitability threshold',
    longDescription: 'Determine the sales volume needed to cover all costs. Calculate the specific number of units and total revenue required to reach a break-even point in business operations.',
    icon: '⚖️',
    color: '#00e5ff',
    category: 'Financial'
  },
];
