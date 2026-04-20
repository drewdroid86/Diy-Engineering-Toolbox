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
    id: 'pressure-calc', 
    name: 'RPM & Speed', 
    description: 'Vehicle & Pulley RPM calc', 
    longDescription: 'A dual-mode rotation calculator. Switch between Vehicle mode to calculate engine RPM from speed and tire size, or Pulley mode to determine output speeds in belt-driven systems.',
    icon: '⏲️', 
    color: '#00e5ff', 
    category: 'Mechanical' 
  },
  { 
    id: 'beam-deflection', 
    name: 'Spring Rate', 
    description: 'Coil spring force constant', 
    longDescription: 'Determine the stiffness of a compression spring based on its physical geometry. Uses the standard helical spring rate formula considering wire diameter, coil diameter, and active coil count.',
    icon: '🌀', 
    color: '#00e5ff', 
    category: 'Mechanical' 
  },

  // Civil
  { 
    id: 'concrete-mix', 
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
    id: 'c3', 
    name: 'Rebar Weight', 
    description: 'Length to mass converter', 
    longDescription: 'Calculate the total weight of steel reinforcement bars. Select standard rebar sizes and input lengths to get weight estimates in pounds or kilograms for structural planning.',
    icon: '🔗', 
    color: '#795548', 
    category: 'Civil' 
  },
  { 
    id: 'c4', 
    name: 'Flow Rate', 
    description: 'Pipe capacity & velocity', 
    longDescription: 'Hydraulic calculator for determining pipe flow characteristics. Estimate water velocity and volumetric flow rate based on pipe diameter and pressure gradients or gravity fall.',
    icon: '🌊', 
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
    id: 'miter-cut', 
    name: 'Finish Coverage', 
    description: 'Paint & stain quantity estimator', 
    longDescription: 'Calculate the amount of finish needed for a woodworking project. Considers surface area, coverage rate of the product, and number of coats to estimate total gallons and material cost.',
    icon: '🎨', 
    color: '#00e5ff', 
    category: 'Woodworking' 
  },
  { 
    id: 'screw-pilot', 
    name: 'Dovetail Angle', 
    description: 'Ratio & pitch reference', 
    longDescription: 'A guide for classic joinery layout. Select standard ratios for softwoods, hardwoods, or exotic dense woods to find the correct marking angle and understand the mechanical benefits of each.',
    icon: '📐', 
    color: '#00e5ff', 
    category: 'Woodworking' 
  },
  { 
    id: 'w4', 
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
    id: 'regex-tester', 
    name: 'JSON Formatter', 
    description: 'Format & validate JSON', 
    longDescription: 'A developer utility to beautify and validate JSON structures. Includes automatic indentation, syntax highlighting for keys and values, and descriptive error reporting for malformed data.',
    icon: 'JSON', 
    color: '#00e5ff', 
    category: 'Dev' 
  },
  { 
    id: 'jwt-decoder', 
    name: 'Regex Tester', 
    description: 'Pattern matching & capture', 
    longDescription: 'Test regular expressions against target strings in real-time. Features flag selection (g, i, m, s), inline match highlighting, and a detailed breakdown of all captured groups.',
    icon: '.*', 
    color: '#00e5ff', 
    category: 'Dev' 
  },
  { 
    id: 'crontab-guide', 
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
    id: 'model-compare', 
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

  // AI/ML
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
    id: 'prompt-optimizer', 
    name: 'Prompt Cost', 
    description: 'Estimate LLM API costs', 
    longDescription: 'Calculate the expected cost of an LLM request across different providers. Select latest models from OpenAI, Anthropic, or Google and input token counts to see per-request price estimates.',
    icon: '✨', 
    color: '#00e5ff', 
    category: 'AI/ML' 
  },
  { 
    id: 'embedding-view', 
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
    id: 'g1', 
    name: 'Unit Converter', 
    description: 'Length, Mass, Temp', 
    longDescription: 'Quick reference for common unit conversions. Easily switch between metric and imperial systems for distance, weight, and temperature with high-precision results.',
    icon: '⚖️', 
    color: '#ffffff', 
    category: 'General' 
  },
  { 
    id: 'g2', 
    name: 'Level Tool', 
    description: 'Surface inclination', 
    longDescription: 'Digital inclinometer for leveling tasks. Uses the device accelerometer (when available) or manual input to measure surface pitch and alignment for construction or framing.',
    icon: '📏', 
    color: '#ffffff', 
    category: 'General' 
  },
  { 
    id: 'g3', 
    name: 'Stopwatch', 
    description: 'Precision timer', 
    longDescription: 'High-precision engineering stopwatch with lap tracking. Ideal for timing mechanical cycles, process workflows, or structural testing with millisecond accuracy.',
    icon: '⏱️', 
    color: '#ffffff', 
    category: 'General' 
  },
  { 
    id: 'g4', 
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
    id: 'currency-convert',
    name: 'Currency Reference',
    description: 'Approximate exchange rates',
    longDescription: 'A static reference table for major world currencies. Note that these rates are approximate for quick estimation and do not represent live market data.',
    icon: '💵',
    color: '#00e5ff',
    category: 'Financial'
  },
  {
    id: 'invoice-calc',
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
