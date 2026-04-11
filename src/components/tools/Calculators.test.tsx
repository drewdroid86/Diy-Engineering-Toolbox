import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Calculators from './Calculators';

describe('Calculators Component', () => {
  it('renders correctly', () => {
    render(<Calculators />);
    expect(screen.getByText('Torque Calculator')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Force (N)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Distance (m)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Angle (deg, default 90)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Calculate' })).toBeInTheDocument();
  });

  it('calculates torque correctly at 90 degrees', async () => {
    const user = userEvent.setup();
    render(<Calculators />);

    await user.type(screen.getByPlaceholderText('Force (N)'), '10');
    await user.type(screen.getByPlaceholderText('Distance (m)'), '2');

    // Angle defaults to 90 if not filled or explicitly filled, 10 * 2 * sin(90) = 20
    await user.click(screen.getByRole('button', { name: 'Calculate' }));

    expect(screen.getByText('Calculated Result:')).toBeInTheDocument();
    expect(screen.getByText(/20\.00/)).toBeInTheDocument();
  });

  it('calculates torque correctly at 30 degrees', async () => {
    const user = userEvent.setup();
    render(<Calculators />);

    await user.type(screen.getByPlaceholderText('Force (N)'), '10');
    await user.type(screen.getByPlaceholderText('Distance (m)'), '2');

    // Clear and type new angle
    const angleInput = screen.getByPlaceholderText('Angle (deg, default 90)');
    await user.clear(angleInput);
    await user.type(angleInput, '30');

    // 10 * 2 * sin(30) = 20 * 0.5 = 10
    await user.click(screen.getByRole('button', { name: 'Calculate' }));

    expect(screen.getByText(/10\.00/)).toBeInTheDocument();
  });

  it('calculates torque correctly with 0 distance', async () => {
    const user = userEvent.setup();
    render(<Calculators />);

    await user.type(screen.getByPlaceholderText('Force (N)'), '10');
    await user.type(screen.getByPlaceholderText('Distance (m)'), '0');

    // 10 * 0 * sin(90) = 0
    await user.click(screen.getByRole('button', { name: 'Calculate' }));

    expect(screen.getByText(/0\.00/)).toBeInTheDocument();
  });

  it('calculates torque correctly with 0 force', async () => {
    const user = userEvent.setup();
    render(<Calculators />);

    await user.type(screen.getByPlaceholderText('Force (N)'), '0');
    await user.type(screen.getByPlaceholderText('Distance (m)'), '5');

    // 0 * 5 * sin(90) = 0
    await user.click(screen.getByRole('button', { name: 'Calculate' }));

    expect(screen.getByText(/0\.00/)).toBeInTheDocument();
  });
});
