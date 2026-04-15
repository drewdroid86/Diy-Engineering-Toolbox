import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Engineer\'s Toolbox App', () => {
  it('renders the app header', () => {
    render(<App />);
    expect(screen.getByText('Engineer\'s Toolbox')).toBeInTheDocument();
  });

  it('can navigate to Torque Calculator and calculate torque', async () => {
    render(<App />);
    
    // Switch to Mechanical category
    const mechanicalBtn = screen.getByText('Mechanical');
    fireEvent.click(mechanicalBtn);
    
    // Click on Torque Calculator
    const torqueBtn = screen.getByText('Torque Calculator');
    fireEvent.click(torqueBtn);
    
    // Check if Torque Calculator is rendered
    expect(screen.getByText('Torque Calculator')).toBeInTheDocument();
    
    // Fill in the form
    const forceInput = screen.getByPlaceholderText('Force (N)');
    const distanceInput = screen.getByPlaceholderText('Distance (m)');
    const angleInput = screen.getByPlaceholderText('Angle (deg, default 90)');
    
    fireEvent.change(forceInput, { target: { value: '10' } });
    fireEvent.change(distanceInput, { target: { value: '2' } });
    fireEvent.change(angleInput, { target: { value: '90' } });
    
    // Click Calculate
    const calculateBtn = screen.getByText('Calculate');
    fireEvent.click(calculateBtn);
    
    // Check result
    expect(screen.getByLabelText('Calculated Result')).toHaveTextContent('Calculated Result: 20.00 Nm');
  });
});
