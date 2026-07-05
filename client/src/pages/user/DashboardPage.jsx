import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Clock, Star, MapPin, ArrowRight, Users, DollarSign, Calendar, TrendingUp, Bell } from 'lucide-react';
import { Card, Button, StatCard, Badge, StatusBadge, Avatar, Loading } from '../../components/common';
import { BookingCard } from '../../components/booking';
import { useAuth, useToast } from '../../context';
import { bookingApi, statsApi } from '../../services/api';

export const UserDashboard = () => {
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [recentBookings, setRecentBookings] = useState([]);
  const [activeBooking, setActiveBooking] = useState(null);
  const [stats, setStats] = useState({ totalRides: 0, completedRides: 0, cancelledRides: 0, totalSpent: 0 });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [bookingsRes, statsRes] = await Promise.all([
        bookingApi.getUserBookings({ limit: 5 }),
        statsApi.getDashboardStats(),
      ]);
      const bookings = Array.isArray(bookingsRes) ? bookingsRes : bookingsRes?.data || [];
      setRecentBookings(bookings);
      if (bookings.length > 0) {
        const active = bookings.find((b) =>
          ['pending', 'confirmed', 'driver_assigned', 'driver_arriving', 'arrived', 'in_progress'].includes(b.status)
        );
        setActiveBooking(active || null);
      }
      setStats({
        totalRides: statsRes.totalBookings || 0,
        completedRides: statsRes.completedRides || 0,
        cancelledRides: statsRes.cancelledRides || 0,
        totalSpent: statsRes.totalRevenue || 0,
      });
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { icon: Car, label: 'Book a Ride', path: '/book', color: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' },
    { icon: Clock, label: 'My Bookings', path: '/bookings', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' },
    { icon: Star, label: 'Favorites', path: '/favorites', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600' },
    { icon: Calendar, label: 'Schedule Ride', path: '/schedule', color: 'bg-green-100 dark:bg-green-900/30 text-green-600' },
  ];

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loading size="lg" /></div>;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="bg-gradient-primary rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0]}!</h1>
            <p className="text-white/80">Ready for your next ride? Book now and travel with comfort.</p>
          </div>
          <Link to="/book">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100" icon={<Car className="w-5 h-5" />}>Book a Ride</Button>
          </Link>
        </div>
      </div>

      {/* Active Ride Banner */}
      {activeBooking && (
        <Card className="bg-gradient-to-r from-green-50 to-primary-50 dark:from-green-900/20 dark:to-primary-900/20 border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Car className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <StatusBadge status={activeBooking.status} />
                  <span className="text-sm text-gray-500">Active Ride</span>
                </div>
                <p className="text-gray-900 dark:text-white font-medium">
                  {activeBooking.pickupLocation?.address} {'->'} {activeBooking.dropLocation?.address}
                </p>
              </div>
            </div>
            <Button variant="primary" onClick={() => navigate(`/track/${activeBooking._id}`)}>Track Ride</Button>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map(({ icon: Icon, label, path, color }) => (
          <Link key={path} to={path}>
            <Card hover className="text-center p-6">
              <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mx-auto mb-3`}>
                <Icon className="w-7 h-7" />
              </div>
              <p className="font-medium text-gray-900 dark:text-white">{label}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Rides" value={stats.totalRides} icon={<Car className="w-6 h-6" />} color="primary" />
        <StatCard title="Completed" value={stats.completedRides} icon={<TrendingUp className="w-6 h-6" />} color="success" />
        <StatCard title="Cancelled" value={stats.cancelledRides} icon={<Clock className="w-6 h-6" />} color="warning" />
        <StatCard title="Total Spent" value={`₹${stats.totalSpent.toLocaleString()}`} icon={<DollarSign className="w-6 h-6" />} color="info" />
      </div>

      {/* Recent Bookings */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Bookings</h2>
          <Link to="/bookings" className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {recentBookings.length > 0 ? (
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} showActions={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-dark-100 flex items-center justify-center mx-auto mb-4">
              <Car className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">No bookings yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Start your journey by booking your first ride!</p>
            <Link to="/book"><Button variant="primary">Book Now</Button></Link>
          </div>
        )}
      </Card>

      {/* Promotional Banner */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <Badge variant="warning">Special Offer</Badge>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2">First 3 rides free!</h3>
            <p className="text-gray-600 dark:text-gray-400">Get 50% off on your first 3 rides. Limited time offer.</p>
          </div>
          <Button variant="primary">Claim Offer</Button>
        </div>
      </Card>
    </div>
  );
};
