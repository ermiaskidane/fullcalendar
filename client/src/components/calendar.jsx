import React, { useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import AddEventModal from './AddEventModal'
import axios from 'axios'
import moment from 'moment'

function Calendar() {
  const [modalOpen, setModalOpen] = useState(false)
  const [events, setEvents] = useState([])

  const calendarRef = useRef(null)

  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi()
    // calendarApi.addEvent(event)
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title,
    })
  }

  const handleEventAdd = async (data) => {
    console.log(data)
    await axios.post('/api/calendar/create-cevent', data.event)
  }

  const handleDatesSet = async (data) => {
    const response = await axios.get(
      '/api/calendar/get-events?start=' +
        moment(data.start).toISOString() +
        '&end=' +
        moment(data.end).toISOString()
    )
    setEvents(response.data)
  }
  return (
    <section>
      <button onClick={() => setModalOpen(true)}>Add Event</button>
      <div style={{ position: 'relative', zIndex: 0 }}>
        <FullCalendar
          ref={calendarRef}
          events={events}
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          fixedWeekCount={false}
          showNonCurrentDates={false}
          // weekends={false}
          eventAdd={(event) => {
            handleEventAdd(event)
          }}
          datesSet={(date) => handleDatesSet(date)}
        />
      </div>

      <AddEventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventAdded={(event) => onEventAdded(event)}
      />
    </section>
  )
}

export default Calendar
