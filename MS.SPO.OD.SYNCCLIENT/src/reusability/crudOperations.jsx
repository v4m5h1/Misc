import {useState, useEffect} from 'react';

const useCrudOperations = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    // Generic GET method
    const get = async (endpoint) => {
      setIsLoading(true);
      debugger;
      try {
        const response = await fetch(endpoint, {
          method: 'GET',
          credentials: 'include'
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
  
    // Generic POST method
    const post = async (endpoint, data) => {
      setIsLoading(true);
      debugger;
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
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
        const response = await fetch(endpoint, {
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
  };

  export default useCrudOperations;