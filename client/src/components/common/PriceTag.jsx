import React from 'react';
import { FiStar } from 'react-icons/fi';

export const PriceTag = ({
  amount,
  currency = 'INR',
  className = '',
  size = 'md',
}) => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <span className={`${sizeClasses[size]} font-bold text-gray-900 dark:text-white ${className}`}>
      {formatter.format(amount)}
    </span>
  );
};

export const Rating = ({
  value,
  max = 5,
  size = 'md',
  showValue = false,
  reviewsCount,
  interactive = false,
  onChange,
  className = '',
}) => {
  const [hoverValue, setHoverValue] = React.useState(0);

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const handleClick = (rating) => {
    if (interactive && onChange) {
      onChange(rating);
    }
  };

  const displayValue = hoverValue || value;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex gap-0.5">
        {Array.from({ length: max }).map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= displayValue;

          return (
            <button
              key={index}
              type="button"
              className={`${interactive ? 'cursor-pointer' : 'cursor-default'}`}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => interactive && setHoverValue(starValue)}
              onMouseLeave={() => interactive && setHoverValue(0)}
            >
              <FiStar
                className={`
                  ${sizeClasses[size]} transition-colors
                  ${isFilled
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                  }
                `}
              />
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="ml-1 text-sm font-medium text-gray-600 dark:text-gray-400">
          {value.toFixed(1)}
        </span>
      )}
      {reviewsCount !== undefined && (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          ({reviewsCount})
        </span>
      )}
    </div>
  );
};

export const Progress = ({
  value,
  max = 100,
  size = 'md',
  color = 'primary',
  showLabel = false,
  className = '',
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colorClasses = {
    primary: 'bg-primary-600',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
  };

  return (
    <div className={className}>
      <div
        className={`
          w-full bg-gray-200 dark:bg-dark-100 rounded-full overflow-hidden
          ${sizeClasses[size]}
        `}
      >
        <div
          className={`${colorClasses[color]} h-full rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 text-right">
          {percentage.toFixed(0)}%
        </p>
      )}
    </div>
  );
};
