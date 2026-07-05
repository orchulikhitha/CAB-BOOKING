import React, { useState, useCallback } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

export const SearchBar = ({
  placeholder = 'Search...',
  onSearch,
  className = '',
  size = 'md',
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(
    (value) => {
      onSearch(value);
    },
    [onSearch]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    handleSearch('');
  };

  const sizeClasses = {
    sm: 'py-2 pl-10 pr-10 text-sm',
    md: 'py-3 pl-12 pr-12',
    lg: 'py-4 pl-14 pr-14 text-lg',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const leftIconPosition = {
    sm: 'left-3',
    md: 'left-4',
    lg: 'left-5',
  };

  const rightIconPosition = {
    sm: 'right-3',
    md: 'right-4',
    lg: 'right-5',
  };

  return (
    <div className={`relative ${className}`}>
      <FiSearch
        className={`absolute ${leftIconPosition[size]} top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 ${iconSizeClasses[size]}`}
      />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className={`
          w-full ${sizeClasses[size]}
          bg-white dark:bg-dark-200 border border-gray-200 dark:border-gray-700 rounded-xl
          text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          transition-all duration-200
        `}
      />
      {query && (
        <button
          onClick={handleClear}
          className={`absolute ${rightIconPosition[size]} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300`}
        >
          <FiX className={iconSizeClasses[size]} />
        </button>
      )}
    </div>
  );
};

export const FilterButton = ({ active = false, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200
        ${
          active
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 dark:bg-dark-100 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-300'
        }
      `}
    >
      {children}
    </button>
  );
};

export const FilterGroup = ({ children, label }) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
};
