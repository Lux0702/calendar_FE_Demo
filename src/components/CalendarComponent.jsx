import React ,{ useState, useEffect, useRef} from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import '../assets/css/tailwind.css'
import { Message } from 'primereact/message';
import { formatDate, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { Dialog } from 'primereact/dialog';
import { Dropdown, Menu } from 'antd';

function CalendarComponent({events, setEvents}) {
  const [visible, setVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentView, setCurrentView] = useState('dayGridMonth'); 
  const handleDateClick = (arg) => {
    alert(arg.dateStr)
  }
  // const events = [
  //   {
  //     title: "Event 1",
  //     start: "2024-11-08T10:00",
  //     end: "2024-11-08T12:00",
  //     description: "Meeting",
  //     location: "Room A",
  //     allDay: false,
  //     url: "https://example.com",
  //     type: "Webinar",
  //   },
  //   {
  //     title: "Event 2",
  //     start: "2024-11-09T10:00",
  //     end: "2024-11-09T12:00",
  //     description: "Meeting",
  //     allDay: false,
  //     type: "Meeting",
  //   }
  // ];
  const items = [
    { label: 'Month View', key: 'dayGridMonth' },
    { label: 'Week View', key: 'timeGridWeek' },
    { label: 'Day View', key: 'timeGridDay' },
  ];
  const menu = (
    <Menu
      onClick={(e) => handleChangeView(e.key)}  // Handle view change on menu item click
      selectedKeys={[currentView]}  // Set the selected key based on current view
    >
      {items.map(item => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );
  const handleDateSelect = (selectInfo) => {
    const start = formatDate(selectInfo.start, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const end = formatDate(selectInfo.end, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    console.log(`Selected range: ${start} to ${end}`);
  };
  const handleEventClick = (clickInfo) => {
    clickInfo.jsEvent.preventDefault();
    const event = clickInfo.event;
    setSelectedEvent(event); 
    setVisible(true); 
    console.log(`Event clicked: ${event.title}`);
  };
  const handleEventDidMount = (info) => {
    const event = info.event;
    const eventColor = event.extendedProps.type === "Webinar" ? "#F9BE81" : "#0F4C81";
    const eventBorderColor = event.extendedProps.type === "Webinar" ? "#0F4C81" : "#F9BE81";
    const eventTextColor = event.extendedProps.type === "Webinar" ? "#0F4C81" : "#ffffff";

    info.el.style.backgroundColor = eventColor;
    info.el.style.borderColor = eventBorderColor;
    info.el.style.color = eventTextColor;
    info.el.style.borderRadius = '3px'; 
    info.el.style.borderWidth = '0 0 0 5px';

    if (info.view.type === 'dayGridMonth' && info.el.closest('.fc-daygrid-day')) {
      info.el.closest('.fc-daygrid-day').style.backgroundColor = '#E4F6ED';
    }
   
  };

  const handleEventDrop = (info) => {   
    const updatedEvents = events.map((event) => {
      if (event.title === info.event.title) { 
        return {
          ...event,
          start: info.event.start.toISOString(),
          end: info.event.end ? info.event.end.toISOString() : null,
        };
      }
      return event;
    });
  
    setEvents(updatedEvents);
  
    console.log("Updated Events:", updatedEvents);
    
  };
  const handleventDragStart = (info) => {
      info.event.setExtendedProp('oldDate', info.event.start.toISOString().split('T')[0]);
      if (info.view.type === 'dayGridMonth' && info.el.closest('.fc-daygrid-day')) {
        const currentDayElement = info.el.closest('.fc-daygrid-day');
        if (currentDayElement) {
          currentDayElement.style.backgroundColor = '';
        }
      }
      console.log("oldDate:",info.event.extendedProps.oldDate)
  }
  const calendarRef = useRef(null);
  const handleChangeView = (selectedView) => {
    // Access the calendar instance and change the view
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(selectedView);
  };
  const renderEventContent = (eventInfo) => {
    return (
      <div style={{
        width: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }}>
        <span style={{marginLeft:'2px'}}> {eventInfo.event.title}</span>
      </div>
    );
  };
  return (
    <div className="mb-2 bg-white">
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={'dayGridMonth'}
        ref={calendarRef} 
        headerToolbar={{
          start: "today prev next", 
          center: "title",
          end: "timeGridDay,timeGridWeek,dayGridMonth", 
        }}
        buttonText={{
          today: "Today",
          week: "Week",
          month: "Month",
          day: "Day",
        }}
        height={"100vh"}
        width={"90%"}
        editable={true}
        selectable={true}
        select={function(){
          alert("Tạo sự kiện khi nhấn vào đây...")
        }}
        selectMirror={true} 
        dayMaxEvents={true} 
        dateSelect={handleDateSelect}
        eventClick={handleEventClick}
        events={events}
        eventContent={renderEventContent}
        eventDisplay={true}
        eventDidMount={handleEventDidMount}
        eventDrop={handleEventDrop}
        eventDragStart={handleventDragStart}
      />
      <Dialog
        header="Event Info"
        visible={visible}
        modal={false}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        {selectedEvent && (
          <div>
            <p>
              <strong>Title:</strong>{" "}{selectedEvent.title}
            </p>
            <p>
              <strong>Start:</strong>{" "}
              {formatDate(selectedEvent.start, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p>
              <strong>End:</strong>{" "}
              {selectedEvent.end
                ? formatDate(selectedEvent.end, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "N/A"}
            </p>
            <p>
              <strong>Description:</strong> {selectedEvent.description}
            </p>
            <p>
              <strong>Location:</strong> {selectedEvent.extendedProps.location}
            </p>
            {selectedEvent.url ? (
                <p>
                  <strong>Link access:</strong>{" "}
                  <a href={selectedEvent.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:'under'}}>
                    {selectedEvent.url}
                  </a>
                </p>
              ) : (
                <></>
              )}


            
          </div>
        )}
      </Dialog>
    </div>
  );
}

export default CalendarComponent;