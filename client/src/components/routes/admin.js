import React from "react";
import { useAuthorized } from "../../ducks/auth";
import { NavLink, Route } from "react-router-dom";
import EventList from "../events/event-list";

function AdminPage() {
  const isAuthorized = useAuthorized();

  if (!isAuthorized) return <h1>Not authorized</h1>;

  return (
    <div>
      <h1>Admin</h1>
      <NavLink to="/admin/new-event">Add Event</NavLink>
      <Route path="/admin/new-event" component={EventList} />
    </div>
  );
}

export default AdminPage;
