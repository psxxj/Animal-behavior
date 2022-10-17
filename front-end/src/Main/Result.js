import './Result.css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import axios from "axios";

// import required modules
import SwiperCore, { EffectCards, Keyboard } from "swiper";

SwiperCore.use([Keyboard]);

const ResultDetail = ({title}) => {
    return (
        <div class = "resultDetail">
            <div class = "image">
            </div>
            <div class = "text_r">
                <div> {title} <sup>improved</sup></div>
                <div> text </div>
            </div>
        </div>
    );
}


const Result = () => {
    return (
        <div class = "Result">
            <div class = "Rtop">
                <div class = "mainTitle">Result</div>
                <div></div>
                <a href = {axios.get("http://127.0.0.1:8000/member/download")} download><button class = "csv_icon"></button></a>
            </div>
            <div class = "Rbottom">
                <Swiper
                    effect={"cards"}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="mySwiper"
                    keyboard={{
                        enabled: true
                    }}
                >
                    <SwiperSlide><h1>Chart</h1></SwiperSlide>
                    <SwiperSlide><ResultDetail title = "Pie Chart" /></SwiperSlide>
                    <SwiperSlide><ResultDetail title = "Histogram Chart" /></SwiperSlide>
                    <SwiperSlide><ResultDetail title = "Sequence Chart" /></SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}

export default Result;
