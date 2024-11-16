import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function ScheduleCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventDialog, setEventDialog] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [events, setEvents] = useState([]);

  const onDateSelect = (e) => {
    setSelectedDate(e.value);
    setEventDialog(true);
  };

  const saveEvent = () => {
    const newEvent = {
      title: eventTitle,
      date: selectedDate,
    };
    setEvents([...events, newEvent]);
    setEventTitle('');
    setEventDialog(false);
  };

  const eventList = events.map((event, index) => (
    <div key={index}>
      <strong>{event.title}</strong> - {event.date.toLocaleString()}
    </div>
  ));

  return (
    <div>
      <h2>Schedule Calendar</h2>
      <Calendar value={selectedDate} onChange={onDateSelect} showIcon />
      <Dialog
        header="Add Event"
        visible={eventDialog}
        style={{ width: '300px' }}
        footer={
          <Button label="Save" icon="pi pi-check" onClick={saveEvent} />
        }
        onHide={() => setEventDialog(false)}
      >
        <InputText
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          placeholder="Event Title"
        />
      </Dialog>

      <h3>Event List</h3>
      <div>{eventList}</div>
    </div>
  );
}

export default ScheduleCalendar;
