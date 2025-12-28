import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/auth/profile')
        .then(res => setUser(res.data))
        .catch((error) => {
          console.error('Auth error:', error);
          localStorage.removeItem('token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    setUser(data);
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: '#f8f9fa'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '3rem',
            marginBottom: '20px'
          }}>⏳</div>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
