import './App.css';
import CalendarComponent from './components/CalendarComponent';
import UpcomingEvents from './components/UpcomingEvents';
import ScheduleCalendar from './components/Schedule';
import { Calendar } from 'primereact/calendar';
import React, {Fragment, useState} from 'react';
import DatePickerComponent from './components/DatePickerComponent';
function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents]= useState([
    {
      title: "Event 1",
      start: "2024-11-13T10:00",
      end: "2024-11-13T12:00",
      description: "Meeting",
      location: "Room A",
      allDay: false,
      url: "https://example.com",
      type: "Webinar",
    },
   
    {
      title: 'Webinar: How to cope with trauma in professional life',
      start: "2024-11-13T11:00",
      end: "2024-11-13T13:00",
      description: "Meeting",
      location: "Room A",
      allDay: false,
      url: "https://example.com",
      type: "Meeting",

    },
    {
      title: 'First Session with Alex Stan',
      start: "2024-11-14T13:00",
      end: "2024-11-14T13:30",
      location: "Room A",
      allDay: false,
      url: "https://example.com",
      type: "Meeting",

    }
  ])
  const onDateSelect = (e) => {
    setSelectedDate(e.value);
  };

  return (
    <div className="App parent" >
      <div class="div1">
        <Calendar value={selectedDate} onChange={onDateSelect} inline showWeek    />
        <hr/>
        <UpcomingEvents events={events} selectedDate={selectedDate} />
    
      </div>
      <div class="div6">   
            <CalendarComponent events={events} setEvents={setEvents}/>
      </div>
    </div>
  );
}

export default App;
