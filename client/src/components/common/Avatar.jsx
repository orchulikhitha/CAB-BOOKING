import React from 'react';
import { FiUser } from 'react-icons/fi';

export const Avatar = ({
  src,
  alt = 'Avatar',
  size = 'md',
  status,
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-8 h-8 text-xs',
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-xl',
  };

  const statusSizes = {
    xs: 'w-2 h-2',
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-yellow-500',
  };

  return (
    <div className={`relative inline-flex ${className}`}>
      <div
        className={`
          rounded-full flex items-center justify-center overflow-hidden
          bg-gray-100 dark:bg-dark-100
          ${sizeClasses[size]}
        `}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '';
            }}
          />
        ) : (
          <FiUser className="w-1/2 h-1/2 text-gray-400" />
        )}
      </div>
      {status && (
        <span
          className={`
            absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-dark-200
            ${statusSizes[size]} ${statusColors[status]}
          `}
        />
      )}
    </div>
  );
};

export const AvatarGroup = ({ avatars, max = 4, size = 'sm' }) => {
  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
  };

  const displayAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className="flex -space-x-2">
      {displayAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          src={avatar.src}
          alt={avatar.alt}
          size={size}
          className="ring-2 ring-white dark:ring-dark-200"
        />
      ))}
      {remaining > 0 && (
        <div
          className={`
            rounded-full flex items-center justify-center
            bg-gray-200 dark:bg-dark-100 ring-2 ring-white dark:ring-dark-200
            ${sizeClasses[size]}
          `}
        >
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            +{remaining}
          </span>
        </div>
      )}
    </div>
  );
};
