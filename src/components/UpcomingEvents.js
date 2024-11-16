import React, { Fragment } from 'react';
import '../assets/css/tailwind.css';
import { Message } from 'primereact/message';
import { Avatar } from 'primereact/avatar';
import 'primeicons/primeicons.css';

function formatTimeRange(startTimeISO, endTimeISO) {
  const startDate = new Date(startTimeISO);
  const endDate = new Date(endTimeISO);

  const options = { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'GMT' };

  const startTimeFormatted = startDate.toLocaleTimeString('en-US', options);
  const endTimeFormatted = endDate.toLocaleTimeString('en-US', options);

  return `${startTimeFormatted} - ${endTimeFormatted} GMT+7`;
}
const formatDate = (date) => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
function EventItem({ event }) {
  return (
    <Fragment>
      <div className="flex flex-col items-start w-full p-1 text-left mt-gray">
          <div className="flex items-center justify-between w-full">
            <div className="flex-1">
              <div className="text-lg font-medium text-left">{event.title}</div>
              <div className="text-sm text-gray-600">
                {formatTimeRange(event.start, event.end)}
              </div>
            </div>
            {event.type !=='Webinar' ? (
            <Avatar icon='pi pi-video'  size="large"  className="ml-auto text-2xl " shape='circle'  style={{ backgroundColor: '#5684AE',color: '#ffffff',border: '1px solid #5684AE' }}></Avatar>

            ):(<></>)}
          </div>
          {event.url && event.type !=='Webinar' && (
            <a href={event.url} className="inline-flex items-center mt-2 text-sm text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                    <Avatar icon="pi pi-user" className="mr-2" size="large" style={{ backgroundColor: '#5684AE', color: '#ffffff' }} shape="circle" />
                    View Client Profile
            </a>
          )}
        </div>
    </Fragment>
  );
}

function UpcomingEvents({ events, selectedDate }) {
  const filterEventsByDate = (date) => {
    if (!date) return [];

    const selectedDateString = date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    }).split('/').reverse().join('-');
    console.log(selectedDateString);

    return events.filter((event) => {

      const eventDateString = new Date(event.start).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
      }).split('/').reverse().join('-'); 
      
      return selectedDateString === eventDateString;
    });
  };

  const filteredEvents = filterEventsByDate(selectedDate);
  
  return (
    <Fragment>
      <div className="p-4">
        <div className="p-2">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-bold text-darkBlue">Upcoming Events</span>
            <button className="p-2 px-4 py-2 text-white rounded-custom bg-darkBlue hover:bg-blue-800">View All</button>
          </div>
          {selectedDate && <p className="font-bold text-left text-gray-600">Today: {formatDate(selectedDate)}</p>}
        </div>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <Message
              key={index}
              className={`w-full shadow-md justify-content-start ${
                event.type !== "Webinar" ? "non-webinar" : "webinar"
              }`}
              content={<EventItem event={event} />}
            />

          ))
        ) : (
          <p>No events for the selected date.</p>
        )}
      </div>
    </Fragment>
  );
}

export default UpcomingEvents;