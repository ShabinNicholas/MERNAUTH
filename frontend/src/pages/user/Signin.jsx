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
    <div>
      <h1>Signin</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          name="userEmailId"
          onChange={handleChange}
        />
        <br /> <br />
        <input
          type="password"
          placeholder="Enter your password"
          name="userPassword"
          onChange={handleChange}
        />
        <br /> <br />
        <button type="submit">Signin</button>
      </form>
      <p>
        New user? <Link to="/signup">Signup</Link>
      </p>
      <p>{message}</p>
    </div>
  );
};

export default Signin;
