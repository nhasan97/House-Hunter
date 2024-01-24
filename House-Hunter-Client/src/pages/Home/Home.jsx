import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import AllHouses from "./AllHouses/AllHouses";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>House Hunter | Home</title>
      </Helmet>
      <Banner></Banner>
      <AllHouses></AllHouses>
    </div>
  );
};

export default Home;
