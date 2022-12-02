import './App.css';
import { createBrowserRouter, RouterProvider, useParams } from "react-router-dom";
import GlobalLayout from './Layouts/GlobalLayout';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import RecipePage from './Pages/RecipePage';
import { useState } from 'react';
import UserCart from './Components/UserCart';

function App() {
  const [recipe, setRecipe] = useState([]);
  const [userInput, setUserInput] = useState("Winter");
  const [individualRecipe, setIndRecipe] = useState({});
 
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
          element: <UserCart recipe={recipe} individualRecipe={individualRecipe} setIndRecipe={setIndRecipe}/>,
          path: "/cart/:recipeID"
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

