import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, ArrowRight, ArrowLeft, Car, CreditCard, Wallet, CheckCircle } from 'lucide-react';
import { Card, Button, Loading } from '../../components/common';
import { LocationInput, CabCard, FareSummary } from '../../components/booking';
import { useAuth, useToast } from '../../context';
import { bookingApi, categoryApi } from '../../services/api';

export const BookRidePage = () => {
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    pickupLocation: null,
    dropLocation: null,
    pickupDate: '',
    pickupTime: '',
    cabCategory: null,
    paymentMethod: 'cash',
  });

  const [fareBreakdown, setFareBreakdown] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryApi.getAll();
      setCategories(response.data || []);
    } catch (error) {
      toast.error('Failed to load cab categories');
    } finally {
      setLoading(false);
    }
  };

  const calculateFare = () => {
    if (!formData.pickupLocation || !formData.dropLocation || !formData.cabCategory) return null;

    const baseFare = formData.cabCategory.baseFare || 50;
    const perKmRate = formData.cabCategory.perKmRate || 15;
    const perMinRate = formData.cabCategory.perMinRate || 2;

    const distance = Math.floor(Math.random() * 20) + 5;
    const duration = Math.floor(Math.random() * 30) + 10;

    const distanceFare = distance * perKmRate;
    const timeFare = duration * perMinRate;
    const subtotal = baseFare + distanceFare + timeFare;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax;

    return {
      distance,
      duration,
      baseFare,
      distanceFare,
      timeFare,
      subtotal,
      tax,
      total,
      pickupLocation: formData.pickupLocation,
      dropLocation: formData.dropLocation,
    };
  };

  const handleLocationChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCategorySelect = (category) => {
    setFormData((prev) => ({ ...prev, cabCategory: category }));
  };

  const handlePaymentSelect = (method) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  const validateStep1 = () => {
    if (!formData.pickupLocation) {
      toast.error('Please select pickup location');
      return false;
    }
    if (!formData.dropLocation) {
      toast.error('Please select drop location');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.cabCategory) {
      toast.error('Please select a cab category');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      const fare = calculateFare();
      setFareBreakdown(fare);
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const bookingData = {
        carId: formData.cabCategory?._id,
        pickupLocation: formData.pickupLocation?.address || '',
        dropLocation: formData.dropLocation?.address || '',
        pickupDate: formData.pickupDate ? new Date(formData.pickupDate).toISOString() : new Date().toISOString(),
        totalAmount: fareBreakdown?.total || 0,
      };

      await bookingApi.create(bookingData);
      toast.success('Ride booked successfully!');
      navigate('/bookings');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to book ride';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: 'Location', icon: MapPin },
    { number: 2, title: 'Choose Cab', icon: Car },
    { number: 3, title: 'Confirm', icon: CheckCircle },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loading size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {steps.map((s, index) => {
            const Icon = s.icon;
            const isActive = step === s.number;
            const isCompleted = step > s.number;

            return (
              <React.Fragment key={s.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-primary-600 text-white shadow-lg scale-110'
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 dark:bg-dark-100 text-gray-500'
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      isActive || isCompleted
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-500'
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 w-24 mx-4 rounded transition-all duration-300 ${
                      step > s.number ? 'bg-green-500' : 'bg-gray-200 dark:bg-dark-100'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step 1: Location */}
      {step === 1 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Where would you like to go?
          </h2>

          <div className="space-y-4">
            <LocationInput
              label="Pickup Location"
              placeholder="Enter pickup location"
              value={formData.pickupLocation}
              onChange={(value) => handleLocationChange('pickupLocation', value)}
            />

            <LocationInput
              label="Drop Location"
              placeholder="Where to?"
              value={formData.dropLocation}
              onChange={(value) => handleLocationChange('dropLocation', value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Pickup Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, pickupDate: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-200 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Pickup Time (Optional)
                </label>
                <input
                  type="time"
                  value={formData.pickupTime}
                  onChange={(e) => setFormData((prev) => ({ ...prev, pickupTime: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-200 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button
              variant="primary"
              onClick={handleNext}
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              Choose Cab
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Choose Cab */}
      {step === 2 && (
        <div className="space-y-6">
          <Card className="p-4 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20">
            <div className="flex items-center gap-4">
              <MapPin className="w-5 h-5 text-primary-600" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Route</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formData.pickupLocation?.address} → {formData.dropLocation?.address}
                </p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <CabCard
                key={category._id}
                category={category}
                selected={formData.cabCategory?._id === category._id}
                onClick={() => handleCategorySelect(category)}
              />
            ))}
          </div>

          {categories.length === 0 && (
            <Card className="text-center py-12">
              <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No cab categories available</p>
            </Card>
          )}

          <div className="flex justify-between">
            <Button variant="ghost" onClick={handleBack} icon={<ArrowLeft className="w-5 h-5" />}>
              Back
            </Button>
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!formData.cabCategory}
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Confirm & Pay */}
      {step === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Trip Details
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-1">
                    <MapPin className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pickup</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formData.pickupLocation?.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mt-1">
                    <MapPin className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Drop-off</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formData.dropLocation?.address}
                    </p>
                  </div>
                </div>

                {formData.pickupDate && (
                  <div className="flex items-center gap-3 pt-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <p className="text-gray-700 dark:text-gray-300">
                      {new Date(formData.pickupDate).toLocaleDateString()} at {formData.pickupTime || 'Now'}
                    </p>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Selected Cab
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <Car className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formData.cabCategory?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formData.cabCategory?.description}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Payment Method
              </h3>

              <div className="space-y-3">
                {[
                  { id: 'cash', label: 'Cash', icon: Wallet },
                  { id: 'card', label: 'Card', icon: CreditCard },
                  { id: 'upi', label: 'UPI', icon: Wallet },
                ].map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => handlePaymentSelect(method.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        formData.paymentMethod === method.id
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          formData.paymentMethod === method.id
                            ? 'text-primary-600'
                            : 'text-gray-400'
                        }`}
                      />
                      <span
                        className={`font-medium ${
                          formData.paymentMethod === method.id
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {method.label}
                      </span>
                      {formData.paymentMethod === method.id && (
                        <CheckCircle className="w-5 h-5 text-primary-600 ml-auto" />
                      )}
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>

          <div>
            {fareBreakdown && (
              <FareSummary fare={fareBreakdown} cabCategory={formData.cabCategory} />
            )}

            <div className="mt-6 space-y-3">
              <Button
                variant="primary"
                size="lg"
                block
                loading={submitting}
                onClick={handleSubmit}
              >
                Confirm Booking
              </Button>
              <Button variant="ghost" block onClick={handleBack}>
                Back
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
