import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../api/axios';

const AuthContext = createContext(null);

/**
 * AuthProvider
 *
 * Manages user authentication state globally.
 * Stores JWT token in localStorage and auto-loads user on mount.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Load user from stored token on mount.
   */
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await authAPI.getMe();
        setUser(res.data);
      } catch (err) {
        // Token invalid — clear storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  /**
   * Register a new account.
   */
  const register = useCallback(async (name, email, password) => {
    setError(null);
    try {
      const res = await authAPI.register({ name, email, password });
      const { _id, name: userName, email: userEmail, token } = res.data;
      localStorage.setItem('token', token);
      setUser({ _id, name: userName, email: userEmail });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      return { success: false, message };
    }
  }, []);

  /**
   * Log in with email and password.
   */
  const login = useCallback(async (email, password) => {
    setError(null);
    try {
      const res = await authAPI.login({ email, password });
      const { _id, name, email: userEmail, token } = res.data;
      localStorage.setItem('token', token);
      setUser({ _id, name, email: userEmail });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, message };
    }
  }, []);

  /**
   * Log out — clear token and user state.
   */
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  /**
   * Update user profile data.
   */
  const updateUser = useCallback(async (data) => {
    try {
      const res = await authAPI.updateProfile(data);
      setUser(res.data);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Update failed';
      return { success: false, message };
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access auth context.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
