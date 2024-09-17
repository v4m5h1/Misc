// crudOperations.jsx

import { useState, useEffect } from 'react';

const baseUrl = 'https://your-api-url.com/api'; // replace with your base API URL

const useCrudOperations = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Generic GET method
  const get = async (endpoint) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}${endpoint}`);
      const data = await response.json();
      setIsLoading(false);
      return data;
    } catch (error) {
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  // Generic POST method
  const post = async (endpoint, data) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setIsLoading(false);
      return result;
    } catch (error) {
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  // Generic DELETE method
  const deleteResource = async (endpoint) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      setIsLoading(false);
      return result;
    } catch (error) {
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  return { get, post, deleteResource, error, isLoading };
};

export default useCrudOperations;



// Generic GET method
  const get = async (endpoint, options = {}) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'GET',
        credentials: 'include', // include credentials
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
      });
      const data = await response.json();
      setIsLoading(false);
      return data;
    } catch (error) {
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };
