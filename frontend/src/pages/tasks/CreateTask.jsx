// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { useState } from "react";
import { handleLogout } from "../../components/logout";
import Navbar from "../../components/Navbar";

const CreateTask = () => {
  const [details, setDetails] = useState({
    taskName: "",
    taskPriority: "High",
    taskDeadline: "",
  });

  function handleChange(e) {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function addTask(e) {
    try {
      e.preventDefault();
      let res = await axiosInstance.post("/task/createTask", details);
      console.log(res);

      if (res.data.message == "Task saved") {
        alert("Task saved successfully");
        setDetails({
          taskName: "",
          taskPriority: "High",
          taskDeadline: "",
        });
      }
    } catch (error) {
      console.log("Error in adding task", error);
    }
  }

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h1 className="text-center mb-4">Create Task</h1>

        <form onSubmit={addTask}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Task name"
              onChange={handleChange}
              name="taskName"
              value={details.taskName}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <select
              onChange={handleChange}
              name="taskPriority"
              value={details.taskPriority}
              className="form-select"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="mb-3">
            <input
              type="date"
              name="taskDeadline"
              onChange={handleChange}
              value={details.taskDeadline}
              className="form-control"
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Add Task
            </button>
          </div>
        </form>

        <hr />

        <div className="d-grid">
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default CreateTask;