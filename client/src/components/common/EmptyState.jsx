import React from 'react';
import { FiInbox } from 'react-icons/fi';

export const EmptyState = ({
  icon,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}
    >
      <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-dark-100 flex items-center justify-center mb-4">
        {icon || <FiInbox className="w-10 h-10 text-gray-400" />}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-sm mb-6">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
};

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'An error occurred while loading the data. Please try again.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
        <svg
          className="w-10 h-10 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-center max-w-sm">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export const UnauthorizedState = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="w-32 h-32 mb-8">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full text-gray-300 dark:text-gray-600"
        >
          <circle
            cx="100"
            cy="80"
            r="50"
            fill="currentColor"
            opacity="0.2"
          />
          <rect
            x="50"
            y="140"
            width="100"
            height="60"
            rx="10"
            fill="currentColor"
            opacity="0.2"
          />
          <path
            d="M160 40 L40 160 M40 40 L160 160"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Access Denied
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-8">
        You don't have permission to access this page. Please login with the
        appropriate credentials.
      </p>
      <a
        href="/login"
        className="btn btn-primary"
      >
        Go to Login
      </a>
    </div>
  );
};

export const NotFoundState = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">
          404
        </h1>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-4">
        Page Not Found
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-8">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-4">
        <a href="/" className="btn btn-primary">
          Go Home
        </a>
        <button
          onClick={() => window.history.back()}
          className="btn btn-outline"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};
