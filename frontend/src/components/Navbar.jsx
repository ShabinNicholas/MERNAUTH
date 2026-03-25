import { Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../components/logout";

const Navbar = () => {
  const navigate = useNavigate();

  function logoutHandler() {
    handleLogout();
    navigate("/signin");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/view">
        Task Manager
      </Link>

      <div className="ms-auto">
        <Link to="/view" className="btn btn-outline-light me-2">
          View Tasks
        </Link>

        <Link to="/create" className="btn btn-outline-light me-2">
          Create Task
        </Link>

        <button className="btn btn-danger" onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;