import axios from "axios";
import { useState } from "react";

const Signin = () => {
  const [details, setDetails] = useState({
    userEmailId: "",
    userPassword: "",
  });
  function handleChange(e) {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:3000/signin", details);
      console.log(res);
    } catch (error) {
      console.log(error);
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
    </div>
  );
};

export default Signin;
