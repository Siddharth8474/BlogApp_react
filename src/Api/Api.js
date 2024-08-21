import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const registerUser = (username, password) => {
  return axios.post(`${API_URL}/register`, { username, password });
};

export const loginUser = (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

export const createPost = (content, image, userId) => {
  const formData = new FormData();
  formData.append('content', content);
  formData.append('image', image);
  formData.append('userId', userId);
  return axios.post(`${API_URL}/posts`, formData);
};

export const getPosts = () => {
  return axios.get(`${API_URL}/posts`);
};
