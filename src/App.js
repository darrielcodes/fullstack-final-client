import './App.css';
import { createBrowserRouter, RouterProvider, useParams } from "react-router-dom";
import GlobalLayout from './Layouts/GlobalLayout';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import RecipePage from './Pages/RecipePage';
import { useState } from 'react';
import IndRecipePage from './Pages/IndRecipePage';
import CheckoutPage from './Pages/CheckoutPage';


const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

function App() {
  const [recipe, setRecipe] = useState([]);
  const [userInput, setUserInput] = useState("Winter");
  const [individualRecipe, setIndRecipe] = useState({});
  const [cart, setCart] = useState([{}]);
 
  const router = createBrowserRouter([
    {
      path: "/",
      element: <GlobalLayout />,
      children: [
        {
          element: <HomePage setUserInput={setUserInput}/>,
          index: true
        },
        {
          element: <LoginPage />,
          path: "/login"
        },
        {
          element: <RegistrationPage />,
          path: "/registration"
        },
        {
          element: <RecipePage userInput={userInput} setUserInput={setUserInput} recipe={recipe} setRecipe={setRecipe} individualRecipe={individualRecipe} setIndRecipe={setIndRecipe}/>,
          path: "/recipes"
        },
        {
          element: <IndRecipePage recipe={recipe} individualRecipe={individualRecipe} setIndRecipe={setIndRecipe} urlEndpoint={urlEndpoint} cart={cart} setCart={setCart}/>,
          path: "/recipe/:recipeID"
        },
        {
          element: <CheckoutPage recipe={recipe} individualRecipe={individualRecipe} setIndRecipe={setIndRecipe} urlEndpoint={urlEndpoint} cart={cart} setCart={setCart}/>,
          path: "/checkout"
        }
      ]
    }
  ])
  return (
    <div className="App">
    <RouterProvider router={router}/>
    </div>
  );
}

export default App;

