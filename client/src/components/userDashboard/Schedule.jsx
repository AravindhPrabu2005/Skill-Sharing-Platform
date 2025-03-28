import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!


const Schedule = () => {
  return (
    <div className='h-screen w-full m-5 overflow-y-scroll '>
  <FullCalendar
      plugins={[ dayGridPlugin ]}
      initialView="dayGridMonth"
      events={[
        { title: 'Java Webinar', date: '2025-03-12' },
        { title: 'Iot Workshop', date: '2025-03-16' }
      ]}
    />
    </div>
  )
}

export default Schedule