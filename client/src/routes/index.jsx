import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Link, useParams } from 'react-router-dom';
import { MainLayout, DashboardLayout, AuthLayout } from '../components/layout';
import { ProtectedRoute, PublicRoute, GuestRoute } from './ProtectedRoute';
import { Button, Loading } from '../components/common';
import { useAuth, useToast } from '../context';
import { bookingApi, userApi, vehicleApi, authApi } from '../services/api';
import { BookingCard } from '../components/booking';

const LandingPage = lazy(() => import('../pages/public/LandingPage').then((module) => ({ default: module.LandingPage })));
const AboutPage = lazy(() => import('../pages/public/AboutPage').then((module) => ({ default: module.AboutPage })));
const LoginPage = lazy(() => import('../pages/auth/LoginPage').then((module) => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage').then((module) => ({ default: module.RegisterPage })));
const UserDashboard = lazy(() => import('../pages/user/DashboardPage').then((module) => ({ default: module.UserDashboard })));
const BookRidePage = lazy(() => import('../pages/user/BookRidePage').then((module) => ({ default: module.BookRidePage })));
const DriverDashboard = lazy(() => import('../pages/driver/DriverDashboard').then((module) => ({ default: module.DriverDashboard })));
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard').then((module) => ({ default: module.AdminDashboard })));

const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-400">
    <div className="text-center">
      <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
      <a href="/" className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition">
        Go Home
      </a>
    </div>
  </div>
);

const UnauthorizedPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-400">
    <div className="text-center">
      <div className="w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-6">
        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Access Denied</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">You don't have permission to access this page.</p>
      <a href="/" className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition">
        Go Home
      </a>
    </div>
  </div>
);

const ServicesPage = () => (
  <MainLayout>
    <div className="min-h-screen bg-gray-50 dark:bg-dark-400 pt-20 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Services</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {['City Rides', 'Airport Transfer', 'Outstation', 'Premium'].map((service, i) => (
            <div key={i} className="bg-white dark:bg-dark-200 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition">
              <div className="w-14 h-14 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{service}</h3>
              <p className="text-gray-600 dark:text-gray-400">Reliable and comfortable {service.toLowerCase()} services.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </MainLayout>
);

