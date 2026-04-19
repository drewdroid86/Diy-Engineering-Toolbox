import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock the components that use DeviceOrientationEvent as it's not fully supported in jsdom
vi.mock('./components/tools/BubbleLevel', () => ({
  default: () => <div data-testid="bubble-level">Professional Level</div>
}));
vi.mock('./components/tools/Ruler', () => ({
  default: () => <div data-testid="ruler">Digital Ruler</div>
}));
vi.mock('./components/tools/AngleModule', () => ({
  default: () => <div data-testid="angle-module">Angle Module</div>
}));
vi.mock('./components/tools/Flashlight', () => ({
  default: () => <div data-testid="flashlight">Flashlight Module</div>
}));
vi.mock('./components/tools/Calculators', () => ({
  default: () => <div data-testid="calculators">Torque Calculator</div>
}));

describe('App Component', () => {
  it('renders BubbleLevel by default', () => {
    render(<App />);
    expect(screen.getByTestId('bubble-level')).toBeInTheDocument();
  });

  it('switches to Ruler view when Ruler is clicked in navigation', () => {
    render(<App />);
    const rulerButton = screen.getByRole('button', { name: /ruler/i });
    fireEvent.click(rulerButton);
    expect(screen.getByTestId('ruler')).toBeInTheDocument();
    expect(screen.queryByTestId('bubble-level')).not.toBeInTheDocument();
  });

  it('switches to Angle view when Angle is clicked in navigation', () => {
    render(<App />);
    const angleButton = screen.getByRole('button', { name: /angle/i });
    fireEvent.click(angleButton);
    expect(screen.getByTestId('angle-module')).toBeInTheDocument();
  });

  it('switches to Light view when Light is clicked in navigation', () => {
    render(<App />);
    const lightButton = screen.getByRole('button', { name: /light/i });
    fireEvent.click(lightButton);
    expect(screen.getByTestId('flashlight')).toBeInTheDocument();
  });

  it('switches to Calc view when Calc is clicked in navigation', () => {
    render(<App />);
    const calcButton = screen.getByRole('button', { name: /calc/i });
    fireEvent.click(calcButton);
    expect(screen.getByTestId('calculators')).toBeInTheDocument();
  });
});
