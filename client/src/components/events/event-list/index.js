import React from "react";
import EventForm from "../event-form";
import { useSelector } from "react-redux";
import { eventListSelector } from "../../../ducks/events";

function EventList() {
  const events = useSelector(eventListSelector);
  return (
    <div>
      <EventForm />
      {events.length ? null : <h3 data-id="empty-list">Empty list</h3>}
      <ul>
        {events.map((event) => (
          <li key={event.id} data-id="event-list-item">
            {event.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

EventList.propTypes = {};

export default EventList;
