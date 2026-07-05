import React from 'react';

export const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  className = '',
}) => {
  const variantClasses = {
    primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300',
    success: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300',
    danger: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
    gray: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  };

  const dotColors = {
    primary: 'bg-primary-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
    gray: 'bg-gray-500',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full font-semibold
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {dot && <span className={`w-2 h-2 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};

// Status Badge specifically for booking statuses
export const StatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return { variant: 'warning', label: 'Pending' };
      case 'confirmed':
        return { variant: 'info', label: 'Confirmed' };
      case 'driver_assigned':
        return { variant: 'info', label: 'Driver Assigned' };
      case 'driver_arriving':
        return { variant: 'info', label: 'Driver Arriving' };
      case 'arrived':
        return { variant: 'success', label: 'Arrived' };
      case 'trip_started':
      case 'in_progress':
        return { variant: 'primary', label: 'In Progress' };
      case 'completed':
        return { variant: 'success', label: 'Completed' };
      case 'cancelled':
        return { variant: 'danger', label: 'Cancelled' };
      default:
        return { variant: 'gray', label: status };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge variant={config.variant} dot>
      {config.label}
    </Badge>
  );
};
