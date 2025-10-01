export async function fetchVehicles() {
  const response = await fetch("http://localhost:8080/api/vehicle");
  if (!response.ok) {
    throw new Error("Lỗi khi gọi API");
  }
  return response.json();
}
export async function fetchVehicleById(id) {
  const response = await fetch(`http://localhost:8080/api/vehicle/${id}`);
  if(!response.ok){
    throw new Error("Lỗi khi gọi API");
  }
  return response.json();
  
}