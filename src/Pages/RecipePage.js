import { useEffect, useState } from "react"
import { useNavigate } from "react-router";


const RecipeCard = (props) => {

    // const [recipe, setRecipe] = useState([]);
    const [checked, setChecked] = useState(false);
    const cart = []
    const { userInput, setUserInput, recipe, setRecipe, individualRecipe, setIndRecipe, state } = props;
    const [input, setInput] = useState("");
    const [displayed, setDisplayed] = useState(false);
    // const [individualRecipe, setIndRecipe] = useState({});
    const navigate = useNavigate();

    const userChecked = () => {
        setChecked(!checked);
        if (checked === true){
            cart.push(checked.value)
        }
        return cart
    };

    useEffect(()=>{
		const fetchRecipes = async () => {
			const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${userInput}&app_id=42895daf&app_key=9bed4c3632880a266b7f8179179ddb1e`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json", 
                  }
			});
			const responseJSON = await response.json();
            const allData = responseJSON.hits
           //console.log(allData)
           const mappedData = () => {
                allData.map((newRecipe, index) => {
                //console.log(newRecipe.recipe.label)
                // setTitle(newRecipe.recipe.label)
                // setDescription(newRecipe.recipe.ingredients[0].text)
                //console.log(newRecipe)
                return newRecipe
            })
        };
        
            mappedData();
			setRecipe(allData)
		}
		fetchRecipes()
    }, [userInput]);

  //console.log(cart)

  //console.log(recipe[0])

    const slicedURI = (uri) => {
        const recipeID = uri.slice(51)
        return recipeID
    };

  const randomPrice = () => {
      const price = Math.random() * 10
      return price.toFixed(2)
  };

  const handleClick = (e) => {
      setDisplayed(!displayed)
  };

  const selectRecipe = (recipe) => {
    setIndRecipe(recipe)
  };
    return (
        <div>
            <h1>{userInput} recipes</h1>
            <label>Search Recipe Name: </label>
            <input type="text" onChange={(e) => {
                setInput(e.target.value)
            }}></input>
            <button onClick={(e) => {
                setUserInput(input)
            }}>Search</button>
            <br/>
             {recipe.map((newRecipe, index) => {
                //console.log(newRecipe)
                const indRecipe = newRecipe.recipe
                 console.log(individualRecipe)
                return (
                    <div>
                        <h2>{indRecipe.label}</h2>
                        <img src={indRecipe.images.THUMBNAIL.url}></img>
                        <br/>
                        <button onClick={(e) => {
                            handleClick();
                           // console.log(indRecipe)
                        }}>Show Ingredients</button>
                        <button onClick={(e) => {
                        selectRecipe(indRecipe);
                        navigate(`/cart/${slicedURI(indRecipe.uri)}`)
                        }}>Shop for items</button>
                        {indRecipe.ingredientLines.map((line, index) => {
                            return (
                                <div>
                                    <p>{displayed && line}</p>
                                </div>
                            )
                        })}
                        {/* {indRecipe.ingredients.map((indIngredients,index) => {
                   // console.log(newRecipe)
                    return (
                    <div>
                        <label>{indIngredients.food} - {indIngredients.text}</label>
                        <input type="checkbox"></input>
                        <label> ${randomPrice()}</label>
                       {console.log(checked)}
                    </div>
                    )
                })} */}
                <br/>
                {/* <button onClick={(e) => {
                    navigate("/cart")
                }}>Add to cart</button> */}

                <br/>
                <br/>
                        <label>Full recipe: </label>
                        <a href={indRecipe.url}>{indRecipe.label}</a>
                        <hr/>
                        </div>
                )}
             )}
        </div>
    )
};

export default RecipeCard;

// for price: ${indIngredients.weight.toFixed(2)