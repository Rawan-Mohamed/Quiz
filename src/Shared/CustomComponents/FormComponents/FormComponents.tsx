import React, { useState } from 'react';
import { EyeIcon } from '@heroicons/react/outline';
import { EyeOffIcon } from '@heroicons/react/solid';

// Input Field Component
interface InputFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  autoComplete?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  icon,
  className = '',
  autoComplete,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={`mb-6 ${className}`}>
      <label 
        htmlFor={name} 
        className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2"
      >
        {label}
        {required && <span className="text-error-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="h-5 w-5 text-neutral-400">
              {icon}
            </div>
          </div>
        )}
        
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`
            block w-full px-4 py-3 border rounded-lg transition-all duration-200
            ${icon ? 'pl-10' : 'pl-4'}
            ${type === 'password' ? 'pr-12' : 'pr-4'}
            ${disabled 
              ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 cursor-not-allowed' 
              : 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100'
            }
            ${error 
              ? 'border-error-500 focus:border-error-500 focus:ring-error-500' 
              : isFocused 
                ? 'border-primary-500 focus:border-primary-500 focus:ring-primary-500' 
                : 'border-neutral-300 dark:border-neutral-600'
            }
            focus:outline-none focus:ring-2 focus:ring-opacity-50
            placeholder-neutral-500 dark:placeholder-neutral-400
          `}
        />
        
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5 text-neutral-400 hover:text-neutral-600" />
            ) : (
              <EyeIcon className="h-5 w-5 text-neutral-400 hover:text-neutral-600" />
            )}
          </button>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-error-600 dark:text-error-400 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

// Select Field Component
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectFieldProps {
  label: string;
  name: string;
  options: SelectOption[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  multiple?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  placeholder,
  multiple = false,
  icon,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`mb-6 ${className}`}>
      <label 
        htmlFor={name} 
        className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2"
      >
        {label}
        {required && <span className="text-error-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="h-5 w-5 text-neutral-400">
              {icon}
            </div>
          </div>
        )}
        
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={() => setIsFocused(true)}
          disabled={disabled}
          multiple={multiple}
          className={`
            block w-full px-4 py-3 border rounded-lg transition-all duration-200 appearance-none
            ${icon ? 'pl-10' : 'pl-4'}
            pr-10
            ${disabled 
              ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 cursor-not-allowed' 
              : 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100'
            }
            ${error 
              ? 'border-error-500 focus:border-error-500 focus:ring-error-500' 
              : isFocused 
                ? 'border-primary-500 focus:border-primary-500 focus:ring-primary-500' 
                : 'border-neutral-300 dark:border-neutral-600'
            }
            focus:outline-none focus:ring-2 focus:ring-opacity-50
          `}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-error-600 dark:text-error-400 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

// Textarea Field Component
interface TextareaFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  className?: string;
}

export const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  rows = 4,
  maxLength,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`mb-6 ${className}`}>
      <label 
        htmlFor={name} 
        className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2"
      >
        {label}
        {required && <span className="text-error-500 ml-1">*</span>}
      </label>
      
      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={() => setIsFocused(true)}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className={`
          block w-full px-4 py-3 border rounded-lg transition-all duration-200 resize-none
          ${disabled 
            ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 cursor-not-allowed' 
            : 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100'
          }
          ${error 
            ? 'border-error-500 focus:border-error-500 focus:ring-error-500' 
            : isFocused 
              ? 'border-primary-500 focus:border-primary-500 focus:ring-primary-500' 
              : 'border-neutral-300 dark:border-neutral-600'
          }
          focus:outline-none focus:ring-2 focus:ring-opacity-50
          placeholder-neutral-500 dark:placeholder-neutral-400
        `}
      />
      
      {maxLength && (
        <div className="mt-1 text-xs text-neutral-500 text-right">
          {value?.length || 0} / {maxLength}
        </div>
      )}
      
      {error && (
        <p className="mt-2 text-sm text-error-600 dark:text-error-400 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

// Checkbox Field Component
interface CheckboxFieldProps {
  label: string;
  name: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  name,
  checked,
  onChange,
  error,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`
            h-4 w-4 rounded border-neutral-300 text-primary-600 
            focus:ring-primary-500 focus:ring-2
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        />
        <span className="ml-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </span>
      </label>
      
      {error && (
        <p className="mt-1 text-sm text-error-600 dark:text-error-400">
          {error}
        </p>
      )}
    </div>
  );
};

// Radio Group Component
interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  label: string;
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  error,
  required = false,
  className = '',
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
        {label}
        {required && <span className="text-error-500 ml-1">*</span>}
      </label>
      
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              disabled={option.disabled}
              className="h-4 w-4 border-neutral-300 text-primary-600 focus:ring-primary-500 focus:ring-2"
            />
            <span className="ml-3 text-sm text-neutral-700 dark:text-neutral-300">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-error-600 dark:text-error-400">
          {error}
        </p>
      )}
    </div>
  );
};

// Form Container Component
interface FormContainerProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  onSubmit,
  className = '',
}) => {
  return (
    <form 
      onSubmit={onSubmit}
      className={`space-y-6 ${className}`}
    >
      {children}
    </form>
  );
};

// Form Section Component
interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  className = '',
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      {title && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

// Common Icons for Form Fields
export const FormIcons = {
  user: (
    <svg fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
    </svg>
  ),
  email: (
    <svg fill="currentColor" viewBox="0 0 20 20">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  ),
  lock: (
    <svg fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
  ),
  phone: (
    <svg fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
  ),
  calendar: (
    <svg fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
  ),
  clock: (
    <svg fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
    </svg>
  ),
  tag: (
    <svg fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
  ),
}; 