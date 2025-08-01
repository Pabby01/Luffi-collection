"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
}

interface AuthState {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
  });

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('luffi-token');
        if (token) {
          // In a real app, validate token with backend
          const user = JSON.parse(localStorage.getItem('luffi-user') || 'null');
          setState({ user, loading: false });
        } else {
          setState({ user: null, loading: false });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setState({ user: null, loading: false });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock authentication - replace with real API call
      if (email === 'admin@luffi.com' && password === 'admin123') {
        const user = { id: '1', email, name: 'Admin User', role: 'admin' as const };
        localStorage.setItem('luffi-token', 'mock-token');
        localStorage.setItem('luffi-user', JSON.stringify(user));
        setState({ user, loading: false });
        return true;
      } else if (email && password) {
        const user = { id: '2', email, name: 'Customer', role: 'customer' as const };
        localStorage.setItem('luffi-token', 'mock-token');
        localStorage.setItem('luffi-user', JSON.stringify(user));
        setState({ user, loading: false });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Mock registration - replace with real API call
      const user = { id: Date.now().toString(), email, name, role: 'customer' as const };
      localStorage.setItem('luffi-token', 'mock-token');
      localStorage.setItem('luffi-user', JSON.stringify(user));
      setState({ user, loading: false });
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('luffi-token');
    localStorage.removeItem('luffi-user');
    setState({ user: null, loading: false });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}