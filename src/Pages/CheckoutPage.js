import { useState, useEffect } from "react";
import { useAuth } from "../Hooks/auth";
import { useNavigate } from "react-router-dom";

const CheckoutPage = (props) => {
    const { individualRecipe, setIndRecipe, recipe, urlEndpoint, cart, setCart } = props;
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState([]);
    const [item, setItem] = useState([]);
    const [price, setPrice] = useState(0);
    const [checked, setChecked] = useState([]); 
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
        const mappedKeys = keys.map((item,index) => {
            return item
        });
        const mappedArr = mappedKeys.map((item, index) => {
            return item[1]
        })
        const filteredArr = mappedArr.filter((item) => {
            for (let i = 0; i < mappedArr.length; i++){

            }
            return item
        })
        console.log(filteredArr)
        const joinArray = filteredArr.flat()
        console.log(joinArray)
			setItems(joinArray)
       }
       
       fetchItems()
    }, [shouldRefetch]
    );
   

    const handleCreateOrder = async () => {
        const response = await fetch(`${urlEndpoint}/users/create-order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                [process.env.REACT_APP_TOKEN_HEADER_KEY]: auth.userToken 
              },
              body: JSON.stringify(items)
            });
            const updatePayload = await response.json();
        setErrorSuccess(updatePayload.success)
        setErrorMessage(updatePayload.message)
        if (updatePayload.success === true){
                    navigate("/home");
                } else {
                setErrorMessage(updatePayload.message)
            };
    };

    useEffect(() => {
        
        const mappedPrices = items.map((item, index) => {
            if (!item.itemPrice) {
                return 0
            }
            return item.itemPrice
        })  
        const result = mappedPrices.reduce((initialValue, currentValue) => {
            let total = initialValue
            total = initialValue + currentValue;
            return total
            }, 0);
            setPrice(result)
        },[items]);

    const handleQuantity = () => {

    };

    const [recipeName, setRecipeName] = useState("")
    // const recipeNames = items.filter((item)=>item.hasOwnProperty("recipeName"))
    //console.log(recipeNames[0].recipeName)
    // recipeNames.map((item, index) => {
    //     return item
    // })
    //console.log(recipeNames)
    const recipeIngredients = items.filter((item)=>item.hasOwnProperty("itemTitle"))
    const recipeDetails = items.filter((item)=>item.hasOwnProperty("userEmail"))[0]

    return (
        <div className="checkout-layout">
            <h1>{errorMessage}</h1>
            <h1>Checkout</h1>
        <h2 style={{color: "red"}}>Total: ${price}.00</h2>
        <h1>Cart Items:</h1>
          {Object.keys(items).map((key, index) => {
            const title = items[key].itemTitle;
            const price = items[key].itemPrice;
            const quantity = items[key].itemQuantity;
            
            const recipeNames = items.filter((item)=>item.hasOwnProperty("recipeName"))
            if (title === undefined || price == undefined ) {
                return <></>
            };
            return (
                <div key={index}>
                    <h3>{recipeNames.recipeName}</h3>
                    <ul style={{ listStyle: "none" }}>
                    <li>{title} - ${price}.00</li>
                    <button value={title} onClick={(e) => {
                        console.log(e.target.value)
                        const index = items.filter((value) => {
                                    return value.itemTitle !== e.target.value
                                })
                        setItems(index)
                    }}>Remove</button>
                    </ul>
                </div>
            )
        })}
        {/* <button onClick={(e) => {
            setItems(items)
        }}>Refresh</button> */}

        <button onClick={(e) => {
            if (price === 0){
                setErrorMessage("Please add items with value to cart!")
                return;
            }
             if (window.confirm(`Empty cart and confirm checkout?`)){
            handleCreateOrder(items);
        }
        else {
            console.log("cancelled")
        }
        }} style={{height: "50px"}}>Checkout</button>
        </div>
    )
};

export default CheckoutPage;