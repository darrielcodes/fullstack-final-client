import { useEffect, useState, useRef } from "react"
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
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [query, setQuery] = useState(''); // userInput?
    const [pagination, setPagination] = useState(0)
    const [currentUrl, setCurrentUrl] = useState(`https://api.edamam.com/api/recipes/v2?type=public&q=${userInput}&app_id=42895daf&app_key=9bed4c3632880a266b7f8179179ddb1e`)


    const prevSearchIdRef = useRef();
    useEffect(()=>{
      prevSearchIdRef.current = userInput;
    });
    console.log(prevSearchIdRef)
    const prevSearch = prevSearchIdRef.current
    let currentPagination = pagination;

    useEffect(()=>{
		const fetchRecipes = async () => {
            if(prevSearch !== userInput){
                currentPagination = 0;
                setPagination(0);
               };

			const response = await fetch(currentUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json", 
                  }
			});
			const responseJSON = await response.json();
            //const allData = responseJSON.hits
           console.log(responseJSON)
          // setCount(responseJSON.count)
           //setNextPage(responseJSON._links.next.href)
           //setPreviousPage()

            if (clicked === true) {
                nextClick(responseJSON)
            }
           const mappedData = () => {
            responseJSON.hits.map((newRecipe, index) => {
                //console.log(newRecipe.recipe.label)
                // setTitle(newRecipe.recipe.label)
                // setDescription(newRecipe.recipe.ingredients[0].text)
                //console.log(newRecipe)
                return newRecipe
            })
        };
            //setCurrentUrl(responseJSON._links.next.href)
            mappedData();
			setRecipe(responseJSON.hits)
        }
		fetchRecipes()
    }, [userInput, pagination]);

    const prevClick = () => {
        if(pagination === 0){
          return;
        }
        setPagination(pagination-10);
    }
  
    const [clicked, setClicked] = useState(false)
    const nextClick = (responseJSON) => {
        setClicked(true)
        setCurrentUrl(responseJSON._links.next.href)
        setPagination(pagination+10);

    };

  console.log(clicked)

  //console.log(recipe[0])

    const slicedURI = (uri) => {
        const recipeID = uri.slice(51)
        return recipeID
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
                 //console.log(individualRecipe)
                return (
                    <div style={{ background: "rgba(255, 255, 255, 0.5)", width: "75%", alignContent: "center", marginLeft: "150px"}}>
                        <h2>{indRecipe.label}</h2>
                        <img src={indRecipe.images.THUMBNAIL.url}></img>
                        <br/>
                        <button onClick={(e) => {
                            handleClick();
                           // console.log(indRecipe)
                        }}>Show Ingredients</button>
                        <button onClick={(e) => {
                        selectRecipe(indRecipe);
                        navigate(`/recipe/${slicedURI(indRecipe.uri)}`)
                        }}>Shop for items</button>
                        {indRecipe.ingredientLines.map((line, index) => {
                            return (
                                <div>
                                    <p>{displayed && line}</p>
                                </div>
                            )
                        })}
                <br/>
                <br/>
                        <label>Full recipe: </label>
                        <a href={indRecipe.url}>{indRecipe.label}</a>
                        <hr/>
                        </div>
                )}
             )}
             <br/>
          <button onClick={prevClick}>Prev</button>
          <button onClick={nextClick}>Next</button>
                        {/* <label>Page:</label>
                        <input type="number" value={page} onChange={(e) => {
                            setPage(e.target.value)
                        }}></input>
                        <br/> */}
        </div>
    )
};

export default RecipeCard;

// for price: ${indIngredients.weight.toFixed(2)