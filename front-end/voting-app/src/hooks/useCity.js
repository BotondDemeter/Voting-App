import { useState, useEffect } from 'react';
import { fetchAllCities as apiFetchAllCities,
    insertCity as apiInsertCity
 } from '../api';

const useCity = () => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCities = async () => {
        try {
            const citiesData = await apiFetchAllCities();
            setCities(citiesData);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    const insertCity = async (city) => {
        try {
            const insertedCity = await apiInsertCity(city);
            setCities([...cities, insertedCity]);
        } catch (err) {
            setError(err);
        }
    };

    return { cities, loading, error, fetchCities, insertCity };
};  