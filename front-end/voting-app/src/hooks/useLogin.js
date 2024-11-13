import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { login } from '../api/auth';

const useLogin = () => {
  const { login: contextLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginUser = async (username, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await login(username, password);
      console.log('Login API Response:', response);  // Add this log to see the API response

      if (response && response.user) {
        const { user } = response;
        contextLogin(user);  // Use the login function from context
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginUser };
};

export default useLogin;
