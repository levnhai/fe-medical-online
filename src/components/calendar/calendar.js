import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css'; // CSS tùy chỉnh
import Button from '../Button';
import { extractTime } from '~/utils/time';

//icon
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

function CustomCalendar({ dates }) {
  console.log('check date cusstom', dates);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Ngày đang chọn
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Tháng đang hiển thị
  const [showCalendar, setShowCalendar] = useState(true);
  const [hours, setHours] = useState([]);

  const handleDateChange = (date) => {
    console.log('check date change', date);
    const formattedDate = date.toLocaleDateString('en-CA'); // Format yyyy-mm-dd
    console.log('check formattedDate', formattedDate);
    setSelectedDate(formattedDate);
    setShowCalendar(false); // Thu gọn lịch sau khi chọn ngày
    const result = dates.filter((item) => item.date.startsWith(formattedDate));
    const hours = result.flatMap((item) => item.hours);
    setHours(hours);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  // Hàm chuyển đổi tháng
  const handleMonthChange = (offset) => {
    const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + offset));
    setCurrentMonth(newMonth);
  };

  // Lấy danh sách các ngày có lịch hẹn
  const enabledDates = dates?.map((appointment) => {
    const date = new Date(appointment.date);
    return date.toISOString().split('T')[0]; // Định dạng 'YYYY-MM-DD'
  });

  // Hàm kiểm tra disable
  const isDisabled = (date) => {
    const dateString = date.toLocaleDateString('en-CA'); // Định dạng 'YYYY-MM-DD'
    return !enabledDates.includes(dateString); // Disable nếu không có trong danh sách
  };

  return (
    <div className="calendar-container">
      {/* Thanh điều hướng tháng */}

      {showCalendar && !selectedDate && (
        <div className="calendar-navigation">
          <div
            className="nav-button"
            onClick={() => handleMonthChange(-1)}
            disabled={currentMonth.getFullYear() === 2024 && currentMonth.getMonth() === 11} // Disable nút trái cho tháng 12-2024
          >
            <FaArrowAltCircleLeft />
          </div>
          <span className="current-month">
            THÁNG {currentMonth.getMonth() + 1 < 10 ? '0' : ''}
            {currentMonth.getMonth() + 1}-{currentMonth.getFullYear()}
          </span>
          <div
            className="nav-button"
            onClick={() => handleMonthChange(1)}
            disabled={currentMonth.getFullYear() === 2025 && currentMonth.getMonth() === 0} // Disable nút phải cho tháng 1-2025
          >
            <FaArrowAltCircleRight />
          </div>
        </div>
      )}

      {!showCalendar && selectedDate && (
        <div className="selected-date" onClick={toggleCalendar}>
          <h2>Ngày bạn đã chọn: {new Date(selectedDate).toLocaleDateString('vi-VN')}</h2>
        </div>
      )}

      {/* Hiển thị lịch */}
      {showCalendar && (
        <Calendar
          className="w-full border-none"
          onChange={handleDateChange} // Lưu ngày được chọn handleDateChange
          value={selectedDate}
          activeStartDate={currentMonth} // Hiển thị tháng hiện tại
          locale="vi-VN"
          showNavigation={false}
          // tileContent={({ date, view }) =>
          //   view === 'month' && date.getDate() === 4 ? (
          //     <div className="highlight-dot"></div> // Thêm dấu chấm đỏ cho ngày 4
          //   ) : null
          // }
          tileDisabled={({ date }) => isDisabled(date)}
        />
      )}
      {/* Hiển thị khung giờ */}
      <div className="time-slots">
        {hours && (
          <>
            <div className="slot-container flex gap-10">
              {hours.map((hour, index) => (
                <div>
                  <Button outline key={index} className="time-slot">
                    {extractTime(hour.start)} - {extractTime(hour.end)}
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CustomCalendar;
