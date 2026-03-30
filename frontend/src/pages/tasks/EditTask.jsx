import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, useParams, Link } from "react-router-dom";
import { handleLogout } from "../../components/logout";
import Navbar from "../../components/Navbar";

const EditTask = () => {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    taskName: "",
    taskPriority: "High",
    taskDeadline: "",
  });

  const { id } = useParams();

  function handleChange(e) {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function getSingleTask() {
    try {
      let res = await axiosInstance.get(`/task/getOne/${id}`);
      const task = res.data.data;

      let formattedDate = task.taskDeadline
        ? task.taskDeadline.split("T")[0]
        : "";

      setDetails({
        ...task,
        taskDeadline: formattedDate,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function updateTask(e) {
    e.preventDefault();
    try {
      let res = await axiosInstance.put(`/task/editTask/${id}`, details);

      if (res.data.message === "Task updated successfully") {
        alert("Task updated successfully");
        navigate("/view");
      }
    } catch (error) {
      console.log("Error updating task", error);
    }
  }

  useEffect(() => {
    getSingleTask();
  }, []);

  return (
    <div className="container mt-5">
      <Navbar />

      {/* 🔥 Card */}
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h4 className="text-center mb-4">Update Your Task</h4>

        <form onSubmit={updateTask}>
          <div className="mb-3">
            <input
              type="text"
              name="taskName"
              value={details.taskName}
              onChange={handleChange}
              className="form-control"
              placeholder="Task Name"
            />
          </div>

          <div className="mb-3">
            <select
              name="taskPriority"
              value={details.taskPriority}
              onChange={handleChange}
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
              value={details.taskDeadline}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-warning">
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
