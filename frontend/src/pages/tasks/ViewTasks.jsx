import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { handleLogout } from "../../components/logout";
import Navbar from "../../components/Navbar";

const ViewTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const res = await axiosInstance.get("/task/getAll");
      console.log(res);

      setTasks(res.data.taskList || []);
    } catch (error) {
      console.log("Error fetching tasks", error);
    }
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  async function handleDelete() {
    try {
      await axiosInstance.delete(`/task/deleteTask/${selectedId}`);
      setShowModal(false);
      fetchTasks();
    } catch (error) {
      console.log("Error deleting task", error);
    }
  }

  function handleEdit(id) {
    navigate(`/edit/${id}`);
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>View Tasks</h1>
        </div>

        <div className="card shadow p-3">
          {tasks.length === 0 ? (
            <p className="text-center">No tasks available</p>
          ) : (
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Task Name</th>
                  <th>Priority</th>
                  <th>Deadline</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id}>
                    <td>{task.taskName}</td>
                    <td>{task.taskPriority}</td>
                    <td>{formatDate(task.taskDeadline)}</td>

                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(task._id)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          setSelectedId(task._id);
                          setShowModal(true);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {showModal && (
        <div className="modal fade show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                Are you sure you want to delete this task?
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewTasks;
