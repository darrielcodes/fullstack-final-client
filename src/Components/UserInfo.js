import { useState, useEffect } from "react";
import { useAuth } from "../Hooks/auth";

const UserInfo = (props) => {
    const { recipe, urlEndpoint } = props;
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const auth = useAuth();
    const [user, setUser] = useState([])
    const [email, setNewEmail] = useState("")
    const [password, setNewPassword] = useState("")
    const [name, setNewName] = useState("")
    const [phone, setNewPhone] = useState("")

    useEffect(() => {
        const fetchItems = async () => {
         const response = await fetch (`${urlEndpoint}/users/user-info`, {
             method: "GET",
             headers: {
                 "Content-Type": "application/json",
                 [process.env.REACT_APP_TOKEN_HEADER_KEY]: auth.userToken
             }, 
         })
         const fetchedItemsPayload = await response.json();
         const foundUser = fetchedItemsPayload.foundUser
         console.log(foundUser[0])
        setUser(foundUser[0])
        }
        
        fetchItems()
     }, [shouldRefetch]
     );


    // console.log(user[0].email)
    return (
        <div>
           <h2>{user.name} - Update User Info</h2>
            <label> Update Email: {user.email}</label>
            <br/>
            <input  type="text"></input>
            <br/>
            <button>Submit</button>
            <br/>
            <label> Update Name: {user.name}</label>
            <br/>
            <input  type="text"></input>
            <br/>
            <button>Submit</button>
            <br/>
            <label>Update Phone Number: {user.phone}</label>
            <br/>
            <input type="text"></input>
            <br/>
            <button>Submit</button>
            <br/>
            <br/>
            <button>Delete Account</button>
        </div>
    )
};

export default UserInfo;