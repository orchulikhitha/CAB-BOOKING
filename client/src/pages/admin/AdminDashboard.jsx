import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Car,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Activity,
  BarChart3,
  Calendar,
  Bell,
} from 'lucide-react';
import { Card, Button, StatCard, Badge, StatusBadge, Avatar, Loading, TableSkeleton } from '../../components/common';
import { useAuth, useToast } from '../../context';
import { statsApi, userApi, bookingApi, driverApi } from '../../services/api';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDrivers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeRides: 0,
    pendingApprovals: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentDrivers, setRecentDrivers] = useState([]);
  const [activityFeed, setActivityFeed] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, bookingsRes, usersRes, driversRes] = await Promise.all([
        statsApi.getAdminStats(),
        bookingApi.getAll({ limit: 5 }),
        userApi.getAll({ limit: 5 }),
        driverApi.getAll({ limit: 5 }),
      ]);
      const bookings = Array.isArray(bookingsRes) ? bookingsRes : bookingsRes?.data || [];
      const users = Array.isArray(usersRes) ? usersRes : usersRes?.data || [];
      const drivers = Array.isArray(driversRes) ? driversRes : driversRes?.data || [];

      setStats({
        totalUsers: statsRes.totalUsers || 0,
        totalDrivers: statsRes.totalDrivers || 0,
        totalBookings: statsRes.totalBookings || 0,
        totalRevenue: statsRes.totalRevenue || 0,
        activeRides: statsRes.activeRides || 0,
        pendingApprovals: statsRes.pendingApprovals || 0,
      });

      setRecentBookings(bookings);
      setRecentUsers(users);
      setRecentDrivers(drivers);

      setActivityFeed([
        { id: 1, type: 'booking', message: 'New booking #BK001 created', time: '2 min ago', icon: Car },
        { id: 2, type: 'user', message: 'New user registration', time: '5 min ago', icon: Users },
        { id: 3, type: 'driver', message: 'Driver #DR123 completed verification', time: '15 min ago', icon: CheckCircle },
        { id: 4, type: 'payment', message: 'Payment received ₹450', time: '30 min ago', icon: DollarSign },
      ]);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const quickLinks = [
    {
      label: 'Manage Users',
      path: '/admin/users',
      icon: Users,
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
    },
    {
      label: 'Manage Drivers',
      path: '/admin/drivers',
      icon: Car,
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600',
    },
    {
      label: 'All Bookings',
      path: '/admin/bookings',
      icon: Calendar,
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
    },
    {
      label: 'Analytics',
      path: '/admin/analytics',
      icon: BarChart3,
      color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loading size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back, {user?.name?.split(' ')[0]}! Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" icon={<Bell className="w-4 h-4" />}>
            Notifications
            {stats.pendingApprovals > 0 && (
              <Badge variant="danger" className="ml-2">
                {stats.pendingApprovals}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users className="w-6 h-6" />}
          color="primary"
          trend={{ value: 12, label: 'vs last month' }}
        />
        <StatCard
          title="Total Drivers"
          value={stats.totalDrivers}
          icon={<Car className="w-6 h-6" />}
          color="success"
          trend={{ value: 8, label: 'vs last month' }}
        />
        <StatCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="w-6 h-6" />}
          color="warning"
          trend={{ value: 15, label: 'vs last month' }}
        />
        <StatCard
          title="Active Rides"
          value={stats.activeRides}
          icon={<Activity className="w-6 h-6" />}
          color="accent"
        />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.path} to={link.path}>
              <Card hover className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{link.label}</p>
                    <ArrowRight className="w-4 h-4 text-gray-400 mt-1" />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Bookings
            </h2>
            <Link
              to="/admin/bookings"
              className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {recentBookings.length > 0 ? (
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-100 rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    <Avatar
                      src={booking.user?.avatar}
                      name={booking.user?.name}
                      size="md"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {booking.user?.name || 'Unknown User'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {booking.pickupLocation?.address?.substring(0, 30)}...
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      ₹{booking.fare?.total || 0}
                    </p>
                    <StatusBadge status={booking.status} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No recent bookings</p>
            </div>
          )}
        </Card>

        {/* Activity Feed */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Activity Feed
          </h2>

          <div className="space-y-4">
            {activityFeed.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-dark-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Users & Drivers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              New Users
            </h2>
            <Link
              to="/admin/users"
              className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
            >
              View All
            </Link>
          </div>

          {recentUsers.length > 0 ? (
            <div className="space-y-4">
              {recentUsers.map((u) => (
                <div
                  key={u._id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-100 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <Avatar src={u.avatar} name={u.name} size="md" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{u.name}</p>
                      <p className="text-sm text-gray-500">{u.email}</p>
                    </div>
                  </div>
                  <Badge variant={u.isActive ? 'success' : 'gray'}>
                    {u.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No recent users</p>
            </div>
          )}
        </Card>

        {/* Recent Drivers */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              New Drivers
            </h2>
            <Link
              to="/admin/drivers"
              className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
            >
              View All
            </Link>
          </div>

          {recentDrivers.length > 0 ? (
            <div className="space-y-4">
              {recentDrivers.map((d) => (
                <div
                  key={d._id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-100 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <Avatar src={d.user?.avatar} name={d.user?.name} size="md" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {d.user?.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {d.vehicle?.vehicleType || 'Vehicle'}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={d.isVerified ? 'success' : d.isPending ? 'warning' : 'gray'}
                  >
                    {d.isVerified ? 'Verified' : d.isPending ? 'Pending' : 'Unverified'}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No recent drivers</p>
            </div>
          )}
        </Card>
      </div>

      {/* Pending Approvals Alert */}
      {stats.pendingApprovals > 0 && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Pending Approvals
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {stats.pendingApprovals} driver application(s) awaiting review
                </p>
              </div>
            </div>
            <Link to="/admin/drivers?filter=pending">
              <Button variant="primary">Review Now</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
};
