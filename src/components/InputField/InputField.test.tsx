import { render, screen, fireEvent } from '@testing-library/react';
import InputField from './InputField';

describe('InputField', () => {
  test('renders with label', () => {
    render(<InputField label="Test Label" />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  test('handles input change', () => {
    const handleChange = jest.fn();
    render(<InputField label="Test Input" onChange={handleChange} />);
    
    const input = screen.getByLabelText('Test Input');
    fireEvent.change(input, { target: { value: 'test value' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('displays error message when invalid', () => {
    render(
      <InputField
        label="Test Input"
        invalid
        errorMessage="Error message"
      />
    );
    
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Input')).toHaveAttribute('aria-invalid', 'true');
  });

  test('disables input when disabled prop is true', () => {
    render(<InputField label="Test Input" disabled />);
    expect(screen.getByLabelText('Test Input')).toBeDisabled();
  });

  test('clears input when clear button is clicked', () => {
    const handleChange = jest.fn();
    render(
      <InputField
        label="Test Input"
        value="test value"
        showClearButton
        onChange={handleChange}
      />
    );
    
    const clearButton = screen.getByLabelText('Clear input');
    fireEvent.click(clearButton);
    
    expect(handleChange).toHaveBeenCalled();
  });
});