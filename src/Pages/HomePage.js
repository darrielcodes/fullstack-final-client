import { useState, useEffect } from "react";
import { useAuth } from "../Hooks/auth";
import { Link, useNavigate } from "react-router-dom";
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

const HomePage = ((props) => {
    const [message, setMessage] = useState("");
    const auth = useAuth();
    const { setUserInput } = props;
    const navigate = useNavigate()

    useEffect(() => {
       const fetchMessage = async () => {
        const response = await fetch (`${urlEndpoint}/users/message`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                [process.env.REACT_APP_TOKEN_HEADER_KEY]: auth.userToken
            }, 
        })
        const messagePayload = await response.json();
        setMessage(messagePayload.message) 
       }
       if (auth.userToken !== null){
       fetchMessage();
    };
    if (auth.userToken === null){
        setMessage("")
    }
    }, [auth.userToken]
    );
    return (
        <div>
            <h1>Home Page</h1>
            <h3>{message}</h3>
            <label>Search Recipe Name: </label>
            <input type="text" onChange={(e) => {
                setUserInput(e.target.value)
            }}></input>
            <button onClick={(e) => {
                navigate("/recipes")
            }}>Search</button>
        </div>
    )
});

export default HomePage;