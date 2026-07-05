import React from 'react';
import { Users, Clock, IndianRupee } from 'lucide-react';
import { Card } from '../common/Card';
import { PriceTag, Rating } from '../common/PriceTag';

export const CabCard = ({
  type,
  name,
  capacity,
  price,
  eta,
  rating,
  image,
  features,
  selected,
  onSelect,
}) => {
  const typeColors = {
    mini: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    sedan: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    suv: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    luxury: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  };

  return (
    <Card
      padding="none"
      onClick={onSelect}
      hover
      className={`overflow-hidden transition-all duration-300 cursor-pointer ${
        selected
          ? 'ring-2 ring-primary-500 shadow-lg -translate-y-1'
          : 'hover:shadow-card-hover'
      }`}
    >
      {/* Image Section */}
      <div className="relative h-40 bg-gray-100 dark:bg-dark-100 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = `https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800`;
          }}
        />
        <div
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold capitalize ${typeColors[type]}`}
        >
          {type}
        </div>
        {selected && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
            <Rating value={rating} size="sm" showValue reviewsCount={120} />
          </div>
          <div className="text-right">
            <PriceTag amount={price} size="md" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">estimated fare</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{capacity} seats</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{eta} min away</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-dark-100 text-gray-600 dark:text-gray-400"
            >
              {feature}
            </span>
          ))}
          {features.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-dark-100 text-gray-600 dark:text-gray-400">
              +{features.length - 3} more
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export const CabCardLarge = ({
  name,
  type,
  capacity,
  price,
  eta,
  rating,
  image,
  features,
  baseFare,
  perKmRate,
  perMinuteRate,
}) => {
  return (
    <Card padding="none" className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/3 h-48 md:h-auto relative bg-gray-100 dark:bg-dark-100">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 capitalize">
                  {type}
                </span>
              </div>
              <Rating value={rating} size="md" showValue reviewsCount={458} />
            </div>
            <div className="text-right">
              <PriceTag amount={price} size="lg" />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Starting price</p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">Capacity</span>
              <span className="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                <Users className="w-4 h-4" />
                {capacity} passengers
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">ETA</span>
              <span className="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                <Clock className="w-4 h-4" />
                {eta} mins
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">Base Fare</span>
              <span className="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                <IndianRupee className="w-4 h-4" />
                {baseFare}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">Per Km</span>
              <span className="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                <IndianRupee className="w-4 h-4" />
                {perKmRate}
              </span>
            </div>
          </div>

          {/* Features Chips */}
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Features</p>
            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-dark-100 text-gray-700 dark:text-gray-300"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
