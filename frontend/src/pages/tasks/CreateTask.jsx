import axios from "axios";
import { useState } from "react";
import { handleLogout } from "../../components/logout";

const CreateTask = () => {
  const token = localStorage.getItem("accessToken");
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
      let res = await axios.post(
        "http://localhost:3000/task/createTask",
        details,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.data.message == "Task Saved") {
        alert("Task saved successfully");
      }
    } catch (error) {
      console.log("Error in adding task", error);
    }
  }
  return (
    <div>
      <h1>CreateTask</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Task name"
          onChange={handleChange}
          name="taskName"
        />
        <br /> <br />
        <select onChange={handleChange} name="taskPriority">
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <br /> <br />
        <input type="date" name="taskDeadline" onChange={handleChange} />
        <br /> <br />
        <button type="submit">Add</button>
      </form>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default CreateTask;
