import axios from 'axios';
import { API_URL } from './config';

export const fetchData = async () => {
    try {
        const response = await axios.get(`${API_URL}/tables`);
        return response.data; //.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// Add more API functions as needed