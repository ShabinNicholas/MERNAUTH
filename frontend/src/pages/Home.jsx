import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      
      <div className="text-center">
        <h1 className="mb-3">Task Management App</h1>
        <p className="mb-4 text-muted">
          Organize your tasks, set priorities, and stay productive 🚀
        </p>

        <div className="d-flex gap-3 justify-content-center">
          <Link to="/signup">
            <button className="btn btn-success px-4">
              Signup
            </button>
          </Link>

          <Link to="/signin">
            <button className="btn btn-primary px-4">
              Signin
            </button>
          </Link>
        </div>
      </div>

      {/* Optional footer */}
      <p className="position-absolute bottom-0 mb-3 text-muted">
        © 2026 Task Manager
      </p>
    </div>
  );
};

export default Home;