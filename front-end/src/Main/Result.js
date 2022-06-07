import './Result.css';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper";

const ResultDetail = ({title}) => {
    return (
        <div class = "resultDetail">
            <div class = "image">
                <img src = "" alt = "Waiting for Result"></img>
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
                <a href = "./result.csv" download><button class = "csv_icon"></button></a>
            </div>
            <div class = "Rbottom">
                <Swiper
                    effect={"cards"}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="mySwiper"
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