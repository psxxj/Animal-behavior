import './Login.css';
import { useState } from "react";

const LoginDetail = ({state}) => {
    return (
        <div class = "LoginDetail">
            <div class = "blank" />
            <div class = "LoginInput">
                <input type = "text" name = "email" placeholder='  E-mail'/>
                <input type = "password" name = "pwd" placeholder='  password'/>
                {state && <div class = "LoginOption">
                    <input type = "checkbox" name = "r" value= "remember" />
                    <span> Remember the E-mail </span> 
                </div>}
                {!state && <div class = "pwcheck">
                    <input type = "password" name = "pwd" placeholder='  password check'/>
                </div>}
            </div>
            <div class = "bttn">
                <button> <strong> {state ? "LOGIN" : "REGISTER"} </strong> </button>
            </div>
        </div>
    )
}

const Login = () => {
    const [visible, setVisible] = useState(0);

    function setNum(num){
        if(num === 2){
            setVisible(0);
        }else{
            setVisible(num + 1);
        }
    }

    return (
        <div class = "Login">
            <button onClick= {() => {setNum(visible);}}>
                {visible === 0 && "Login"}
                {visible === 1 && "Join Us"}
                {visible === 2 && "Hide"}
            </button>
            {visible === 1 && <LoginDetail state = {true}/>}
            {visible === 2 && <LoginDetail state = {false} />}
        </div>
    );
}

export default Login;