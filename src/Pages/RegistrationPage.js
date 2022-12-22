import { useState } from "react";
import { useAuth } from "../Hooks/auth";
import { useNavigate } from "react-router-dom";

const RegistrationPage = (() => {
   const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [registerMessage, setRegisterMessage] = useState("");
    const auth = useAuth();
    const navigate = useNavigate();

    return (
        <div>
            <h1>Registration Page</h1>
            <br/>
            <label>Email: </label>
            <input type="text" value={email} onChange={(e) => {
                setEmail(e.target.value)
            }}></input>
            <br/>
            <label>Full Name: </label>
            <input type="text" value={name} onChange={(e) => {
                setName(e.target.value)
            }}></input>
            <br/>
            <label>Phone Number: </label>
            <input type="text" value={phone} onChange={(e) => {
                setPhone(e.target.value)
            }}></input>
            <br/>
            <label>Password: </label>
            <input type="password" value={password} onChange={(e) => {
                setPassword(e.target.value)
            }}></input>
            <br/>
            <h3>{registerMessage}</h3>
            <button onClick={async () => {
                const registerResult = await auth.register(email,password, name, phone);
               
                if (registerResult.success) {
                    navigate("/")
                }
                if (!registerResult.success) {
                    setRegisterMessage(registerResult.message)
                }

            }}>Sign Up</button>
        </div>
    )
});

export default RegistrationPage;