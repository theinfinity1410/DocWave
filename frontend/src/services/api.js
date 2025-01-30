import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const login = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
  return response.data;
};

export const signup = async (name, email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, { name, email, password });
  return response.data;
};

export const fetchDocuments = async () => {
  const response = await axios.get(`${API_BASE_URL}/documents`);
  return response.data;
};

export const createDocument = async (title) => {
  const response = await axios.post(`${API_BASE_URL}/documents`, { title });
  return response.data;
};

export const updateDocument = async (id, content) => {
  const response = await axios.put(`${API_BASE_URL}/documents/${id}`, { content });
  return response.data;
};

export const checkGrammar = async (text) => {
  const response = await axios.post(`${API_BASE_URL}/grammar/check`, { text });
  return response.data;
};