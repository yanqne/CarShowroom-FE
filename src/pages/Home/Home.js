import Hero from "../../pages/Home/Hero";
import FilterBar from "../../pages/Home/FilterBar";
import About from "../../pages/Home/About";
import VehicleList from "../../pages/Home/VehicleList";


function Home() {
  return (
    <>
      <Hero />
      <FilterBar />
      <VehicleList />
      <About />
    </>
  );
}

export default Home;
