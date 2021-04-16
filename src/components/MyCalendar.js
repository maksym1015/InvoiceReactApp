import React from "react";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function MyCalendar({ events, handleSelect }) {
  return (
    <div>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable
        eventClick={(info) =>
          alert(
            `${info.event.title} @ ${info.event.startStr} - ${info.event.endStr}`
          )
        }
        select={handleSelect}
        events={events}
        validRange={(now) => {return {start: now}}}
      />
    </div>
  );
}
