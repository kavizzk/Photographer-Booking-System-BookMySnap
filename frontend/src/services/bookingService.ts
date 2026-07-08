import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface BookingData {
    photographerId: string;
    photographerName: string;
    date: string;
    time: string;
    location: string;
    eventType: string;
    duration: number;
    totalCost: number;
    eventDescription: string;
}

export const createBooking = async (bookingData: BookingData) => {
    const response = await axios.post(`${API_URL}/bookings`, bookingData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
};

export const getUserBookings = async () => {
    const response = await axios.get(`${API_URL}/bookings/user`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
};

export const getPhotographerBookings = async () => {
    const response = await axios.get(`${API_URL}/bookings/photographer`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
};

export const updateBookingStatus = async (bookingId: string, status: string) => {
    const response = await axios.patch(`${API_URL}/bookings/${bookingId}`, 
        { status },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    );
    return response.data;
};

export const deleteBooking = async (bookingId: string) => {
    const response = await axios.delete(`${API_URL}/bookings/${bookingId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
}; 