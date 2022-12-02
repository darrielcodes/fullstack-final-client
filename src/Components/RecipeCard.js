

const RecipeCard = (props) => {
    const { recipe } = props;
    
    return (
        <div>
            <h2>All ingredients: {recipe.name}</h2>
        </div>
    )
};

export default RecipeCard;