const ContactPage = () => (
  <MainLayout>
    <div className="min-h-screen bg-gray-50 dark:bg-dark-400 pt-20 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Contact Us</h1>
        <div className="bg-white dark:bg-dark-200 rounded-2xl p-8 shadow-card">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <input type="text" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-100 focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input type="email" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-100 focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
              <textarea rows={5} className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-100 focus:ring-2 focus:ring-primary-500" />
            </div>
            <button type="submit" className="w-full py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </MainLayout>
);

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const toast = useToast();
  const [profileData, setProfileData] = React.useState({ name: '', email: '', phone: '', address: '' });
  const [passwordData, setPasswordData] = React.useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [saving, setSaving] = React.useState(false);
  const [passwordSaving, setPasswordSaving] = React.useState(false);

  React.useEffect(() => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
    });
  }, [user]);

  const handleProfileSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await authApi.updateProfile(profileData);
      const updatedUser = response?.user || response;
      updateUser(updatedUser);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setPasswordSaving(true);
    try {
      await authApi.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success('Password updated successfully');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
        <div className="bg-white dark:bg-dark-200 rounded-2xl p-6 shadow-card">
          <div className="text-center mb-8">
            <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">{(user?.name || 'U').charAt(0).toUpperCase()}</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user?.name || 'User'}</h2>
            <p className="text-gray-500 dark:text-gray-400">{user?.email || ''}</p>
          </div>
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input value={profileData.name} onChange={(event) => setProfileData({ ...profileData, name: event.target.value })} type="text" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input value={profileData.email} onChange={(event) => setProfileData({ ...profileData, email: event.target.value })} type="email" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-100" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
              <input value={profileData.phone} onChange={(event) => setProfileData({ ...profileData, phone: event.target.value })} type="tel" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
              <input value={profileData.address} onChange={(event) => setProfileData({ ...profileData, address: event.target.value })} type="text" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-100" />
            </div>
            <Button type="submit" variant="primary" loading={saving}>Save Changes</Button>
          </form>

          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Change Password</h3>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <input value={passwordData.currentPassword} onChange={(event) => setPasswordData({ ...passwordData, currentPassword: event.target.value })} type="password" placeholder="Current Password" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-100" />
              <input value={passwordData.newPassword} onChange={(event) => setPasswordData({ ...passwordData, newPassword: event.target.value })} type="password" placeholder="New Password" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-100" />
              <input value={passwordData.confirmPassword} onChange={(event) => setPasswordData({ ...passwordData, confirmPassword: event.target.value })} type="password" placeholder="Confirm New Password" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-dark-100" />
              <Button type="submit" variant="outline" loading={passwordSaving}>Update Password</Button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const MyBookingsPage = () => {
  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const toast = useToast();

  React.useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        const data = await bookingApi.getUserBookings();
        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [toast]);

  const handleCancel = async (id) => {
    try {
      await bookingApi.cancel(id);
      setBookings((prev) => prev.map((booking) => booking._id === id ? { ...booking, status: 'cancelled' } : booking));
      toast.success('Booking cancelled');
    } catch (error) {
      toast.error('Failed to cancel booking');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Bookings</h1>
        {loading ? (
          <div className="flex justify-center py-12"><Loading size="lg" /></div>
        ) : bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} onCancel={() => handleCancel(booking._id)} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-dark-200 rounded-2xl p-6 shadow-card">
            <p className="text-center text-gray-500 dark:text-gray-400 py-12">No bookings found. Book your first ride!</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

const BookingDetailsPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const toast = useToast();

  React.useEffect(() => {
    const loadBooking = async () => {
      try {
        setLoading(true);
        const data = await bookingApi.getById(id);
        setBooking(data);
      } catch (error) {
        toast.error('Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };

    loadBooking();
  }, [id, toast]);

  if (loading) {
    return <div className="flex justify-center py-12"><Loading size="lg" /></div>;
  }

  if (!booking) {
    return <div className="text-center py-12 text-gray-500">Booking not found</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Booking Details</h1>
            <p className="text-gray-500 dark:text-gray-400">#{booking._id?.slice(-8).toUpperCase()}</p>
          </div>
          <Link to="/bookings" className="text-primary-600">Back to bookings</Link>
        </div>
        <div className="bg-white dark:bg-dark-200 rounded-2xl p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900 dark:text-white">Status</span>
            <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm">{booking.status}</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Pickup</p>
            <p className="font-medium text-gray-900 dark:text-white">{booking.pickupLocation}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Dropoff</p>
            <p className="font-medium text-gray-900 dark:text-white">{booking.dropLocation}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fare</p>
            <p className="font-medium text-gray-900 dark:text-white">₹{booking.totalAmount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Booked On</p>
            <p className="font-medium text-gray-900 dark:text-white">{new Date(booking.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const UserSettingsPage = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      <div className="bg-white dark:bg-dark-200 rounded-2xl p-6 shadow-card">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Notifications</h3>
            <div className="space-y-3">
              {['Email Notifications', 'Push Notifications', 'SMS Alerts'].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  <button className="w-12 h-6 bg-primary-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

const AdminUsersPage = () => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const toast = useToast();

  React.useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await userApi.getAll();
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [toast]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Users</h1>
        </div>
        {loading ? (
          <div className="flex justify-center py-12"><Loading size="lg" /></div>
        ) : (
          <div className="bg-white dark:bg-dark-200 rounded-2xl shadow-card overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Phone</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t border-gray-100 dark:border-gray-700">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4 text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 text-gray-500">{user.phone}</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">{user.role || 'user'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

const AdminDriversPage = () => {
  const [drivers, setDrivers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const toast = useToast();

  React.useEffect(() => {
    const loadDrivers = async () => {
      try {
        setLoading(true);
        const data = await userApi.getAll();
        setDrivers((Array.isArray(data) ? data : []).filter((item) => item.role === 'driver'));
      } catch (error) {
        toast.error('Failed to load drivers');
      } finally {
        setLoading(false);
      }
    };

    loadDrivers();
  }, [toast]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Drivers</h1>
        </div>
        {loading ? (
          <div className="flex justify-center py-12"><Loading size="lg" /></div>
        ) : (
          <div className="bg-white dark:bg-dark-200 rounded-2xl p-6 shadow-card">
            {drivers.length > 0 ? (
              <div className="space-y-3">
                {drivers.map((driver) => (
                  <div key={driver._id} className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3 last:border-none">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{driver.name}</p>
                      <p className="text-sm text-gray-500">{driver.email}</p>
                    </div>
                    <span className="text-sm text-green-600">Available</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-12">No drivers found</p>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

const AdminVehiclesPage = () => {
  const [cars, setCars] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const toast = useToast();

  React.useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        const data = await vehicleApi.getAll();
        setCars(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error('Failed to load vehicles');
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, [toast]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Vehicles</h1>
        </div>
        {loading ? (
          <div className="flex justify-center py-12"><Loading size="lg" /></div>
        ) : (
          <div className="bg-white dark:bg-dark-200 rounded-2xl p-6 shadow-card">
            {cars.length > 0 ? (
              <div className="space-y-3">
                {cars.map((car) => (
                  <div key={car._id} className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3 last:border-none">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{car.name}</p>
                      <p className="text-sm text-gray-500">{car.type} • ₹{car.pricePerKm}/km</p>
                    </div>
                    <span className={`text-sm ${car.available ? 'text-green-600' : 'text-red-600'}`}>{car.available ? 'Available' : 'Unavailable'}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-12">No vehicles found</p>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

const AdminBookingsPage = () => {
  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const toast = useToast();

  React.useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        const data = await bookingApi.getAll();
        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [toast]);

  const updateStatus = async (id, status) => {
    try {
      await bookingApi.updateStatus(id, status);
      setBookings((prev) => prev.map((booking) => booking._id === id ? { ...booking, status } : booking));
      toast.success('Booking updated');
    } catch (error) {
      toast.error('Failed to update booking');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Bookings</h1>
        </div>
        {loading ? (
          <div className="flex justify-center py-12"><Loading size="lg" /></div>
        ) : (
          <div className="bg-white dark:bg-dark-200 rounded-2xl p-6 shadow-card">
            {bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking._id} className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4 last:border-none">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{booking.user?.name || 'Unknown user'}</p>
                      <p className="text-sm text-gray-500">{booking.pickupLocation} → {booking.dropLocation}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-3 md:mt-0">
                      <span className="text-sm text-gray-500">{booking.status}</span>
                      <button onClick={() => updateStatus(booking._id, 'confirmed')} className="px-3 py-1 text-sm rounded bg-green-100 text-green-700">Approve</button>
                      <button onClick={() => updateStatus(booking._id, 'cancelled')} className="px-3 py-1 text-sm rounded bg-red-100 text-red-700">Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-12">No bookings found</p>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

const AdminSettingsPage = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Settings</h1>
      <div className="bg-white dark:bg-dark-200 rounded-2xl p-6 shadow-card">
        <p className="text-center text-gray-500 dark:text-gray-400 py-12">Settings coming soon</p>
      </div>
    </div>
  </DashboardLayout>
);

const DriverProfilePage = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Driver Profile</h1>
      <div className="bg-white dark:bg-dark-200 rounded-2xl p-6 shadow-card">
        <p className="text-center text-gray-500 dark:text-gray-400 py-12">Driver profile coming soon</p>
      </div>
    </div>
  </DashboardLayout>
);

const DriverEarningsPage = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Earnings</h1>
      <div className="bg-white dark:bg-dark-200 rounded-2xl p-6 shadow-card">
        <p className="text-center text-gray-500 dark:text-gray-400 py-12">Earnings dashboard coming soon</p>
      </div>
    </div>
  </DashboardLayout>
);

const DriverHistoryPage = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ride History</h1>
      <div className="bg-white dark:bg-dark-200 rounded-2xl p-6 shadow-card">
        <p className="text-center text-gray-500 dark:text-gray-400 py-12">Ride history coming soon</p>
      </div>
    </div>
  </DashboardLayout>
);

export const AppRouter = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-400">
          <Loading size="lg" />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />

        <Route
  path="/driver/login"
  element={
    <GuestRoute>
      <LoginPage />
    </GuestRoute>
  }
/>

<Route
  path="/admin/login"
  element={
    <GuestRoute>
      <LoginPage />
    </GuestRoute>
  }
/>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <DashboardLayout><UserDashboard /></DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/book"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <DashboardLayout><BookRidePage /></DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <DashboardLayout><MyBookingsPage /></DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings/:id"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <BookingDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <UserSettingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver/dashboard"
          element={
            <ProtectedRoute allowedRoles={['driver']}>
              <DashboardLayout><DriverDashboard /></DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver/profile"
          element={
            <ProtectedRoute allowedRoles={['driver']}>
              <DriverProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver/earnings"
          element={
            <ProtectedRoute allowedRoles={['driver']}>
              <DriverEarningsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver/history"
          element={
            <ProtectedRoute allowedRoles={['driver']}>
              <DriverHistoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout><AdminDashboard /></DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminUsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/drivers"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDriversPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/vehicles"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminVehiclesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminBookingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminSettingsPage />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
