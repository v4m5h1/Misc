// ExampleComponent.jsx

import React from 'react';
import useCrudOperations from './crudOperations';

const ExampleComponent = () => {
  const { get, post, deleteResource } = useCrudOperations();

  const fetchData = async () => {
    try {
      const data = await get('/users', {
        headers: {
          Authorization: 'Bearer your-token',
        },
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // ...
