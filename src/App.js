// src/App.js
import React from "react";
import Home from "./pages/Home/Home";
import VehicleDetail from "./pages/Products/VehicleDetail";
import { Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Trang chủ */}
        <Route path="/" element={<Home />} />

        {/* Trang chi tiết xe */}
        <Route path="/Vehicle/:id" element={<VehicleDetail />} />
      </Routes>
      <Contact />
      <Footer />
    </>

  );
}

export default App;
