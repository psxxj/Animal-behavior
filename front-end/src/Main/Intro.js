import "./Intro.css";
import Image1 from '../img/step01.JPG';

const Step = ({img, num, subtitle}) => {
    return (
      <div class = "step">
        <div class = "step_img">
          <img src = {img} />
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
          간단한 프로그래밍(기초적인 코딩 위주) 예제 소스 코드와 언어들의 기초 강좌, 소프트웨어, 웹 디자인과 관련된 내용. 그래픽에 쓸 수 있는 색상표와, 각종 프로그램들의 사용법 설명, 웹 브라우저에서 각종 단위를 환산하는 계산기/변환기 등.
          </div>
        </div>
      </div>
    );
}

const Intro = () => {
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
              <button> Prev. </button>
              <button> Next. </button>
            </div>


        </div>
        <div class = "right-box">
          <Step img = {Image1} num = "1" subtitle = "Prepare the Mouse's Video"/>
        </div>
    </div>
  );
}

export default Intro;