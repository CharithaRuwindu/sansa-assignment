import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const Booking = () => {
    const location = useLocation();

  const therapistPath = location.pathname.split('/').pop() || '';
  
  // Decode the URL parameter
  const decodedTherapistName = decodeURIComponent(therapistPath);
  

    // Step 1: Booking Details State
    const [clientName, setClientName] = useState('');
    const [sessionTime, setSessionTime] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Step 2: Payment Details State
    const [paymentStep, setPaymentStep] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardholderName, setCardholderName] = useState('');


    const handleCardNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').substring(0, 16);
        const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
        setCardNumber(formattedValue);
    };

    const handleExpiryDateChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').substring(0, 4);
        const formattedValue = value.replace(/(\d{2})(?=\d)/g, '$1/').trim();
        setExpiryDate(formattedValue);
    };

    const handleCvvChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').substring(0, 3);
        setCvv(value);
    };

    const handleBooking = () => {
        if (!decodedTherapistName || !clientName || !sessionTime) {
            setMessage('Please fill in all booking details.');
            return;
        }
        setPaymentStep(true);
    };

    const handlePayment = () => {
        if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
            setMessage('Please fill in all payment details.');
            return;
        }
        setLoading(true);
        setMessage('');

        setTimeout(() => {
            setMessage('Booking Successful!');
            setLoading(false);
            generateReceipt();
        }, 2000);
    };

    const generateReceipt = () => {
        const doc = new jsPDF();
        const currentDate = new Date().toLocaleString();

        doc.setFontSize(20);
        doc.text('Booking Receipt', 105, 20, null, null, 'center');
        doc.setFontSize(12);
        doc.text(`Client Name: ${clientName}`, 20, 40);
        doc.text(`Therapist: ${decodedTherapistName}`, 20, 50);
        doc.text(`Session Date and Time: ${sessionTime}`, 20, 60);
        doc.text(`Current Date and Time: ${currentDate}`, 20, 70);

        const videoLink = "https://example.com/video-conference-link";
        doc.setTextColor(0, 0, 255);
        doc.text('Video Conference Link: ', 20, 80);
        doc.textWithLink(videoLink, 90, 80, { url: videoLink });

        doc.save('booking-receipt.pdf');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Book a Session</h2>

                {!paymentStep && (
                    <div className="space-y-6">
                        <input
                            type="text"
                            placeholder="Therapist Name"
                            value={decodedTherapistName}
                            disabled
                            className="w-full px-4 py-3 border rounded-lg bg-gray-200"
                        />
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg"
                        />
                        <input
                            type="datetime-local"
                            value={sessionTime}
                            onChange={(e) => setSessionTime(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg"
                        />
                        <button
                            onClick={handleBooking}
                            className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                        >
                            Next
                        </button>
                    </div>
                )}

                {paymentStep && (
                    <div className="space-y-6">
                        <div className="p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
                            <h4 className="text-sm mb-4 text-red-500">You will be charged xxx USD for chanelling (tax inclusive)</h4>
                            <input
                                type="text"
                                placeholder="Cardholder Name"
                                value={cardholderName}
                                onChange={(e) => setCardholderName(e.target.value)}
                                className="w-full px-4 py-3 border rounded-lg"
                            />
                            <input
                                type="text"
                                placeholder="Card Number"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                className="w-full px-4 py-3 mt-2 border rounded-lg"
                            />
                            <input
                                type="text"
                                placeholder="MM/YY"
                                value={expiryDate}
                                onChange={handleExpiryDateChange}
                                className="w-full px-4 py-3 mt-2 border rounded-lg"
                            />
                            <input
                                type="text"
                                placeholder="CVV"
                                value={cvv}
                                onChange={handleCvvChange}
                                className="w-full px-4 py-3 mt-2 border rounded-lg"
                            />
                        </div>
                        <button
                            onClick={handlePayment}
                            className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Confirm Payment'}
                        </button>
                    </div>
                )}

                {message && (
                    <p className={`text-center mt-6 text-xl ${message.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Booking;
