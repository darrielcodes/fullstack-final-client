import { useState, useEffect } from "react";
import { useAuth } from "../Hooks/auth";
import RecipeSearch from "../Components/RecipeSearch"
import { Link } from "react-router-dom";
import RecipePage from "../Pages/RecipePage"
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

const HomePage = ((props) => {
    const [message, setMessage] = useState("");
    const auth = useAuth();
    const setUserInput = props.setUserInput

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
            <RecipeSearch />
            <button onClick={(e) => {
                props.setUserInput(e.target.value)
            }}>Search</button>
        </div>
    )
});

export default HomePage;