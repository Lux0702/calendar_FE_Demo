import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';  // import css mặc định của react-datepicker
import '../assets/css/tailwind.css'; // Nếu bạn có file cấu hình riêng cho Tailwind

const DatePickerComponent = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="calendar bg-white rounded-lg shadow-md p-6">
          <div className="calendar-header flex justify-between items-center mb-5">
            <button className="text-gray-700 hover:text-gray-900">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MMM yyyy"
              className="text-lg font-bold text-gray-800"
            />
            <button className="text-gray-700 hover:text-gray-900">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            inline
            calendarClassName="calendar-grid grid grid-cols-7 gap-2"
            dayClassName={(date) =>
              `${date.getDate() === selectedDate.getDate() ? 'bg-blue-500 text-white rounded-full' : ''}`
            }
          />
        </div>
      </div>
    );
};

export default DatePickerComponent;
