import React from 'react';
import { FiCheck } from 'react-icons/fi';

export const Stepper = ({
  steps,
  currentStep,
  orientation = 'horizontal',
  className = '',
}) => {
  if (orientation === 'vertical') {
    return (
      <div className={`flex flex-col gap-0 ${className}`}>
        {steps.map((step, index) => (
          <div key={index} className="flex">
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                  transition-all duration-300
                  ${
                    index < currentStep
                      ? 'bg-green-500 text-white'
                      : index === currentStep
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-dark-100 text-gray-500 dark:text-gray-400'
                  }
                `}
              >
                {index < currentStep ? (
                  <FiCheck className="w-5 h-5" />
                ) : step.icon ? (
                  step.icon
                ) : (
                  index + 1
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`
                    w-0.5 h-16 transition-colors
                    ${index < currentStep ? 'bg-green-500' : 'bg-gray-200 dark:bg-dark-100'}
                  `}
                />
              )}
            </div>
            <div className="ml-4 pb-8">
              <h4
                className={`
                  font-semibold mb-1
                  ${
                    index <= currentStep
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400'
                  }
                `}
              >
                {step.title}
              </h4>
              {step.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                  transition-all duration-300 z-10
                  ${
                    index < currentStep
                      ? 'bg-green-500 text-white'
                      : index === currentStep
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-dark-100 text-gray-500 dark:text-gray-400'
                  }
                `}
              >
                {index < currentStep ? (
                  <FiCheck className="w-5 h-5" />
                ) : step.icon ? (
                  step.icon
                ) : (
                  index + 1
                )}
              </div>
              <div className="mt-3 text-center">
                <h4
                  className={`
                    text-sm font-semibold
                    ${
                      index <= currentStep
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-500 dark:text-gray-400'
                    }
                  `}
                >
                  {step.title}
                </h4>
                {step.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 hidden md:block">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`
                  flex-1 h-0.5 mx-2 mb-8 transition-colors
                  ${index < currentStep ? 'bg-green-500' : 'bg-gray-200 dark:bg-dark-100'}
                `}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Ride Status Stepper specifically for booking tracking
export const RideStatusStepper = ({ status }) => {
  const statusSteps = [
    { title: 'Booked', description: 'Ride confirmed' },
    { title: 'Driver Assigned', description: 'Driver on the way' },
    { title: 'Arrived', description: 'Driver at pickup' },
    { title: 'Trip Started', description: 'On the way to destination' },
    { title: 'Completed', description: 'Trip ended' },
  ];

  const getStepIndex = (currentStatus) => {
    switch (currentStatus) {
      case 'pending':
      case 'confirmed':
        return 0;
      case 'driver_assigned':
      case 'driver_arriving':
        return 1;
      case 'arrived':
        return 2;
      case 'trip_started':
      case 'in_progress':
        return 3;
      case 'completed':
        return 4;
      case 'cancelled':
        return -1;
      default:
        return 0;
    }
  };

  const currentStepIndex = getStepIndex(status);

  if (status === 'cancelled') {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 text-center">
        <p className="text-red-600 dark:text-red-400 font-semibold">
          Ride Cancelled
        </p>
      </div>
    );
  }

  return (
    <Stepper steps={statusSteps} currentStep={currentStepIndex} />
  );
};
