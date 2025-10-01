import React from "react";


export default function FilterBar(){
    return (
        <section className="py-4 bg-body-tertiary">
    <div className="container">
      <div className="filter-bar d-flex flex-wrap gap-2">
        <input type="text" className="form-control" placeholder="Tìm theo tên, phiên bản..."/>
        <select className="form-select">
          <option value="">Hãng xe</option>
          <option>Mercedes</option>
          <option>BMW</option>
          <option>Audi</option>
          <option>Toyota</option>
        </select>
        <select className="form-select">
          <option value="">Phân khúc</option>
          <option>Sedan</option>
          <option>SUV</option>
          <option>Hatchback</option>
          <option>Pickup</option>
        </select>
        <button className="btn btn-primary ms-auto"><i className="bi bi-funnel me-1"></i>Lọc</button>
      </div>
    </div>
  </section>
    );
}