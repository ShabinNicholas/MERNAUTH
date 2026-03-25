import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [details, setDetails] = useState({
    userEmailId: "",
    userPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:3000/signin", details);
      console.log(res);
      setMessage("Signing in please wait...");
      if (res.data.message == "Login successful") {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        navigate("/view");
      } else {
        setMessage("Invalid emailId or Password");
      }
    } catch (error) {
      console.log(error);
      setMessage("Invalid Credentials");
    }
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "400px" }}>
        <h1 className="text-center mb-4">Signin</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Enter your email"
              name="userEmailId"
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              placeholder="Enter your password"
              name="userPassword"
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Signin
            </button>
          </div>
        </form>

        <p className="text-center mt-3">
          New user? <Link to="/signup">Signup</Link>
        </p>

        {message && (
          <p className="text-center text-danger mt-2">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Signin;