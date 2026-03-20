import axios from "axios";
import { useState } from "react";

const CreateTask = () => {
  const [details, setDetails] = useState({
    taskName: "",
    taskPriority: "",
    taskDeadline: "",
  });

  function handleChange(e) {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function addTask(e) {
    try {
      e.preventDefault();
      let res = await axios.post("http://localhost:3000/createTask", details);
      console.log(res);
    } catch (error) {
      console.log("Error in adding task", error);
    }
  }
  return (
    <div>
      <h1>CreateTask</h1>
      <form onSubmit={addTask}>
        <input type="text" placeholder="Task name" onChange={handleChange} />
        <br /> <br />
        <select onChange={handleChange}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <br /> <br />
        <input type="date" />
        <br /> <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default CreateTask;
