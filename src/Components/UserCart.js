import { useParams } from "react-router";
import { useEffect } from "react";


const UserCart = (props) => {
    const { individualRecipe, setIndRecipe, recipe } = props;
    console.log(individualRecipe)
    const params = useParams();
    const recipeIDParam = params.recipeID;
    const uri = `https://api.edamam.com/api/recipes/v2/${recipeIDParam}?type=public&app_id=42895daf&app_key=9bed4c3632880a266b7f8179179ddb1e`

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch (uri, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const responseJSON = await response.json();
            const allData = responseJSON.hits
            console.log(allData)
        }
        fetchRecipes();
    }, [])

    const foundRecipe = recipe.find((indRecipe) => {
        if (indRecipe.uri === `http://www.edamam.com/ontologies/edamam.owl#recipe_${recipeIDParam}`){
            console.log(indRecipe)
            return true
        }
    });

    return (
        <div>
            <h3>{foundRecipe}</h3>
        </div>
    )
};

export default UserCart;