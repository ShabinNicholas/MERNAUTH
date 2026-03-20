import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/user/Signup";
import Home from "./pages/Home";
import Signin from "./pages/user/Signin";
import CreateTask from "./pages/tasks/CreateTask";
import EditTask from "./pages/tasks/EditTask";
import ViewTasks from "./pages/tasks/ViewTasks";
import ViewTask from "./pages/tasks/ViewTask";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        <Route path="/create" element={<CreateTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
        <Route path="/view" element={<ViewTasks />} />
        <Route path="/view/:id" element={<ViewTask />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
