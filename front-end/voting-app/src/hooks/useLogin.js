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
      if (response && response.user) {
        const { user } = response;
        contextLogin(user); // Log in the user in the AuthContext
        return true; // Indicate success
      } else {
        setError('Invalid username or password');
        return false; // Indicate failure
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('An error occurred during login');
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginUser };
};

export default useLogin;
