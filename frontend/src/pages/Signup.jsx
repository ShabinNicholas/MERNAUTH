import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    userName: "",
    userEmailId: "",
    userPassword: "",
  });

  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/signup", formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userName"
          placeholder="Enter Name"
          value={formData.userName}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="email"
          name="userEmailId"
          placeholder="Enter Email"
          value={formData.userEmailId}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="password"
          name="userPassword"
          placeholder="Enter Password"
          value={formData.userPassword}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account? <Link to='/signin'>Signin</Link>
      </p>

      <p>{message}</p>
    </div>
  );
}

export default Signup;
