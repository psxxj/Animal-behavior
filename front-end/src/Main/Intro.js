import "./Intro.css";
import Image1 from '../img/step1.png';
import { useState } from "react";

const Step = ({img, num, subtitle, text}) => {
    return (
      <div class = "step">
        <div class = "step_img">
          <img src = {img} alt = "step_img" />
        </div>
        <div class = "step-A">
          <div class = "title">
            {num}
          </div>
          <div class = "subtitle">
            {subtitle}
          </div>
        </div>
        <div class = "step-B">
          <div class = "detailtext">
          {text}
          </div>
        </div>
      </div>
    );
}

const Intro = () => {
  const [visible, setVisible] = useState(1);
  const text1 = "detail for STEP 1";
  const text2 = "detail for STEP 2";
  const text3 = "detail for STEP 3";

  function movePage(type) {
    if(type === 'prev' && visible !== 1){
      setVisible(visible - 1);
    }
    if(type === 'next' && visible !== 3){
      setVisible(visible + 1);
    }
  }

  return (
    <div class = "intro">
        <div class = "left-box">
            <h1> B-fact </h1>
            <div id = "h1_sub"> Behaivor Framing </div> 
            <div class = "h1_text"> Did your eyes hurt from observing animals? </div>
            <div class = "h1_text"> We have a very smart and clever solution.</div>
            <div class = "h1_text"> You don't have to check all the videos anymore. </div>
            <div class = "h1_text"> The cool AI is designed for taking over your hardwork. </div>
            <div class = "h1_text"> Just handle it on our <span> "B-fact" </span> now. </div>
            <div class = "intro_bttn">
              <button onClick = {() => movePage('prev')}> Prev. </button>
              <button onClick = {() => movePage('next')} > Next. </button>
            </div>


        </div>
        <div class = "right-box">
          {visible === 1 && <Step img = {Image1} num = "1" subtitle = "Prepare the Mouse's Video" text = {text1}/>}
          {visible === 2 && <Step img = {Image1} num = "2" subtitle = "Set the Mouse's Info" text = {text2}/>}
          {visible === 3 && <Step img = {Image1} num = "3" subtitle = "Explore the Result" text = {text3}/>}
        </div>
    </div>
  );
}

export default Intro;