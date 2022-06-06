import './Login.css';
import { useState } from "react";

const LoginDetail = () => {
    return (
        <div class = "LoginDetail">
            <div class = "blank" />
            <div class = "LoginInput">
                <input type = "text" name = "email" placeholder='  E-mail'/>
                <input type = "password" name = "pwd" placeholder='  password'/>
                <div class = "LoginOption">
                    <input type = "checkbox" name = "r" value= "remember" />
                    <span> Remember the E-mail </span> 
                </div>
            </div>
            <div class = "bttn">
                <button> <strong> LOGIN </strong> </button>
            </div>

        </div>
    )
}

const Login = () => {
    const [visible, setVisible] = useState(false);
    return (
        <div class = "Login">
            <button onClick= {() => {setVisible(!visible);}}>
                {visible ? "Hide" : "Login"}
            </button>
            {visible && <LoginDetail />}
        </div>
    );
}

export default Login;