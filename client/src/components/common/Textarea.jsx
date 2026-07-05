import React from 'react';

export const Textarea = ({
  label,
  error,
  hint,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        className={`
          w-full px-4 py-3 bg-white dark:bg-dark-200 border rounded-xl
          text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          transition-all duration-200 resize-none
          ${error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-200 dark:border-gray-700'
          }
          ${className}
        `}
        {...props}
      />
      {hint && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{hint}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export const Checkbox = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  className = '',
}) => {
  return (
    <label
      className={`
        flex items-center gap-3 cursor-pointer select-none
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={`
            w-5 h-5 rounded-md border-2 transition-all duration-200
            ${checked
              ? 'bg-primary-600 border-primary-600'
              : 'border-gray-300 dark:border-gray-600'
            }
          `}
        >
          {checked && (
            <svg
              className="w-full h-full text-white p-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
    </label>
  );
};

export const RadioButton = ({
  name,
  value,
  label,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <label
      className={`
        flex items-center gap-3 cursor-pointer select-none
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <div className="relative">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => onChange(value)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={`
            w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center
            ${checked
              ? 'border-primary-600'
              : 'border-gray-300 dark:border-gray-600'
            }
          `}
        >
          {checked && (
            <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />
          )}
        </div>
      </div>
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
    </label>
  );
};

export const Toggle = ({
  enabled,
  onChange,
  label,
  disabled = false,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: { wrapper: 'w-9 h-5', dot: 'w-4 h-4', translate: 'translate-x-4' },
    md: { wrapper: 'w-11 h-6', dot: 'w-5 h-5', translate: 'translate-x-5' },
  };

  return (
    <label
      className={`
        flex items-center gap-3 cursor-pointer select-none
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={`
            ${sizeClasses[size].wrapper}
            rounded-full transition-all duration-200
            ${enabled
              ? 'bg-primary-600'
              : 'bg-gray-200 dark:bg-dark-100'
            }
          `}
        >
          <div
            className={`
              ${sizeClasses[size].dot}
              absolute top-0.5 left-0.5 bg-white rounded-full shadow transition-all duration-200
              ${enabled ? sizeClasses[size].translate : 'translate-x-0'}
            `}
          />
        </div>
      </div>
      {label && (
        <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
      )}
    </label>
  );
};
