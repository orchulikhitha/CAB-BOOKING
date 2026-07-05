import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Car, Clock, Wallet, User, Settings, HelpCircle,
  LogOut, X, Users, Truck, BarChart3, DollarSign, FileText, Star, MapPin
} from 'lucide-react';
import { useAuth } from '../../context';
import { Avatar } from '../common';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const getUserMenuItems = () => [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Book a Ride', path: '/book', icon: <Car className="w-5 h-5" /> },
    { name: 'My Bookings', path: '/bookings', icon: <Clock className="w-5 h-5" />, badge: 3 },
    { name: 'My Rides', path: '/rides', icon: <MapPin className="w-5 h-5" /> },
    { name: 'Favorites', path: '/favorites', icon: <Star className="w-5 h-5" /> },
    { name: 'Payments', path: '/payments', icon: <Wallet className="w-5 h-5" /> },
    { name: 'Profile', path: '/profile', icon: <User className="w-5 h-5" /> },
    { name: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
    { name: 'Help', path: '/help', icon: <HelpCircle className="w-5 h-5" /> },
  ];

  const getDriverMenuItems = () => [
    { name: 'Dashboard', path: '/driver/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Assigned Rides', path: '/driver/rides', icon: <Car className="w-5 h-5" />, badge: 5 },
    { name: 'Earnings', path: '/driver/earnings', icon: <Wallet className="w-5 h-5" /> },
    { name: 'Ride History', path: '/driver/history', icon: <Clock className="w-5 h-5" /> },
    { name: 'Profile', path: '/driver/profile', icon: <User className="w-5 h-5" /> },
    { name: 'Settings', path: '/driver/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const getAdminMenuItems = () => [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Users', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { name: 'Drivers', path: '/admin/drivers', icon: <Truck className="w-5 h-5" /> },
    { name: 'Vehicles', path: '/admin/vehicles', icon: <Car className="w-5 h-5" /> },
    { name: 'Bookings', path: '/admin/bookings', icon: <FileText className="w-5 h-5" /> },
    { name: 'Payments', path: '/admin/payments', icon: <DollarSign className="w-5 h-5" /> },
    { name: 'Reports', path: '/admin/reports', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const getMenuItems = () => {
    if (!user) return [];
    switch (user.role) {
      case 'admin':
        return getAdminMenuItems();
      case 'driver':
        return getDriverMenuItems();
      default:
        return getUserMenuItems();
    }
  };

  const menuItems = getMenuItems();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-72
          bg-white dark:bg-dark-300 shadow-elevated
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo & Close Button */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100 dark:border-gray-700">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              U<span className="text-primary-600">CAB</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-lg lg:hidden hover:bg-gray-100 dark:hover:bg-dark-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Avatar src={user?.avatar} alt={user?.name} size="md" status="online" />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {user?.name}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-200
                    ${isActive(item.path)
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-100'
                    }
                  `}
                >
                  {item.icon}
                  <span className="flex-1 text-sm font-medium">{item.name}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary-600 text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
