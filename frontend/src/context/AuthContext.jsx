import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL || '/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('fm_user');
    const savedToken = localStorage.getItem('fm_token');
    if (savedUser && savedToken) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setToken(savedToken);
      fetchUsers(savedToken, parsedUser.role);
    }
    setLoading(false);
  }, []);

  const fetchUsers = async (savedToken, savedRole) => {
    if (savedRole !== 'admin') return;
    try {
      const response = await fetch(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${savedToken}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAllUsers(data);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('fm_user', JSON.stringify(data.user));
        localStorage.setItem('fm_token', data.token);
        fetchUsers(data.token, data.user.role);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: 'Server connection error' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('fm_user');
    localStorage.removeItem('fm_token');
  };

  const createUser = async (username, password, role) => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ username, password, role, name: username })
      });
      if (response.ok) {
        await fetchUsers(token, 'admin');
        return { success: true };
      }
      const err = await response.json();
      return { success: false, message: err.message };
    } catch (err) {
      console.error('Failed to create user:', err);
      return { success: false };
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, allUsers, loading, login, logout, createUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
