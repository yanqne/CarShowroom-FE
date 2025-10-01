import '../assets/styles.css';

export default function Contact(){
    return(
        <section id="contact" className="py-5">
    <div className="container">
      <div className="row g-4">
        <div className="col-lg-6">
          <h2 className="h3 mb-3">Liên hệ tư vấn</h2>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Họ và tên</label>
              <input type="text" className="form-control" placeholder="Nguyễn Văn A"/>
            </div>
            <div className="col-md-6">
              <label className="form-label">Số điện thoại</label>
              <input type="tel" className="form-control" placeholder="09xx xxx xxx"/>
            </div>
            <div className="col-12">
              <label className="form-label">Mẫu xe quan tâm</label>
              <input type="text" className="form-control" placeholder="VD: Mercedes C300, BMW X5..."/>
            </div>
            <div className="col-12">
              <label className="form-label">Nội dung</label>
              <textarea className="form-control" rows="4" placeholder="Nhu cầu, ngân sách dự kiến..."></textarea>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary"><i className="bi bi-send me-1"></i>Gửi yêu cầu</button>
            </div>
          </form>
        </div>
        <div className="col-lg-6">
          <div className="h-100 p-4 border rounded-3">
            <h3 className="h5">Thông tin showroom</h3>
            <div className="mt-2 small">
              <div className="mb-2"><i className="bi bi-geo-alt-fill text-primary me-2"></i>123 Đường Trưng Bày, Q.1, TP.HCM</div>
              <div className="mb-2"><i className="bi bi-telephone-fill text-primary me-2"></i>0901 234 567</div>
              <div className="mb-2"><i className="bi bi-envelope-fill text-primary me-2"></i>sales@autoshowroom.vn</div>
              <div className="mb-2"><i className="bi bi-clock-fill text-primary me-2"></i>08:30 - 20:30 (T2 - CN)</div>
            </div>
            <hr/>
            <div className="ratio ratio-16x9">
              <iframe src="https://www.google.com/maps?q=Ho+Chi+Minh+City&output=embed" className="rounded" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Bản đồ"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    );
}