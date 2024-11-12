import { useState, useEffect } from 'react';
import { fetchAllUsers } from '../api';

const useUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const userData = await fetchAllUsers();
                setUsers(userData);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        getUsers();
    }, []);

    return { users, loading, error };
};

export default useUser;
