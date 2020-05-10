import React, { useEffect } from "react";
import EventForm from "../event-form";
import { useDispatch, useSelector } from "react-redux";
import { eventListSelector, fetchEvents } from "../../../ducks/events";

function EventList() {
  const dispatch = useDispatch();
  const events = useSelector(eventListSelector);
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch, fetchEvents]);
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
