import { useState, useEffect } from "react";
import { useAuth } from "../Hooks/auth";
import { useNavigate } from "react-router-dom";

const CheckoutPage = (props) => {
    const { individualRecipe, setIndRecipe, recipe, urlEndpoint, cart, setCart } = props;
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState([]);
    const [item, setItem] = useState([]);
    const [price, setPrice] = useState(0);
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate()
    const [errorSucess, setErrorSuccess] = useState("");
    const [errorMessage, setErrorMessage] = useState("")

   useEffect(() => {
       const fetchItems = async () => {
        const response = await fetch (`${urlEndpoint}/users/checkout`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                [process.env.REACT_APP_TOKEN_HEADER_KEY]: auth.userToken
            }, 
        })
        const fetchedItemsPayload = await response.json();
        const foundUser = fetchedItemsPayload.foundUser[0]
        const foundCart = foundUser.newCart
        const arrCart = foundCart.map((item, index) => {
            //console.log(item)
            return item
        })
    
        const keys = Object.entries(arrCart)
        //console.log(keys)
        const mappedKeys = keys.map((item,index) => {
            console.log(item)
            return item
        });
        const mappedArr = mappedKeys.map((item, index) => {
            console.log(item[1])
            return item[1]
        })
        // const joinArray = mappedArr.flat()
        // console.log(joinArray)
        const filteredArr = mappedArr.filter((item) => {
            console.log(item)
            for (let i = 0; i < mappedArr.length; i++){

            }
            return item
        })
        console.log("type")
        console.log(typeof(filteredArr))
        const joinArray = filteredArr.flat()
        console.log(joinArray)
			setItems(joinArray)
       }
       fetchItems()
    }, [shouldRefetch]
    );
    console.log("items:")
   // console.log(items) 

    const handleCreateOrder = async () => {
        const response = await fetch(`${urlEndpoint}/users/create-order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                [process.env.REACT_APP_TOKEN_HEADER_KEY]: auth.userToken 
              },
              body: JSON.stringify(order)
            });
            const updatePayload = await response.json();
        setErrorSuccess(updatePayload.success)
        setErrorMessage(updatePayload.message)
        if (updatePayload.success === true){
                    navigate("/");
                } else {
                setErrorMessage(updatePayload.message)
            };
            setOrder({})
    };

    // const mappedItems = items.map((item, index) => {
    //     console.log(item) 
    // })
    // const handleitems = () => {
    //     for (let i = 0; i < items.length; i++){
    //     let filteredItems = []
    //    filteredItems = items[i]
    //     console.log (filteredItems[i])
    // return filteredItems
    // }};

//     useEffect(() => {
//         // const handleitems = () => {
//         //     for (let i = 0; i < filteredItems.length; i++){
//         //    filteredItems = filteredItems[i]
//         //     console.log (filteredItems[i])
//         // return filteredItems
//         // }};
//         //handleitems();
//         // const arrItems = items.map((item, index) => {
//         //     console.log(item)
//         // })
        
// }, [items])

useEffect(() => {
    const mappedPrices = items.map((item, index) => {
        console.log(item.itemPrice)
        return item.itemPrice
    });
    // const result = mappedPrices.reduce((initialValue, currentValue) => {
        let total = 0
        
            for (let i = 0; i < mappedPrices.length; i++){
                total += mappedPrices[i]
            }
        console.log(mappedPrices)
        return total
        // })

    setPrice(total)
    },[price])

    return (
        <div>
            <h1>Checkout Cart</h1>
        <h2>Total: ${price}.00</h2>
          {Object.keys(items).map((key, index) => {
            const title = items[key].itemTitle
            const price = items[key].itemPrice
            const quantity = items[key].itemQuantity
            return (
                <div key={index}>
                    <h3>{items[key].recipeName && items[key].recipeName}</h3>
                    
                    <label>{title && title} - ${price && price}.00</label>
                    <br/>
                    
                    <button type="checkbox" value={title} onClick={(e) => {

                    }}>Remove Item</button>
                </div>
            )
        })}
        </div>
    )
};

export default CheckoutPage;