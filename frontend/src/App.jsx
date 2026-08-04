import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Posts from "./pages/Posts";
import RoadMap from "./pages/RoadMap";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Singup";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile"

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-28">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/roadmap" element={<RoadMap />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;