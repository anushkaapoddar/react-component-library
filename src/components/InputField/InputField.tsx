import React, { useState, useCallback } from 'react';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: string;
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  showClearButton = false,
  showPasswordToggle = false,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e);
  }, [onChange]);

  const handleClear = useCallback(() => {
    setInputValue('');
    const event = {
      target: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(event);
  }, [onChange]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const isPasswordType = type === 'password';
  const inputType = isPasswordType && showPassword ? 'text' : type;

  const baseClasses = "w-full transition-colors duration-200 focus:outline-none focus:ring-2";
  
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  const variantClasses = {
    filled: "bg-gray-100 border border-transparent focus:ring-blue-500 focus:bg-white",
    outlined: "border border-gray-300 focus:ring-blue-500 focus:border-blue-500",
    ghost: "border border-transparent focus:ring-blue-500 focus:bg-gray-50",
  };

  const stateClasses = disabled 
    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
    : invalid 
    ? "border-red-500 focus:ring-red-500" 
    : "";

  const inputClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${stateClasses}`;

  return (
    <div className="w-full space-y-1">
      {label && (
        <label 
          htmlFor={label} 
          className={`block text-sm font-medium ${
            disabled ? 'text-gray-400' : invalid ? 'text-red-600' : 'text-gray-700'
          }`}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          id={label}
          type={inputType}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          aria-invalid={invalid}
          aria-describedby={helperText || errorMessage ? `${label}-help` : undefined}
        />
        
        {(showClearButton && inputValue && !disabled) && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear input"
          >
            ✕
          </button>
        )}
        
        {(showPasswordToggle && isPasswordType && !disabled) && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? '👁' : '👁‍🗨'}
          </button>
        )}
      </div>
      
      {(helperText || errorMessage) && (
        <p 
          id={`${label}-help`}
          className={`text-xs ${
            invalid ? 'text-red-600' : 'text-gray-500'
          }`}
        >
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;