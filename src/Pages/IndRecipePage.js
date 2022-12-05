import { useParams } from "react-router";
import { useEffect, useState } from "react";
import UserCart from "../Components/UserCart";


const IndRecipePage = (props) => {
    const { individualRecipe, setIndRecipe, recipe, urlEndpoint } = props;
    const params = useParams();
    const recipeIDParam = params.recipeID;
    const [checked, setChecked] = useState([]); 
    const [title, setTitle] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [cart, setCart] = useState([{
        // title,
        // quantity,
        // price
    }])
    

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
        const response = await fetch(`${urlEndpoint}/create-one`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
              },
              body: JSON.stringify([{ 
                        title,
                        quantity,
                        price
                     }]),
            });
    };


    const handleChecked = (e,title, quantity, price) => {
        let itemTitle = title;
        let itemQuantity = quantity;
        let itemPrice = price;
        let currentCart = [...checked];
        if (e.target.checked) {
            currentCart = [...checked, e.target.value]
            setCart([...cart, {
                itemTitle,
                itemQuantity,
                itemPrice
            }])
        }
        if (!e.target.checked) {
            currentCart.splice(checked.indexOf(e.target.value), 1);
            cart.splice(checked.indexOf(e.target.value), 1)
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
                   // console.log(newRecipe)
                    return (
                    <div>
                        <label>{indIngredients.quantity} {indIngredients.measure} {indIngredients.food} - ${randomPrice()}</label>
                        <input type="checkbox" value={indIngredients.food} onChange={(e) => {
                            handleChecked(e, indIngredients.food, indIngredients.quantity)
                        }}></input>
                    </div>
                    )
                })}
                <br/>
                <h4>Current Cart:</h4>
                <h5>{checkedItems}</h5>
                {console.log(checkedItems)}
                {console.log(cart)}
                <button onClick={(e) => {
                    
                }}>Add to cart?</button>
        </div>
    )
};

export default IndRecipePage;