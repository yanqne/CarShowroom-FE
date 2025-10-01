// src/components/Navbar.js
import React from "react";
import '../assets/styles.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top shadow-sm">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2" href="#">
          <i className="bi bi-steering-wheel"></i>
          <span>AutoShowroom</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item"><a className="nav-link active" href="#">Trang chủ</a></li>
            <li className="nav-item"><a className="nav-link" href="#cars">Dòng xe</a></li>
            <li className="nav-item"><a className="nav-link" href="#about">Giới thiệu</a></li>
            <li className="nav-item"><a className="nav-link" href="#contact">Liên hệ</a></li>
            <li className="nav-item ms-lg-3">
              <a className="btn btn-primary" href="#contact">
                <i className="bi bi-telephone me-1"></i>Tư vấn ngay
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
