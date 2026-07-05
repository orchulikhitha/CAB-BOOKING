import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Clock, DollarSign, Star, MapPin, Users, TrendingUp, CheckCircle, XCircle, Navigation, Bell } from 'lucide-react';
import { Card, Button, StatCard, Badge, StatusBadge, Avatar, Loading, EmptyState } from '../../components/common';
import { useAuth, useToast } from '../../context';
import { driverApi, bookingApi, statsApi } from '../../services/api';

export const DriverDashboard = () => {
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(false);
  const [currentRide, setCurrentRide] = useState(null);
  const [rideRequests, setRideRequests] = useState([]);
  const [stats, setStats] = useState({
    todayEarnings: 0,
    totalRides: 0,
    completedRides: 0,
    rating: 0,
  });
  const [recentRides, setRecentRides] = useState([]);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchRideRequests, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, ridesRes, requestsRes] = await Promise.all([
        statsApi.getDriverStats(),
        driverApi.getRideHistory({ limit: 5 }),
        driverApi.getPendingRideRequests(),
      ]);

      setStats({
        todayEarnings: statsRes.todayEarnings || 0,
        totalRides: statsRes.totalRides || 0,
        completedRides: statsRes.completedRides || 0,
        rating: statsRes.rating || 0,
      });
      setRecentRides(ridesRes.data || []);
      setRideRequests(requestsRes.data || []);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const fetchRideRequests = async () => {
    try {
      const response = await driverApi.getPendingRideRequests();
      setRideRequests(response.data || []);
    } catch (error) {
      console.error('Failed to fetch ride requests:', error);
    }
  };

  const toggleAvailability = async () => {
    try {
      const response = await driverApi.toggleAvailability(!isAvailable);
      setIsAvailable(response.isAvailable);
      toast.success(response.isAvailable ? 'You are now available for rides' : 'You are now offline');
    } catch (error) {
      toast.error('Failed to update availability');
    }
  };

  const handleAcceptRide = async (rideId) => {
    try {
      await driverApi.acceptRide(rideId);
      toast.success('Ride accepted! Navigate to pickup location.');
      navigate(`/driver/ride/${rideId}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to accept ride');
    }
  };

  const handleRejectRide = async (rideId) => {
    try {
      await driverApi.rejectRide(rideId);
      setRideRequests((prev) => prev.filter((r) => r._id !== rideId));
      toast.success('Ride rejected');
    } catch (error) {
      toast.error('Failed to reject ride');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loading size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with Availability Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Welcome, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your rides and earnings</p>
        </div>

        <div className="flex items-center gap-4">
          <div
            className={`px-4 py-2 rounded-full flex items-center gap-2 ${
              isAvailable
                ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-sm font-medium">{isAvailable ? 'Online' : 'Offline'}</span>
          </div>
          <Button
            variant={isAvailable ? 'outline' : 'primary'}
            onClick={toggleAvailability}
          >
            {isAvailable ? 'Go Offline' : 'Go Online'}
          </Button>
        </div>
      </div>

      {/* Current Ride Banner */}
      {currentRide && (
        <Card className="bg-gradient-to-r from-blue-50 to-primary-50 dark:from-blue-900/20 dark:to-primary-900/20 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Navigation className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <StatusBadge status={currentRide.status} />
                <p className="text-gray-900 dark:text-white font-medium mt-1">
                  {currentRide.pickupLocation?.address}
                </p>
              </div>
            </div>
            <Button variant="primary" onClick={() => navigate(`/driver/ride/${currentRide._id}`)}>
              Navigate
            </Button>
          </div>
        </Card>
      )}

      {/* New Ride Requests */}
      {rideRequests.length > 0 && (
        <Card className="border-2 border-primary-200 dark:border-primary-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary-600 animate-bounce" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                New Ride Requests ({rideRequests.length})
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {rideRequests.map((request) => (
              <RideRequestCard
                key={request._id}
                request={request}
                onAccept={() => handleAcceptRide(request._id)}
                onReject={() => handleRejectRide(request._id)}
              />
            ))}
          </div>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Earnings"
          value={`₹${stats.todayEarnings.toLocaleString()}`}
          icon={<DollarSign className="w-6 h-6" />}
          color="success"
        />
        <StatCard
          title="Total Rides"
          value={stats.totalRides}
          icon={<Car className="w-6 h-6" />}
          color="primary"
        />
        <StatCard
          title="Completed"
          value={stats.completedRides}
          icon={<CheckCircle className="w-6 h-6" />}
          color="success"
        />
        <StatCard
          title="Rating"
          value={stats.rating > 0 ? stats.rating.toFixed(1) : 'N/A'}
          icon={<Star className="w-6 h-6" />}
          color="warning"
        />
      </div>

      {/* Offline Message */}
      {!isAvailable && rideRequests.length === 0 && (
        <Card className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-100 dark:to-dark-200">
          <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
            <Car className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            You're currently offline
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Go online to start receiving ride requests and earning money.
          </p>
          <Button variant="primary" onClick={toggleAvailability}>
            Go Online
          </Button>
        </Card>
      )}

      {/* Online but No Requests */}
      {isAvailable && rideRequests.length === 0 && !currentRide && (
        <Card className="text-center py-12">
          <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
            <Clock className="w-10 h-10 text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Waiting for ride requests
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            You're online and available. New ride requests will appear here.
          </p>
        </Card>
      )}

      {/* Recent Rides */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Rides</h2>
          <Link
            to="/driver/rides"
            className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
          >
            View All
          </Link>
        </div>

        {recentRides.length > 0 ? (
          <div className="space-y-4">
            {recentRides.map((ride) => (
              <div
                key={ride._id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar
                      src={ride.user?.avatar}
                      name={ride.user?.name}
                      size="md"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {ride.user?.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(ride.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      ₹{ride.fare?.total || 0}
                    </p>
                    <StatusBadge status={ride.status} />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <span>{ride.pickupLocation?.address}</span>
                  <span className="text-gray-300">→</span>
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>{ride.dropLocation?.address}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Car className="w-12 h-12" />}
            title="No rides yet"
            description="Your completed rides will appear here"
          />
        )}
      </Card>
    </div>
  );
};

const RideRequestCard = ({ request, onAccept, onReject }) => {
  const [loading, setLoading] = useState(false);

  const handleAction = async (action) => {
    setLoading(true);
    if (action === 'accept') {
      await onAccept();
    } else {
      await onReject();
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-gradient-to-r from-white to-gray-50 dark:from-dark-200 dark:to-dark-100 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar src={request.user?.avatar} name={request.user?.name} size="lg" />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {request.user?.name}
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>{request.user?.rating?.toFixed(1) || 'New'}</span>
            </div>
          </div>
        </div>
        <Badge variant="primary">₹{request.fare?.total || 0}</Badge>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-green-500 mt-0.5" />
          <div>
            <p className="text-xs text-gray-500">Pickup</p>
            <p className="text-sm text-gray-900 dark:text-white">
              {request.pickupLocation?.address}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
          <div>
            <p className="text-xs text-gray-500">Drop-off</p>
            <p className="text-sm text-gray-900 dark:text-white">
              {request.dropLocation?.address}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
        <span className="flex items-center gap-1">
          <Car className="w-4 h-4" />
          {request.fare?.distance} km
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {request.fare?.duration} min
        </span>
      </div>

      <div className="flex gap-3">
        <Button
          variant="danger"
          className="flex-1"
          onClick={() => handleAction('reject')}
          disabled={loading}
          icon={<XCircle className="w-4 h-4" />}
        >
          Reject
        </Button>
        <Button
          variant="primary"
          className="flex-1"
          onClick={() => handleAction('accept')}
          loading={loading}
          icon={<CheckCircle className="w-4 h-4" />}
        >
          Accept
        </Button>
      </div>
    </div>
  );
};
