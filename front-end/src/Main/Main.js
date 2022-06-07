import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./Main.css";
import Intro from "./Intro.js";
import Upload from "./Upload.js";
import Result from "./Result.js";

// import required modules
import SwiperCore, { Keyboard, Pagination, Mousewheel, Navigation } from "swiper";

SwiperCore.use([Keyboard, Mousewheel, Pagination, Navigation]);

const Main = () => {

    return (
    <div class = "Main">
    <Swiper
      direction={"vertical"}
      speed={800}
      modules={[Pagination]}
      mousewheel
      autoplay={false}
      keyboard={{
        enabled: true
      }}
      pagination={{
        clickable: true
      }}
      className="mySwiper"
      touchRatio={0}
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
      <SwiperSlide><Result /></SwiperSlide>
    </Swiper>
    </div>
  );
}

export default Main;