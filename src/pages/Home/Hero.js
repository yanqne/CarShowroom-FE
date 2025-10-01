import React from "react";


export default function Hero() {
    return (
        <section className="hero">
            <div className="container">
                <div className="row align-items-center g-4">
                    <div className="col-lg-7">
                        <h1 className="display-5 fw-bold">Khám phá những mẫu xe mới nhất</h1>
                        <p className="lead mt-3">Giá tốt - Giao xe nhanh - Hỗ trợ trả góp linh hoạt.</p>
                        <div className="d-flex gap-2 mt-3">
                            <a href="#cars" className="btn btn-light btn-lg"><i className="bi bi-grid-3x3-gap me-1"></i>Xem bộ sưu tập</a>
                            <a href="#contact" className="btn btn-outline-light btn-lg"><i className="bi bi-wallet2 me-1"></i>Báo giá nhanh</a>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <img className="img-fluid rounded shadow" src="https://images.unsplash.com/photo-1549921296-3fdc4f104f3b?q=80&w=1480&auto=format&fit=crop" alt="Showroom car"/>
                    </div>
                </div>
            </div>
        </section>
    );
}