import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTherapists } from '../services/therapistService';

const TherapistProfile = () => {
    const [therapists, setTherapists] = useState([]);

    useEffect(() => {
        const fetchTherapists = async () => {
            const data = await getTherapists();
            setTherapists(data);
        };
        fetchTherapists();
    }, []);

    const navigate = useNavigate();

    const handleBooking = (name) => {
        const formattedName = encodeURIComponent(name);
        navigate(`/booking/${formattedName}`);
    };
    

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Our Therapists</h1>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {therapists.map((therapist) => (
                    <div 
                        key={therapist.id} 
                        className="bg-white cursor-pointer p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        onClick={() => handleBooking(therapist.name)}
                    >
                        <h2 className="text-xl font-semibold text-gray-900">{therapist.name}</h2>
                        <p className="text-sm text-teal-600 font-medium">{therapist.specialty}</p>
                        <p className="text-gray-700 mt-2">{therapist.bio}</p>
                        <p className="mt-4 text-sm text-gray-500">
                            <span className="font-semibold text-gray-800">Availability:</span> {therapist.availability}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TherapistProfile;
