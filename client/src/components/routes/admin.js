import React from "react";
import { useAuthorized } from "../../ducks/auth";
import EventForm from "../events/event-form";
import { NavLink, Route } from "react-router-dom";

function AdminPage() {
  const isAuthorized = useAuthorized();

  if (!isAuthorized) return <h1>Not authorized</h1>;

  return (
    <div>
      <h1>Admin</h1>
      <NavLink to="/admin/new-event">Add Event</NavLink>
      <Route path="/admin/new-event" component={EventForm} />
    </div>
  );
}

export default AdminPage;
