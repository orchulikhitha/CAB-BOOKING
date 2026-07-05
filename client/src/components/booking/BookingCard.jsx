import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone } from 'react-icons/fi';
import { Card } from '../common/Card';
import { StatusBadge } from '../common/Badge';
import { PriceTag } from '../common/PriceTag';
import { Avatar } from '../common/Avatar';

export const BookingCard = ({
  booking,
  showActions = true,
  onCancel,
  onTrack,
}) => {
  const isCancellable = ['pending', 'confirmed', 'driver_assigned'].includes(booking.status);
  const isTrackable = ['driver_assigned', 'driver_arriving', 'arrived', 'trip_started', 'in_progress'].includes(booking.status);
  const pickupAddress = booking.pickupLocation?.address || booking.pickupLocation || '';
  const dropAddress = booking.dropLocation?.address || booking.dropLocation || '';
  const fareTotal = booking.totalAmount ?? booking.fare?.total ?? 0;

  return (
    <Card className="hover:shadow-card-hover transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Status & Date */}
        <div className="flex items-center gap-3 md:w-24">
          <StatusBadge status={booking.status} />
        </div>

        {/* Route Info */}
        <div className="flex-1">
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400">Pickup</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {pickupAddress}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400">Dropoff</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {dropAddress}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Driver Info (if assigned) */}
        {booking.driver && (
          <div className="flex items-center gap-3 md:w-48">
            <Avatar src={booking.driver.avatar} alt={booking.driver.name} size="sm" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {booking.driver.name}
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <FiPhone className="w-3 h-3" />
                <span>Call Driver</span>
              </div>
            </div>
          </div>
        )}

        {/* Price & Date */}
        <div className="flex flex-col items-end md:w-32">
          <PriceTag amount={fareTotal} size="sm" className="mb-1" />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(booking.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex items-center gap-2 md:w-36">
            {isTrackable && (
              <button
                onClick={onTrack}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Track
              </button>
            )}
            {isCancellable && (
              <button
                onClick={onCancel}
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-100 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
            )}
            <Link
              to={`/bookings/${booking._id}`}
              className="px-4 py-2 bg-gray-100 dark:bg-dark-100 hover:bg-gray-200 dark:hover:bg-dark-100 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors"
            >
              Details
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
};

export const BookingSummary = ({ booking }) => {
  return (
    <Card className="bg-gradient-to-br from-primary-50 to-white dark:from-dark-200 dark:to-dark-300">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <StatusBadge status={booking.status} />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Booking ID: {booking._id?.slice(-8).toUpperCase()}
          </span>
        </div>

        {/* Route */}
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <div className="w-0.5 h-16 bg-gray-200 dark:bg-gray-700" />
            <div className="w-3 h-3 rounded-full bg-red-500" />
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">PICKUP</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {pickupAddress}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">DROP-OFF</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {dropAddress}
              </p>
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Distance</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {booking.distance?.toFixed(1) || '--'} km
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Duration</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {Math.round((booking.duration || 0) / 60)} min
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Fare</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              ₹{booking.fare?.total?.toFixed(2) || '--'}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const FareSummary = ({ fare, className = '' }) => {
  return (
    <Card className={className}>
      <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Fare Breakdown</h4>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Base Fare</span>
          <span className="text-gray-900 dark:text-white font-medium">
            ₹{fare.baseFare?.toFixed(2) || '0.00'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Distance Fare</span>
          <span className="text-gray-900 dark:text-white font-medium">
            ₹{fare.distanceFare?.toFixed(2) || '0.00'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Time Fare</span>
          <span className="text-gray-900 dark:text-white font-medium">
            ₹{fare.timeFare?.toFixed(2) || '0.00'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Tax (GST)</span>
          <span className="text-gray-900 dark:text-white font-medium">
            ₹{fare.tax?.toFixed(2) || '0.00'}
          </span>
        </div>
        {fare.discount && fare.discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-green-600 dark:text-green-400">Discount</span>
            <span className="text-green-600 dark:text-green-400 font-medium">
              -₹{fare.discount.toFixed(2)}
            </span>
          </div>
        )}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-900 dark:text-white">Total</span>
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              ₹{fare.total?.toFixed(2) || '0.00'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
