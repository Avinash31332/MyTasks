import React from "react";
import Task from "./components/Task";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Home from "./pages/Home";
import BackButton from "./components/BackButton";
import { Route, Routes } from "react-router-dom";
import CreateTask from "./pages/CreateTask";
import UpdateTask from "./pages/UpdateTask";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks/create" element={<CreateTask />} />
        <Route path="/tasks/update/:id" element={<UpdateTask />} />
      </Routes>
    </div>
  );
}

export default App;
