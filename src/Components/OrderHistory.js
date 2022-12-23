import { useState, useEffect } from "react";
import { useAuth } from "../Hooks/auth";

const OrderHistory = (props) => {
    const { recipe, urlEndpoint } = props;
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const auth = useAuth();
    const [user, setUser] = useState([])
    const [email, setNewEmail] = useState("")
    const [password, setNewPassword] = useState("")
    const [id, setId] = useState("")
    const [orderItem, setOrderItem] = useState([])
    const [orderData, setOrderData] = useState([])
    const [orderName, setOrderName] = useState([])

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
        setUser(foundUser[0].orderHistory)
        }
        
        fetchItems()
     }, [shouldRefetch]
     );

     useEffect(() => {
        const fetchItems = async () => {
         const response = await fetch (`${urlEndpoint}/users/order-history/${id}`, {
             method: "GET",
             headers: {
                 "Content-Type": "application/json",
                 [process.env.REACT_APP_TOKEN_HEADER_KEY]: auth.userToken
             }, 
         })
         const fetchedItemsPayload = await response.json();
         const foundOrder = fetchedItemsPayload.foundOrder[0]
        //  const orderHistory = fetchedItemsPayload.foundOrder[0].orderHistory
         const orderID = fetchedItemsPayload.foundOrder[0].newOrder//some sort of map for orderID
         console.log(orderID)
        const idExists = orderID.filter((item, index) => {
            return item[item.length-1].orderID === id
        })
        const recipeDate = idExists.map((item, index) => {
            return item[item.length-2]
        })
        const recipeName = idExists.map((item, index) => {
            console.log(item[0])
            return item[0]
        })
        
         console.log(recipeDate)
        // const mappedOrders = orderItem.map((item, index) => {
        //     return item
        // })
        setOrderData(recipeDate[0].createdAt);
        setOrderItem(idExists);
        setOrderName(recipeName[0].recipeName)
         console.log(recipeDate)
       //setUser(foundUser[0].orderHistory)
        }
        fetchItems()
     }, [id]
     );
console.log(orderItem)
    return (
        <div style={{ background: "rgba(255, 255, 255, 0.5)", width: "50%", alignContent: "center", marginLeft: "300px"}}>
            <h1>Order History</h1>
            <select onChange={(e) => {
                setId(e.target.value)
            }}>
            <option></option>
                {user.map((item, index) => {
                    return (
                       <option key={index}>{item}</option>
                        )
                })}
                </select>
                <h3>{orderName}</h3>
                {orderItem.map((item, index) => {
                    return item.map((x, index) => {
                        const title = x.itemTitle;
                        const price = x.itemPrice;
                        const quantity = x.itemQuantity;
                        console.log()
                        if (title === undefined || price == undefined ) {
                            return <></>
                        };
                        //console.log(title)
                        return (
                            <div>
                                <ul style={{ listStyle: "none" }}>
                                <li>{title}</li>
                                <li>${price}.00</li>
                                </ul>
                            </div>
                        )
                    })
                })}

                <h4>Created At: {orderData}</h4>
        </div>
    )
};

export default OrderHistory;