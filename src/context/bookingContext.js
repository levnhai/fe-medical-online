import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState(() => {
    // Khởi tạo bookingData từ localStorage nếu có
    const savedData = localStorage.getItem('bookingData');
    return savedData
      ? JSON.parse(savedData)
      : {
          hospital: { fullName: null, id: null, address: null },
          doctor: { fullName: null, id: null, specialty: null },
          date: null,
          price: null,
          time: { timeId: null, start: null, end: null },
          patientProfile: null,
          confirmed: false,
          paymentStatus: null,
        };
  });

  // Lưu bookingData vào localStorage khi có thay đổi
  useEffect(() => {
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
  }, [bookingData]);

  const updateBookingData = (key, value) => {
    setBookingData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearBookingData = () => {
    setBookingData({
      hospital: { fullName: null, id: null, address: null },
      doctor: { fullName: null, id: null, specialty: null },
      date: null,
      price: null,
      time: { start: null, end: null },
      patientProfile: null,
      confirmed: false,
      paymentStatus: null,
    });
    localStorage.removeItem('bookingData'); // Xóa dữ liệu khỏi localStorage
  };

  return (
    <BookingContext.Provider value={{ bookingData, updateBookingData, clearBookingData }}>
      {children}
    </BookingContext.Provider>
  );
};
