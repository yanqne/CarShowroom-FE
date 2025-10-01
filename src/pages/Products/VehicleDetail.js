import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVehicleById } from "../../services/vehicleService";


function VehicleDetail() {
  const { id } = useParams();
  const [car, setVehicle] = useState(null);

  useEffect(() => {
    fetchVehicleById(id).then(setVehicle).catch(console.error);
  }, [id]);

  if (!car) return <p className="text-center mt-5">Đang tải...</p>;

  return (
    <>
      {/* Header */}
      <header className="detail-hero bg-light border-bottom">
        <div className="container py-4">
          <div className="d-flex flex-wrap align-items-center gap-3">
            <div>
              <h1 className="h3 mb-1">{car?.name || "Tên mẫu xe"}</h1>
              <div className="text-secondary small">
                {car?.variant || "Phiên bản"} • {car?.year || "2025"} •{" "}
                {car?.segment || "Sedan"}
              </div>
            </div>
            <div className="ms-auto d-flex align-items-center gap-3">
              <span className="badge text-bg-success">Có xe giao ngay</span>
              <span className="badge text-bg-primary">{car?.status || "Mới"}</span>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <div className="container my-5">
        <div className="row g-4">
          {/* Left Column */}
          <div className="col-lg-7">
            {/* Carousel */}
            <div
              id="gallery"
              className="carousel slide rounded overflow-hidden shadow-sm"
            >
              <div className="carousel-inner">
                {car.images && car.images.length > 0 ? (
                  car.images.map((img, index) => (
                    <div
                      key={index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                      <img
                        src={img}
                        className="d-block w-100"
                        alt={`Ảnh xe ${index + 1}`}
                      />
                    </div>
                  ))
                ) : (
                  <div className="carousel-item active">
                    <img
                      src={car.thumbnailUrl}
                      className="d-block w-100"
                      alt="Ảnh mặc định"
                    />
                  </div>
                )}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#gallery"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Trước</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#gallery"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Sau</span>
              </button>
            </div>

            {/* Highlights */}
            <div className="row row-cols-2 row-cols-md-4 g-3 mt-2">
              <div className="col">
                <div className="border rounded-3 p-3 small text-center h-100">
                  <div className="fw-semibold">{car?.powerHp || "245hp"}</div>
                  <div className="text-secondary">Công suất</div>
                </div>
              </div>
              <div className="col">
                <div className="border rounded-3 p-3 small text-center h-100">
                  <div className="fw-semibold">{car?.transmission || "AT"}</div>
                  <div className="text-secondary">Hộp số</div>
                </div>
              </div>
              <div className="col">
                <div className="border rounded-3 p-3 small text-center h-100">
                  <div className="fw-semibold">{car?.drivetrain || "RWD"}</div>
                  <div className="text-secondary">Dẫn động</div>
                </div>
              </div>
              <div className="col">
                <div className="border rounded-3 p-3 small text-center h-100">
                  <div className="fw-semibold">
                    {car?.fuelConsumption || "7.2L/100km"}
                  </div>
                  <div className="text-secondary">Mức tiêu thụ</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <ul className="nav nav-tabs mt-4" id="detailTabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#overview"
                  type="button"
                  role="tab"
                >
                  Tổng quan
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#specs"
                  type="button"
                  role="tab"
                >
                  Thông số
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#financing"
                  type="button"
                  role="tab"
                >
                  Trả góp
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#warranty"
                  type="button"
                  role="tab"
                >
                  Bảo hành
                </button>
              </li>
            </ul>
            <div className="tab-content border-bottom border-start border-end p-3 rounded-bottom">
              {/* Tổng quan */}
              <div
                className="tab-pane fade show active"
                id="overview"
                role="tabpanel"
              >
                <p className="mb-2">
                  {car?.description ||
                    "Mô tả ngắn về mẫu xe, thiết kế, công nghệ và trải nghiệm lái."}
                </p>
                <ul className="small text-secondary mb-0">
                  <li>Trang bị an toàn chủ động và bị động đầy đủ</li>
                  <li>Màn hình giải trí hỗ trợ Apple CarPlay/Android Auto</li>
                  <li>Gói hỗ trợ lái tiên tiến</li>
                </ul>
              </div>

              {/* Thông số */}
              <div className="tab-pane fade" id="specs" role="tabpanel">
                <div className="row row-cols-1 row-cols-md-2 g-3">
                  <div>
                    <span className="text-secondary small">Động cơ</span>
                    <div className="fw-semibold">
                      {car?.engine || "2.0L Turbo"}
                    </div>
                  </div>
                  <div>
                    <span className="text-secondary small">Mô-men xoắn</span>
                    <div className="fw-semibold">
                      {car?.torqueNm || "370Nm"}
                    </div>
                  </div>
                  <div>
                    <span className="text-secondary small">Kích thước</span>
                    <div className="fw-semibold">
                      {car?.dimensions || "4750x1820x1440mm"}
                    </div>
                  </div>
                  <div>
                    <span className="text-secondary small">Khoang hành lý</span>
                    <div className="fw-semibold">{car?.trunkL || "480L"}</div>
                  </div>
                  <div>
                    <span className="text-secondary small">Chỗ ngồi</span>
                    <div className="fw-semibold">{car?.seats || "5"}</div>
                  </div>
                </div>
              </div>

              {/* Trả góp */}
              <div className="tab-pane fade" id="financing" role="tabpanel">
                <div className="row g-3 align-items-center">
                  <div className="col-md-6">
                    <div className="p-3 border rounded-3">
                      <div className="small text-secondary">Giá niêm yết</div>
                      <div className="fs-5 fw-bold text-primary">
                        {car?.priceVnd
                          ? car.priceVnd.toLocaleString("vi-VN") + " ₫"
                          : "1.999.000.000₫"}
                      </div>
                      <hr />
                      <div className="small text-secondary">Dự kiến trả trước</div>
                      <div className="fw-semibold">
                        {car?.downPayment || "20%"}
                      </div>
                      <div className="small text-secondary">Kỳ hạn</div>
                      <div className="fw-semibold">
                        {car?.tenor || "60 tháng"}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 small text-secondary">
                    Lãi suất ưu đãi theo từng thời kỳ. Vui lòng liên hệ để nhận
                    bảng tính chi tiết theo hồ sơ thực tế.
                  </div>
                </div>
              </div>

              {/* Bảo hành */}
              <div className="tab-pane fade" id="warranty" role="tabpanel">
                <ul className="mb-0 small text-secondary">
                  <li>Bảo hành chính hãng 3 năm hoặc 100.000km</li>
                  <li>Bảo dưỡng định kỳ tại hệ thống đại lý toàn quốc</li>
                  <li>Hỗ trợ cứu hộ 24/7</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar (Right Column) */}
          <div className="col-lg-5">
            <div className="border rounded-3 p-3 position-sticky top-20">
              <div className="d-flex align-items-start gap-3">
                <img
                  src={
                    car?.thumbnail ||
                    car?.images?.[0] ||
                    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=600&auto=format&fit=crop"
                  }
                  className="rounded"
                  alt="thumb"
                  width="120"
                  height="80"
                  style={{ objectFit: "cover" }}
                />
                <div className="flex-grow-1">
                  <div className="fw-semibold">{car?.name || "Tên mẫu xe"}</div>
                  <div className="small text-secondary">
                    {car?.variant || "Phiên bản"}
                  </div>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between">
                <div className="small text-secondary">Giá chỉ từ</div>
                <div className="fs-4 fw-bold text-primary">
                  {car?.priceVnd
                    ? car.priceVnd.toLocaleString("vi-VN") + " ₫"
                    : "1.999.000.000₫"}
                </div>
              </div>
              <div className="d-grid gap-2 mt-3">
                <button className="btn btn-primary">
                  <i className="bi bi-clipboard2-check me-1"></i>Nhận báo giá
                </button>
                <button className="btn btn-outline-primary">
                  <i className="bi bi-car-front me-1"></i>Đặt lịch lái thử
                </button>
              </div>
              <div className="mt-3 small">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-check2-circle text-success"></i>Bảo hành
                  chính hãng
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-check2-circle text-success"></i>Hỗ trợ trả
                  góp
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-check2-circle text-success"></i>Giao xe nhanh
                </div>
              </div>
              <hr />
              <div className="small">
                <div className="fw-semibold mb-1">Màu sắc</div>
                <div className="d-flex gap-2">
                  {car.colors?.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColorId(color.id)}
                      className={`color-dot ${selectedColorId === color.id ? "selected" : ""}`}
                      style={{
                        backgroundColor: color.hex,
                        border:
                          color.hex.toLowerCase() === "#ffffff" ? "1px solid #000" : "none"
                      }}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VehicleDetail;
