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
import AccountPage from './Pages/AccountPage';
import LandingPage from './Pages/LandingPage';
import bg from "./img/bg2.jpg"


const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

function App() {
  const [recipe, setRecipe] = useState([]);
  const [userInput, setUserInput] = useState("Winter");
  const [individualRecipe, setIndRecipe] = useState({});
  const [cart, setCart] = useState([]);
 
  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element: <GlobalLayout />,
    //   children: [
    //     {
    //       element: <LandingPage setUserInput={setUserInput}/>,
    //       index: true
    //     },
    {
      path: "/",
      element: <LandingPage />
    }, {
      element: <GlobalLayout />,
      children: [
        {
          element: <HomePage setUserInput={setUserInput}/>,
          path: "/home"
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
        },
        {
          element: <AccountPage urlEndpoint={urlEndpoint}/>,
          path: "/user-info"
        }
      ]
    }
  ])
  return (
    <div className="App" style={{ backgroundImage: `url(${bg})`, height: "100vh", width:"100%", opacity: "90%", backgroundRepeat: "no-repeat",overflow: "scroll", backgroundSize: "cover"}}>
    <RouterProvider router={router}/>
    </div>
  );
}

export default App;

