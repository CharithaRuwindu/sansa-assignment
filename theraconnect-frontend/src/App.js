import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TherapistProfile from './components/TherapistProfile';
import SearchTherapists from './components/SearchTherapists';
import Booking from './components/Booking';

function App() {
  const [selectedOption, setSelectedOption] = useState('ourTherapists');

  const handleMenuSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <Router>
      <div className="App bg-gray-100 min-h-screen">
        {/* Menu Bar */}
        <div className=" px-6 pt-4 flex justify-end">
          <div className="flex space-x-4 bg-white shadow-md rounded-full px-3 py-2">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-full transition duration-300
                          ${selectedOption === 'ourTherapists' ? 'bg-green-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => handleMenuSelect('ourTherapists')}
            >
              Our Therapists
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-full transition duration-300
                          ${selectedOption === 'searchOptions' ? 'bg-green-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => handleMenuSelect('searchOptions')}
            >
              Search
            </button>
          </div>
        </div>

        {/* Routes for Pages */}
        <Routes>
          <Route
            path="/"
            element={selectedOption === 'ourTherapists' ? <TherapistProfile /> : <SearchTherapists />}
          />
          <Route path="/booking/:id" element={<Booking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
