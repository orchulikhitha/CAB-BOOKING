import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  block = false,
  disabled,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-button hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white shadow-button hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]',
    accent: 'bg-accent-500 hover:bg-accent-600 text-white shadow-button hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-button hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white dark:border-primary-400 dark:text-primary-400',
    ghost: 'hover:bg-gray-100 dark:hover:bg-dark-100 text-gray-700 dark:text-gray-300',
    gradient: 'bg-gradient-primary text-white shadow-button hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5',
  };

  const blockClass = block ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${blockClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};
