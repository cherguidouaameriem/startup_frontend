import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Restore session on mount
  useEffect(() => {
    const token = localStorage.getItem('patisserie_token');
    const savedUser = localStorage.getItem('patisserie_user');

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        // Validate token with server
        authService
          .getMe()
          .then((res) => setUser(res.data.user))
          .catch(() => logout())
          .finally(() => setLoading(false));
      } catch {
        logout();
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setError(null);
    const res = await authService.login({ email, password });
    const { token, user } = res.data;
    localStorage.setItem('patisserie_token', token);
    localStorage.setItem('patisserie_user', JSON.stringify(user));
    setUser(user);
    return user;
  }, []);

  const register = useCallback(async (formData) => {
    setError(null);
    const res = await authService.register(formData);
    const { token, user } = res.data;
    localStorage.setItem('patisserie_token', token);
    localStorage.setItem('patisserie_user', JSON.stringify(user));
    setUser(user);
    return user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('patisserie_token');
    localStorage.removeItem('patisserie_user');
    setUser(null);
  }, []);

  const updateUser = useCallback((updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('patisserie_user', JSON.stringify(updatedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
