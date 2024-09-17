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




// ExampleComponent.jsx

import React from 'react';
import useCrudOperations from './crudOperations';

const ExampleComponent = () => {
  const { get, post, deleteResource, error, isLoading } = useCrudOperations();

  const fetchData = async () => {
    try {
      const data = await get('/users');
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async () => {
    try {
      const userData = { name: 'John Doe', email: 'johndoe@example.com' };
      const response = await post('/users', userData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async () => {
    try {
      const response = await deleteResource('/users/1');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <button onClick={createUser}>Create User</button>
      <button onClick={deleteUser}>Delete User</button>
      {isLoading ? <p>Loading...</p> : null}
      {error ? <p>Error: {error.message}</p> : null}
    </div>
  );
};

export default ExampleComponent;
