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
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Signup</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="userName"
              placeholder="Enter Name"
              value={formData.userName}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="userEmailId"
              placeholder="Enter Email"
              value={formData.userEmailId}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="userPassword"
              placeholder="Enter Password"
              value={formData.userPassword}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-success">
              Signup
            </button>
          </div>
        </form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/signin">Signin</Link>
        </p>

        {message && (
          <p className="text-center text-info mt-2">{message}</p>
        )}
      </div>
    </div>
  );
}

export default Signup;