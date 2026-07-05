import React, { useState, useRef, useEffect } from 'react';
import { FiMapPin, FiNavigation, FiTarget } from 'react-icons/fi';
import { Card } from '../common/Card';

export const LocationInput = ({
  type,
  value,
  onChange,
  placeholder,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const simulateSuggestions = (searchQuery) => {
    const locations = [
      { place_id: '1', display_name: 'Central Station', lat: 28.6129, lon: 77.2295, address: 'Central Station, New Delhi' },
      { place_id: '2', display_name: 'Airport Terminal 1', lat: 28.5665, lon: 77.1030, address: 'Terminal 1, IGI Airport, New Delhi' },
      { place_id: '3', display_name: 'City Mall', lat: 28.5355, lon: 77.2510, address: 'City Mall, Connaught Place, New Delhi' },
      { place_id: '4', display_name: 'Tech Park', lat: 28.5286, lon: 77.2030, address: 'Tech Park, Cyber City, Gurugram' },
      { place_id: '5', display_name: 'University Campus', lat: 28.5450, lon: 77.1890, address: 'JNU Campus, New Delhi' },
    ];
    return locations.filter(loc =>
      loc.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setQuery(newValue);
    if (newValue.length > 2) {
      const results = simulateSuggestions(newValue);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (suggestion) => {
    setQuery(suggestion.address);
    onChange(suggestion.address, { lat: suggestion.lat, lng: suggestion.lon });
    setSuggestions([]);
    setIsFocused(false);
  };

  const handleClear = () => {
    setQuery('');
    onChange('');
    setSuggestions([]);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const address = 'Current Location';
          setQuery(address);
          onChange(address, coords);
        },
        (error) => {
          console.log('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div
          className={`
            absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center
            ${type === 'pickup' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}
          `}
        >
          {type === 'pickup' ? (
            <div className="w-3 h-3 rounded-full bg-green-500" />
          ) : (
            <FiNavigation className="w-4 h-4 text-red-500" />
          )}
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder || (type === 'pickup' ? 'Enter pickup location' : 'Enter drop location')}
          className={`
            w-full pl-16 pr-12 py-4 bg-white dark:bg-dark-200 border
            ${isFocused
              ? 'border-primary-500 ring-2 ring-primary-500/20'
              : 'border-gray-200 dark:border-gray-700'
            }
            rounded-xl text-gray-900 dark:text-white placeholder-gray-400
            focus:outline-none transition-all duration-200
          `}
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-dark-100 rounded-full"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isFocused && suggestions.length > 0 && (
        <Card padding="none" className="absolute top-full left-0 right-0 mt-2 z-50 max-h-64 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-dark-100 text-left transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-dark-100 flex items-center justify-center">
                <FiMapPin className="w-5 h-5 text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {suggestion.display_name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {suggestion.address}
                </p>
              </div>
            </button>
          ))}
        </Card>
      )}

      {/* Current Location Button (only for pickup) */}
      {type === 'pickup' && isFocused && (
        <button
          onClick={handleUseCurrentLocation}
          className="flex items-center gap-2 w-full px-4 py-3 mt-2 text-sm text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
        >
          <FiTarget className="w-5 h-5" />
          Use current location
        </button>
      )}
    </div>
  );
};

export const RouteVisualization = ({
  pickup,
  drop,
  distance,
  duration,
  className = '',
}) => {
  return (
    <Card className={className}>
      <div className="flex items-start gap-4">
        {/* Route Line */}
        <div className="flex flex-col items-center pt-2">
          <div className="w-4 h-4 rounded-full bg-green-500 ring-4 ring-green-100 dark:ring-green-900/30" />
          <div className="w-0.5 h-12 my-1 bg-gradient-to-b from-green-300 to-red-300" />
          <div className="w-4 h-4 rounded-full bg-red-500 ring-4 ring-red-100 dark:ring-red-900/30" />
        </div>

        {/* Route Info */}
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pickup</p>
            <p className="text-gray-900 dark:text-white font-medium">{pickup.address}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Drop-off</p>
            <p className="text-gray-900 dark:text-white font-medium">{drop.address}</p>
          </div>
        </div>

        {/* Distance/Duration */}
        {(distance || duration) && (
          <div className="text-right">
            {distance && (
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {distance.toFixed(1)} km
              </p>
            )}
            {duration && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round(duration)} mins
              </p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
