import react, {useEffect, useState} from "react";
import { fetchVehicles } from "../../services/vehicleService.js";
import { Link } from "react-router-dom";



export default function VehicleList(){
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        fetchVehicles().then(setVehicles).catch(console.error);
    },
[]);
return(
    <section id="cars" className="py-5">
      <div className="container">
        <h2 className="h3 mb-3">Xe nổi bật</h2>
        <div className="row g-4">
          {vehicles.map((car) => (
            <div key={car.id} className="col-12 col-sm-6 col-lg-4">
              <div className="card car-card h-100">
                <img src={car.thumbnailUrl} className="card-img-top" alt={car.name} />
                <div className="card-body">
                  <h5 className="card-title">{car.name}</h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-primary">{car.priceVnd.toLocaleString("vi-VN")} VND</span>
                    <Link to={`/vehicle/${car.id}`} className="btn btn-outline-primary btn-sm">
                  Chi tiết
                </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
);
}

