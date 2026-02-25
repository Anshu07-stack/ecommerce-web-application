// Yeh base configuration file hai jo sabhi API calls ke liye common setup hai

import axios from 'axios';

// Base API configuration - sabse pehle ye setup karo
const api = axios.create({
  // Base URL fixed hai DummyJSON ka
  baseURL: 'https://dummyjson.com',
  
  // 10 seconds ke baad timeout
  timeout: 10000,
  
  // Default headers for all requests
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - har request se pehle ye chalta hai
api.interceptors.request.use(
  (config) => {
    // Agar tumhe kisi bhi request mein kuch common add karna ho to yahan karo
    // Jaise authentication token, loading state etc
    
    // For now, just console log kar rahe hain development mein
    if (import.meta.env.DEV) {
      console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    // Agar request bhejne mein hi error aaye
    return Promise.reject(error);
  }
);

// Response interceptor - response aane ke baad ye chalta hai
api.interceptors.response.use(
  (response) => {
    // Successful response
    if (import.meta.env.DEV) {
      console.log(`API Response: ${response.status} from ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    // Error response handling
    
    // 1. Network error (server down, no internet)
    if (!error.response) {
      console.error('Network Error: Please check your internet connection');
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        status: 503
      });
    }
    
    // 2. Specific HTTP errors
    switch (error.response.status) {
      case 404:
        console.error('404: Resource not found');
        break;
      case 500:
        console.error('500: Server error');
        break;
      case 429:
        console.error('429: Too many requests');
        break;
      default:
        console.error(`Error ${error.response.status}:`, error.response.data);
    }
    
    return Promise.reject(error);
  }
);

export default api;