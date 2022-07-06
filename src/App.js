import React, {useState, useEffect} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment-with-locales-es6'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style.css';
import {getEvents} from './getEvents'

const calendarId='tangokompaniet@gmail.com'
const apiKey='AIzaSyB0EBiE8xd5ItS59IahMyficWWAanHhMzU' 

const localizer = momentLocalizer(moment)

function App() {
  const [events, setEvents] = useState([])
  useEffect(()=>{
    const timeMin = moment().startOf('day')
    const timeMax = moment().endOf('month').add(6,'months').add(7, 'days')
    getEvents(
      calendarId,
      apiKey,
      events => setEvents(events),
      timeMin.format('YYYY-MM-DD') + 'T00:00:00Z', 
      timeMax.format('YYYY-MM-DD') + 'T23:59:00Z',
      'SV'
    )
  }, [])

  const handleEvent = e=>alert(e.description)



  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{textAlign:'center', color:'orange'}}>Malmö tango kalender</h1>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleEvent}
          style={{ height: 500 }}
        />
      </header>
    </div>
  );
}

export default App;
