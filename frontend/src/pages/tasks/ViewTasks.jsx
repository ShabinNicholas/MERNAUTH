import React from "react";
import { Link } from "react-router-dom";

const ViewTasks = () => {
  return (
    <div>
      <h1>View Tasks</h1>
      <Link to="/create">
        <button>Create task</button>
      </Link>
    </div>
  );
};

export default ViewTasks;
