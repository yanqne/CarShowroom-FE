

export default function About(){
    return(
        <section id="about" className="py-5 bg-body-tertiary">
    <div className="container">
      <div className="row g-4 align-items-center">
        <div className="col-lg-6">
          <h2 className="h3">Vì sao chọn chúng tôi?</h2>
          <p className="text-secondary">Đội ngũ tư vấn chuyên nghiệp, minh bạch chi phí, hỗ trợ ngân hàng nhanh chóng.</p>
          <div className="row g-3">
            <div className="col-6">
              <div className="p-3 border rounded-3 h-100">
                <div className="fw-bold"><i className="bi bi-patch-check-fill text-primary me-2"></i>Chính hãng 100%</div>
                <div className="small text-secondary mt-1">Xe mới, bảo hành toàn quốc</div>
              </div>
            </div>
            <div className="col-6">
              <div className="p-3 border rounded-3 h-100">
                <div className="fw-bold"><i className="bi bi-cash-coin text-primary me-2"></i>Giá tốt</div>
                <div className="small text-secondary mt-1">Nhiều ưu đãi theo tháng</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <img className="img-fluid rounded shadow" src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=1480&auto=format&fit=crop" alt="About showroom"/>
        </div>
      </div>
    </div>
  </section>
    );
}