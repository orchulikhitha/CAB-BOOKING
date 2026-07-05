import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, getToken, removeToken } from '../services/api';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const userData = await authApi.getCurrentUser();
          setUser(userData);
        } catch {
          removeToken();
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (emailOrCredentials, password) => {
    const credentials = typeof emailOrCredentials === 'object'
      ? emailOrCredentials
      : { email: emailOrCredentials, password };
    const response = await authApi.login(credentials);
    localStorage.setItem("user", JSON.stringify(response.user));
setUser(response.user);
    return response;
  };

  const register = async (data) => {
    const response = await authApi.register(data);
    setUser(response.user || response.admin || null);
    return response;
  };

  const logout = () => {
    authApi.logout();
    localStorage.removeItem("user");
  };

  const updateUser = (data) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        loginAdmin,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
