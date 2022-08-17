import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminHome from "./pages/AdminHome";
import StudentHome from "./pages/StudentHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/student-home" element={<StudentHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
