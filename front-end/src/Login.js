import './Login.css';
import { useState } from "react";
import axios from "axios";



const LoginDetail = ({state}) => {
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [PasswordCheck, setPasswordCheck] = useState("")
    const [ErrorA, setErrorA] = useState("")
    const [ErrorB, setErrorB] = useState("")
    const [memberID, setMemberID] = useState(-1)

    function CheckRegister(){
        if(Email === ""){
            setErrorA("Enter the E-mail");
        }
        else{
            if(Password !== PasswordCheck){
                setErrorA("Password is not matched");
            }
            else{
                if(Password.length < 8){
                    setErrorA("Password is less than 8 digit");
                }
                else{
                    axios.post("http://127.0.0.1:8000/member/", {
                        email: Email,
                        password: Password
                    })
                }
            }
        }
    }

    function CheckLogin(){
        if(Email === ""){
            setErrorB("Enter the E-mail");
        }
        else{
            if(Password === ""){
                setErrorB("Enter the Password");
            }
            else{
                axios.get("http://127.0.0.1:8000/member/")
                .then((response) => {
                    var key = false;
                    for (var i = 0; i <[...response.data].length; i++){
                        if([...response.data][i]['email'] === Email && [...response.data][i]['password'] === Password){
                            setMemberID(i+1);
                            key = true;
                            break;
                        }
                    }  
                    
                    if(key){
                        setErrorB("Login Success");
                    }
                    else{
                        setErrorB("Invalid Information");
                    }
                })
            }
        }
    }

    return (
        <div class = "LoginDetail">
            <div class = "blank" />
            <div class = "LoginInput">
                <input type = "text" name = "email" placeholder='  E-mail'
                onChange={(text1) => setEmail(text1.target.value)}/>
                <input type = "password" name = "pwd" placeholder='  password'
                onChange={(text2) => setPassword(text2.target.value)}/>
                {state && <div class = "LoginOption">
                    <input type = "checkbox" name = "r" value= "remember" />
                    <span> Remember the E-mail </span> 
                    {ErrorB !== "" && <div class = "errRegister">{ErrorB}</div>}
                </div>}
                {!state && <div class = "pwcheck">
                    {ErrorA !== "" && <div class = "errRegister">{ErrorA}</div>}
                    <input type = "password" name = "pwd" placeholder='  password check'
                    onChange={(text3) => setPasswordCheck(text3.target.value)}/>
                </div>}
            </div>
            <div class = "bttn">
                <button onClick = {state ? () => {CheckLogin();} : () => {CheckRegister();}}> <strong> {state ? "LOGIN" : "REGISTER"} </strong> </button>
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