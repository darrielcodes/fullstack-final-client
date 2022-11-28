import { useEffect, useState } from "react"
//import RecipeSearch from "../Components/RecipeSearch";

const RecipeSearch = (props) => {
    return (
        <div>
            <label>Search Recipe Name: </label>
            <input type="text" value={props.userInput}></input>
        </div>
    )
};

const RecipeCard = () => {

    const [recipe, setRecipe] = useState([]);
    const [checked, setChecked] = useState(false);
    const cart = []
    const [userInput, setUserInput] = useState("")
//    useEffect(() => {
//      const fetchRecipes = async () => {
//         const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=42895daf&app_key=9bed4c3632880a266b7f8179179ddb1e`)
//      };
//         const responseJSON = await response.json();
//         const data = responseJSON.hits[0].recipe
//         setTitle(data.label)
//      fetchRecipes()
//    }, []);

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
            //const results = responseJSON.results
            const allData = responseJSON.hits
           console.log(allData)
           const mappedData = () => {
                allData.map((newRecipe, index) => {
                console.log(newRecipe.recipe.label)
                // setTitle(newRecipe.recipe.label)
                // setDescription(newRecipe.recipe.ingredients[0].text)
                console.log(newRecipe)
                return newRecipe
            })
        };
        
        mappedData();
            //console.log(responseJSON.hits[0].recipe.label)
			setRecipe(allData)
		}
		fetchRecipes()
    }, [userInput]);

  console.log(cart)

  console.log(recipe[0])
    return (
        <div>
             {recipe.map((newRecipe, index) => {
                console.log(newRecipe.recipe.label)
                const indRecipe = newRecipe.recipe
                
                return (
                    <div>
                        <h2>{indRecipe.label}</h2>
                        <img src={indRecipe.images.THUMBNAIL.url}></img>
                        <br/>
                        <h3>Ingredients</h3>
                        {indRecipe.ingredients.map((indIngredients,index) => {
                   // console.log(newRecipe)
                    return (
                    <div>
                        <label>{indIngredients.food}</label>
                        <input type="checkbox" checked={checked} onChange={(e) => {
                            setChecked(!checked);
                            if (checked === true){
                                cart.push(e.target.value)/////
                            }
                        }}></input>
                       {console.log(checked)}
                    </div>
                    )
                })}
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