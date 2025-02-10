import axios from 'axios';

const API_URL = 'https://localhost:7052/api/therapist';

export const getTherapists = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching therapists:', error);
        return [];
    }
};