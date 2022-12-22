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
        
         console.log(idExists)
        // const mappedOrders = orderItem.map((item, index) => {
        //     return item
        // })
        setOrderData(recipeDate);
        setOrderItem(idExists);
        setOrderName(recipeName)
         console.log(recipeDate)
       //setUser(foundUser[0].orderHistory)
        }
        fetchItems()
     }, [id]
     );

    return (
        <div>
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
                {/* <h3>Title: {orderName[0].recipeName}</h3> */}
                {orderItem.map((item, index) => {
                    const title = item.itemTitle;
                    const price = item.itemPrice;
                    const quantity = item.itemQuantity;
                    console.log(item)
                    return item.map((x, index) => {
                        const title = x.itemTitle;
                        const price = x.itemPrice;
                        const quantity = x.itemQuantity;
                        if (title === undefined || price == undefined ) {
                            return <></>
                        };
                        //console.log(title)
                        return (
                            <div>
                                <h3>{title}</h3>
                                <h4>${price}.00</h4>
                            </div>
                        )
                    })
                })}

                {/* <p>Created At: {orderData && orderData[0].createdAt}</p> */}
        </div>
    )
};

export default OrderHistory;