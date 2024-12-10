import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { register } from '../api/auth';

const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const registerUser = async (cnp, first_name, id_number, last_name, nationality, county, city, password, confirmPassword) => {
        try {

            setLoading(true);
            setError(null);

            const response = await register(cnp, first_name, id_number, last_name, nationality, county, city, password, confirmPassword);
            if (response && response.user) {
                const { user } = response;
                console.log('User registered successfully:', user);
                return true;
            } else {
                setError('Invalid username or password');
                return false; // Indicate failure
            }
        } catch (err) {
            console.error('Register Error:', err);
            setError('An error occurred during registration');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { registerUser, loading, error };

}
export default useRegister;
