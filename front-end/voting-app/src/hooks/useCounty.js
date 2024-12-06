import { useState, useEffect } from 'react';
import { fetchAllCounties as apiFetchAllCounties ,
    fetchSingleCounty as apiFetchSingleCounty
} from '../api';

const useCounty = () => {
    const [counties, setCounties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCounties = async () => {
        try {
            const countiesData = await apiFetchAllCounties();
            setCounties(countiesData);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    const insertCounty = async (county) => {
        try {
            const insertedCounty = await apiInsertCounty(county);
            setCounties([...counties, insertedCounty]);
        } catch (err) {
            setError(err);
        }
    };



    return { counties, loading, error, insertCounty, fetchCounties };  
}