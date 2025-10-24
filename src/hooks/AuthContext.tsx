import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string, mfaToken?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('https://unreminiscently-noncensorious-malaysia.ngrok-free.dev/api/auth/admin/verify', { withCredentials: true });
       
        setIsAuthenticated(!!response.data.valid);
      } catch (e) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (Email: string, Password: string, mfaToken?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://unreminiscently-noncensorious-malaysia.ngrok-free.dev/api/auth/admin/login', { Email, Password, mfaToken }, { withCredentials: true });

      if (response.data.requiresMfa && !mfaToken) throw new Error('MFA_REQUIRED');

      setIsAuthenticated(true);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Login failed');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post('https://unreminiscently-noncensorious-malaysia.ngrok-free.dev/api/auth/admin/logout', {}, { withCredentials: true });
    } finally {
      setIsAuthenticated(false);
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
