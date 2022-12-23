import { useState, useEffect } from "react";
import { useAuth } from "../Hooks/auth";
import { useNavigate } from "react-router-dom";

const UserInfo = (props) => {
    const { recipe, urlEndpoint } = props;
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const auth = useAuth();
    const [user, setUser] = useState([])
    const [email, setNewEmail] = useState("")
    const [password, setNewPassword] = useState("")
    const [name, setNewName] = useState("")
    const [phone, setNewPhone] = useState("")
    const navigate = useNavigate()

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
     }, [shouldRefetch, name, phone]
     );

    const handleUpdateUserName = async () => {
        setShouldRefetch(true);
        const response = await fetch(`${urlEndpoint}/users/update-name/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json", 
              },
              body: JSON.stringify({ 
                        name: name
                     }),
            });
        setShouldRefetch(false)
    };

    const handleUpdateUserPhone = async () => {
        setShouldRefetch(true);
        const response = await fetch(`${urlEndpoint}/users/update-phone/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json", 
              },
              body: JSON.stringify({
                  phone: phone
                     }),
            });
        setShouldRefetch(false)
    };

    const handleDeleteUserProfile = async () => {
        setShouldRefetch(true);
        const response = await fetch(`${urlEndpoint}/users/delete-acct/${user.id}`, {
            method: "DELETE"
            });
        setShouldRefetch(false)
    }
    console.log(user)
    return (
        <div>
           <h1>Update User Info</h1>
            <label> Name: {user.name}</label>
            <br/>
            <input type="text" onChange={(e) => {
                setNewName(e.target.value)
            }}></input>
            <button onClick={(e) => {
                handleUpdateUserName();
            }}>Update</button>
            <br/>
            <label>Phone Number: {user.phone}</label>
            <br/>
            <input type="text" onChange={(e) => {
                setNewPhone(e.target.value)
            }}></input>
            <button onClick={(e) => {
                handleUpdateUserPhone();
            }}>Update</button>
            <br/>
            <br/>
            <button onClick={(e) => {
                 if (window.confirm(`Are you sure you want to permenently delete your account?`)){
                        handleDeleteUserProfile();
                        navigate("/")
                    }
                    else {
                        console.log("cancelled")
                    }
            }}>Delete Account</button>
        </div>
    )
};

export default UserInfo;