import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/auth";
import UserCart from "../Components/UserCart";


const IndRecipePage = (props) => {
    const auth = useAuth();
    const { individualRecipe, setIndRecipe, recipe, urlEndpoint, cart, setCart } = props;
    const params = useParams();
    const navigate = useNavigate()
    const recipeIDParam = params.recipeID;
    const [checked, setChecked] = useState([]); 
    const [title, setTitle] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState(0);
    const [errorSucess, setErrorSuccess] = useState("");
    const [errorMessage, setErrorMessage] = useState("")
    let currentPrice = 0;
    
    
    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch (`https://api.edamam.com/api/recipes/v2/${recipeIDParam}?type=public&app_id=42895daf&app_key=9bed4c3632880a266b7f8179179ddb1e`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const responseJSON = await response.json();
            const allData = responseJSON
            console.log(allData.recipe)
            setIndRecipe(allData.recipe)
        }
        fetchRecipes();
    }, [])

    const handleAddToCart = async () => {
        const response = await fetch(`${urlEndpoint}/users/create-one`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                [process.env.REACT_APP_TOKEN_HEADER_KEY]: auth.userToken 
              },
              body: JSON.stringify(cart)
            });
            const updatePayload = await response.json();
        setErrorSuccess(updatePayload.success)
        setErrorMessage(updatePayload.message)
        if (updatePayload.success === true){
                    navigate("/checkout");
                } else {
                setErrorMessage(updatePayload.message)
            };
            console.log(updatePayload)
            console.log(errorSucess)
            setCart([{recipeName: individualRecipe.label,
                itemPrice: 0}])
    };

    // const mappedPrices = cart.map((item, index) => {
    //         return item.itemPrice
    //     })
    //     console.log(mappedPrices)
    const [isChecked, setIsChecked] = useState(false)
    
    useEffect(() => {
        const mappedPrices = cart.map((item, index) => {
            return item.itemPrice
        })
        const result = mappedPrices.reduce((initialValue, currentValue) => {
            let total = 0
            
            if (isChecked) {
            total = initialValue + currentValue
            return total
            } 
           if (!isChecked) {
               for (let i = 0; i < mappedPrices.length; i++){
                   total += mappedPrices[i]
               }
            return total
            }
        });
        
        setPrice(result)
    },[cart])

    
    const handleChecked = (e, recipeName, title, quantity, price) => {
        let itemTitle = title;
        let itemQuantity = quantity;
        let itemPrice = price;
        let currentCart = [...checked];
        
        if (e.target.checked) {
            setIsChecked(true);
            currentCart = [...checked, e.target.value];
            setCart([...cart, {
                itemTitle,
                itemQuantity,
                itemPrice,
                userId: auth.userToken && auth.userToken
            }]
        );
        };
        
        if (!e.target.checked) {
            console.log(e.target.checked)
            currentCart.splice(checked.indexOf(e.target.value), 1);
            const index = cart.filter(value => value.itemTitle !== e.target.value);
            console.log(index)
            setCart(index)
            setIsChecked(false);
        }
        setChecked(currentCart)
    };

    const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

    const randomPrice = () => {
        const price = Math.random() * 10
        return price.toFixed(2)
    };
    
    return (
        <div>
            <h1>{individualRecipe.label}</h1>
            <img src={individualRecipe.images.REGULAR.url}></img>
            <br/>
            <h3>Ingredients:</h3>
            {individualRecipe.ingredients.map((indIngredients,index) => {
                let title = indIngredients.food;
                let quantity = indIngredients.quantity.toString().slice(0,5);
                let indPrice = indIngredients.weight.toString().slice(0,1)
                indPrice += ".00"
                    return (
                    <div>
                        <label>{quantity} {indIngredients.measure} {title} - ${indPrice}</label>
                        <input type="checkbox" value={title} onChange={(e) => {
                            handleChecked(e, individualRecipe.label, title, Number(quantity), Number(indPrice));
                        }}></input>
                    </div>
                    )
                })}
                <br/>
                <h4>Current Cart: ${price}.00</h4>
                <h5>{checkedItems}</h5>
                <button onClick={(e) => {
                    if (window.confirm(`Are you sure you want to add to cart?`)){
                        handleAddToCart();
                    }
                    else {
                        console.log("cancelled")
                    }
                }}>Add to cart?</button>
        </div>
    )
};

export default IndRecipePage;