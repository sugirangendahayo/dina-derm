import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import About from "@pages/About";
import Contact from "@pages/Contact";
import Navbar from "@components/ui/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      

      <Routes>

        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/about" element={<About />} /> {/* About page */}
        <Route path="/contact" element={<Contact />} /> {/* Contact page */}
      </Routes>
      
    </Router>
  );
}

export default App;
