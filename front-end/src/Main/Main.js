import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./Main.css";
import Intro from "./Intro.js";
import Upload from "./Upload.js";

// import required modules
import { Pagination } from "swiper";

const Main = () => {
    return (
    <div class = "Main">
    <Swiper
      direction={"vertical"}
      pagination={{
        clickable: true
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      <SwiperSlide>
        <div class = "start">
            <div id = "sentence"> Animal Behavior </div>
            <div> Briefly Analyze in <strong> B-fact </strong></div>
            <div class = "start_button">
              <button> I'm a Newbie </button>
              <button> Already Got it </button>
            </div>  
        </div>
      </SwiperSlide>
      <SwiperSlide><Intro /></SwiperSlide>
      <SwiperSlide><Upload /></SwiperSlide>
      <SwiperSlide>Result</SwiperSlide>
    </Swiper>
    </div>
  );
}

export default Main;