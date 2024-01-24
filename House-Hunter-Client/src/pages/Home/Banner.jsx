import { Link } from "react-router-dom";
import Container from "../../components/shared/Container";

const Banner = () => {
  return (
    <Container>
      <div className="w-full h-screen bg-[url(../public/Picture1.png)] bg-no-repeat bg-center bg-cover flex justify-start items-center">
        <div
          className=" h-full flex flex-col justify-center items-start ml-6 gap-6"
          data-aos="zoom-in"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
        >
          <h1 className="text-left text-white text-[50px] font-bold leading-[70px]">
            Book your dream <br />
            house with Us Today!
          </h1>

          <Link
            to="/surveys"
            className="btn bg-[#FE7E51] hover:bg-white text-lg text-white hover:text-[#FE7E51] border-none"
          >
            Explore <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>{" "}
      </div>
    </Container>
  );
};

export default Banner;
