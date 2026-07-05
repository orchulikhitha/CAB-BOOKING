import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

const getToken = () => localStorage.getItem('token');
const setToken = (token) => localStorage.setItem('token', token);
const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null');
  } catch {
    return null;
  }
};

const getCurrentUserId = () => getStoredUser()?._id || getStoredUser()?.id || null;

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const request = async (config) => {
  const response = await api.request(config);
  return response.data;
};

export const authApi = {
  login: async (credentials) => {
    const response = await api.post('/users/login', credentials);
    if (response.data?.token) {
      setToken(response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  register: async (data) => {
    const response = await api.post('/users/register', data);
    if (response.data?.token) {
      setToken(response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  adminLogin: async (credentials) => {
    const response = await api.post('/admin/login', credentials);
    if (response.data?.token) {
      setToken(response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.admin));
    }
    return response.data;
  },

  adminRegister: async (data) => {
    const response = await api.post('/admin/register', data);
    if (response.data?.token) {
      setToken(response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.admin));
    }
    return response.data;
  },

  logout: () => {
    removeToken();
  },

  getCurrentUser: async () => {
    const storedUser = getStoredUser();
    if (storedUser) {
      return storedUser;
    }
    return null;
  },

  updateProfile: async (data) => {
    const storedUser = getStoredUser();
    const userId = storedUser?._id || storedUser?.id;
    if (!userId) {
      return { ...storedUser, ...data };
    }

    const isAdmin = storedUser?.role === 'admin';
    const response = await api.put(isAdmin ? `/admin/users/${userId}` : '/users/profile', data);
    const updatedUser = response.data?.user || response.data || { ...storedUser, ...data };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return updatedUser;
  },

  changePassword: async (data) => {
    return api.put('/users/change-password', data);
  },
};

export const userApi = {
  getAll: async () => {
    const response = await request({ method: 'GET', url: '/admin/users' });
    return Array.isArray(response) ? response : response?.users || [];
  },

  getById: async (id) => {
    const users = await userApi.getAll();
    return users.find((user) => user._id === id) || null;
  },

  update: async (id, data) => {
    return request({ method: 'PUT', url: `/admin/users/${id}`, data });
  },

  delete: async (id) => {
    return request({ method: 'DELETE', url: `/admin/users/${id}` });
  },
};

export const driverApi = {
  getAll: async () => [],
  getById: async () => null,
  update: async () => null,
  delete: async () => null,
  updateAvailability: async (availability) => ({ isAvailable: availability }),
  getEarnings: async () => ({ todayEarnings: 0 }),
  getAssignedRides: async () => ({ data: [] }),
  getRideHistory: async () => ({ data: [] }),
  getPendingRideRequests: async () => ({ data: [] }),
  acceptRide: async () => ({ message: 'Ride accepted' }),
  rejectRide: async () => ({ message: 'Ride rejected' }),
};

export const vehicleApi = {
  getAll: async () => {
    return request({ method: 'GET', url: '/cars' });
  },

  getAvailable: async () => [],

  getById: async (id) => {
    const cars = await vehicleApi.getAll();
    return Array.isArray(cars) ? cars.find((car) => car._id === id) : null;
  },

  create: async (data) => {
    return request({ method: 'POST', url: '/admin/cars', data });
  },

  update: async (id, data) => {
    return request({ method: 'PUT', url: `/admin/cars/${id}`, data });
  },

  delete: async (id) => {
    return request({ method: 'DELETE', url: `/admin/cars/${id}` });
  },
};

export const bookingApi = {
  getAll: async () => {
    const storedUser = getStoredUser();
    if (storedUser?.role === 'admin') {
      return request({ method: 'GET', url: '/admin/bookings' });
    }

    const userId = getCurrentUserId();
    if (!userId) {
      return [];
    }
    return request({ method: 'GET', url: `/bookings/user/${userId}` });
  },

  getById: async (id) => {
    const bookings = await bookingApi.getAll();
    return Array.isArray(bookings) ? bookings.find((booking) => booking._id === id) : null;
  },

  create: async (data) => {
    const payload = {
      carId: data.carId || data.cabCategory?._id || data.cabCategory,
      pickupLocation: data.pickupLocation?.address || data.pickupLocation || '',
      dropLocation: data.dropLocation?.address || data.dropLocation || '',
      pickupDate: data.pickupDate || new Date().toISOString(),
      totalAmount: data.totalAmount ?? data.fare?.total ?? 0,
    };
    return request({ method: 'POST', url: '/bookings', data: payload });
  },

  getUserBookings: async () => {
    const userId = getCurrentUserId();
    if (!userId) {
      return [];
    }
    const response = await request({ method: 'GET', url: `/bookings/user/${userId}` });
    return Array.isArray(response) ? response : response?.bookings || [];
  },

  cancel: async (id) => {
    return request({ method: 'PUT', url: `/bookings/${id}/cancel` });
  },

  updateStatus: async (id, status) => {
    return request({ method: 'PUT', url: `/admin/bookings/${id}`, data: { status } });
  },
};

export const categoryApi = {
  getAll: async () => {
    const response = await request({ method: 'GET', url: '/cars' });
    const cars = Array.isArray(response) ? response : response?.cars || [];

    const mappedCars = cars.map((car) => ({
      _id: car._id,
      name: car.name,
      type: (car.type || 'sedan').toLowerCase(),
      capacity: car.seats || 4,
      price: car.pricePerKm ? car.pricePerKm * 10 : 150,
      eta: 10 + Math.floor(Math.random() * 15),
      rating: 4.3 + Math.random() * 0.6,
      image: car.image
        ? `${BASE_URL.replace('/api', '')}/uploads/${car.image}`
        : 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['AC', 'GPS', 'Safe Ride'],
      baseFare: car.pricePerKm ? car.pricePerKm * 2 : 50,
      perKmRate: car.pricePerKm || 15,
      perMinuteRate: 2,
      available: car.available,
    }));

    return { data: mappedCars };
  },
};

export const statsApi = {
  getDashboardStats: async () => {
    const bookings = await bookingApi.getUserBookings();
    return {
      totalBookings: bookings.length,
      completedRides: bookings.filter((booking) => booking.status === 'confirmed').length,
      cancelledRides: bookings.filter((booking) => booking.status === 'cancelled').length,
      totalRevenue: bookings.reduce((sum, booking) => sum + (booking.totalAmount || 0), 0),
    };
  },

  getAdminStats: async () => {
    const [users, bookings] = await Promise.all([userApi.getAll(), bookingApi.getAll()]);
    return {
      totalUsers: users.length,
      totalDrivers: 0,
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((sum, booking) => sum + (booking.totalAmount || booking.fare?.total || 0), 0),
      activeRides: bookings.filter((booking) => ['pending', 'confirmed'].includes(booking.status)).length,
      pendingApprovals: 0,
    };
  },

  getDriverStats: async () => ({
    todayEarnings: 0,
    totalRides: 0,
    completedRides: 0,
    rating: 0,
  }),
};

export { api, getToken, setToken, removeToken };

export default api;
