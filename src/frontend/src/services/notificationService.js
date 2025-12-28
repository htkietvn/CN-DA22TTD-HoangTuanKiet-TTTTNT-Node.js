import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

// User APIs
export const getMyNotifications = () => 
  axios.get(`${API_URL}/notifications/my`, getAuthHeader());

export const markAsRead = (id) => 
  axios.put(`${API_URL}/notifications/${id}/read`, {}, getAuthHeader());

export const markAllAsRead = () => 
  axios.put(`${API_URL}/notifications/read-all`, {}, getAuthHeader());

export const deleteNotification = (id) => 
  axios.delete(`${API_URL}/notifications/${id}`, getAuthHeader());

// Admin APIs
export const getAllNotifications = () => 
  axios.get(`${API_URL}/notifications/all`, getAuthHeader());

export const sendNotification = (data) => 
  axios.post(`${API_URL}/notifications/send`, data, getAuthHeader());

export const sendNotificationToAll = (data) => 
  axios.post(`${API_URL}/notifications/send-all`, data, getAuthHeader());

export const updateNotification = (id, data) => 
  axios.put(`${API_URL}/notifications/admin/${id}`, data, getAuthHeader());

export const adminDeleteNotification = (id) => 
  axios.delete(`${API_URL}/notifications/admin/${id}`, getAuthHeader());
