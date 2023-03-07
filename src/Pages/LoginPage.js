import { useState } from "react";
import { useAuth } from "../Hooks/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = (() => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const auth = useAuth();
    const navigate = useNavigate();
    
    return (
        <div>
            <h1 style={{ fontFamily: "copperplate", background: "rgba(255, 255, 255, 0.5)"}}>Login:</h1>
            <br/>
            <label>Email: </label>
            <input type="text" value={email} onChange={(e) => {
                setEmail(e.target.value)
            }}></input>
            <br/>
            <label>Password: </label>
            <input type="password" value={password} onChange={(e) => {
                setPassword(e.target.value)
            }}></input>
            <br/>
            <h3>{loginMessage}</h3>
            <button onClick={async () => {
                const registerResult = await auth.login(email,password);
               
                if (registerResult.success) {
                    navigate("/home")
                }
                if (!registerResult.success) {
                    setLoginMessage(registerResult.message)
                }

            }}>Login</button>
        </div>
    )
});

export default LoginPage;