import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchTherapists = () => {
    const [specialty, setSpecialty] = useState('');
    const [availability, setAvailability] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('https://localhost:7052/api/therapist/search', {
                specialty,
                availability
            });

            setResults(response.data);
        } catch (error) {
            console.error('Error searching therapists:', error);
            setError('Failed to fetch therapists. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const navigate = useNavigate();

    const handleBooking = (name) => {
        const formattedName = encodeURIComponent(name);
        navigate(`/booking/${formattedName}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Search Therapists</h1>

            {/* Search Form */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl flex flex-col md:flex-row gap-4 items-center">
                <input
                    type="text"
                    placeholder="Specialty"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                    type="text"
                    placeholder="Availability"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                    onClick={handleSearch}
                    className="w-full md:w-auto px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition"
                >
                    Search
                </button>
            </div>

            {/* Loading and Error Messages */}
            {loading && <p className="text-gray-600 mt-4">Searching...</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}

            {/* Search Results */}
            <div className="mt-6 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.length === 0 && !loading && !error && (
                    <p className="text-gray-500 col-span-full text-center">No therapists found.</p>
                )}

                {results.map((therapist) => (
                    <div 
                        key={therapist.id} 
                        className="bg-white p-6 cursor-pointer rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
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

export default SearchTherapists;
