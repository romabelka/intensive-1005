import React from "react";
import { useAuthorized } from "../../ducks/auth";

function AdminPage() {
  const isAuthorized = useAuthorized();

  if (!isAuthorized) return <h1>Not authorized</h1>;

  return (
    <div>
      <h1>Admin</h1>
    </div>
  );
}

export default AdminPage;
