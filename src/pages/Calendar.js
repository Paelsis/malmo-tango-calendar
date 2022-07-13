import React, {useState, useEffect} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment-with-locales-es6'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../style.css';
import {getEvents} from '../services/getEvents'
import DialogSlide from './DialogSlide'
import SmallCalendarView from './SmallCalendarView'
import AppBarSmallCalendarView from './SmallCalendarView'
import { isMobile} from "react-device-detect";

const DeviceDetector = () => (
  <div>I am rendered on: {isMobile ? "Mobile" : "Desktop"}</div>
);


const calendarId=process.env.REACT_APP_CALENDAR_ID
const apiKey=process.env.REACT_APP_API_KEY

const calendarId_TK=process.env.REACT_APP_CALENDAR_ID_TK
const apiKey_TK=process.env.REACT_APP_API_KEY


const localizer = momentLocalizer(moment)

function Cal() {
  const [events_TS, setEvents_TS] = useState([])
  const [events_TK, setEvents_TK] = useState([])
  const [open, setOpen] = useState(false)
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  useEffect(()=>{
    const timeMin = moment().startOf('day')
    const timeMax = moment().endOf('month').add(3,'months').add(7, 'days')
    getEvents(
      calendarId,
      apiKey,
      events => setEvents_TS(events),
      timeMin.format('YYYY-MM-DD') + 'T00:00:00Z', 
      timeMax.format('YYYY-MM-DD') + 'T23:59:00Z',
      'SV'
    )
    getEvents(
      calendarId_TK,
      apiKey_TK,
      events => setEvents_TK(events),
      timeMin.format('YYYY-MM-DD') + 'T00:00:00Z', 
      timeMax.format('YYYY-MM-DD') + 'T23:59:00Z',
      'SV'
    )
  }, [])

  const handleEvent = e=>{setDescription(e.description); setLocation(e.location); setOpen(true)}
  const events = [...events_TS, ...events_TK].sort((a,b)=>a.start.localeCompare(b.start))
  return (
    <div className="App">
          {isMobile?
            <SmallCalendarView 
                      events={events} 
                      handleEvent={handleEvent} 
            />
          : 
            <Calendar
              v
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={handleEvent}
              eventPropGetter={(ev, start, end, isSelected) => (
                {style:ev.style})} 
              views={['month', 'agenda']}
              style={{ height: '90vh' }}
            />
        }  

        <DialogSlide
          open={open}
          setOpen={setOpen}
          description={description}
          location={location}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        />    
    </div>
  );
}

export default Cal;
