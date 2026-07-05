import React, { useState } from 'react';

export const Tabs = ({
  tabs,
  defaultTab,
  onChange,
  className = '',
  variant = 'default',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const variantClasses = {
    default: {
      wrapper: 'flex gap-2 p-1 bg-gray-100 dark:bg-dark-300 rounded-xl',
      tab: 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
      active: 'bg-white dark:bg-dark-200 text-primary-600 dark:text-primary-400 shadow',
      inactive: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200',
    },
    pills: {
      wrapper: 'flex gap-4',
      tab: 'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
      active: 'bg-primary-600 text-white',
      inactive: 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-100',
    },
    underline: {
      wrapper: 'flex gap-6 border-b border-gray-200 dark:border-gray-700',
      tab: 'px-1 py-3 text-sm font-medium border-b-2 -mb-px transition-all duration-200',
      active: 'border-primary-600 text-primary-600 dark:text-primary-400',
      inactive: 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
    },
  };

  const styles = variantClasses[variant];

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => !tab.disabled && handleTabChange(tab.id)}
          disabled={tab.disabled}
          className={`
            ${styles.tab}
            ${activeTab === tab.id ? styles.active : styles.inactive}
            ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <span className="flex items-center gap-2">
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`
                  px-2 py-0.5 rounded-full text-xs
                  ${activeTab === tab.id
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                    : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                  }
                `}
              >
                {tab.count}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
};

export const TabPanel = ({ children, className = '' }) => {
  return <div className={`py-4 ${className}`}>{children}</div>;
};
