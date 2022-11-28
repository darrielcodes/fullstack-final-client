import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalLayout from './Layouts/GlobalLayout';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import RecipePage from './Pages/RecipePage';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <GlobalLayout />,
      children: [
        {
          element: <HomePage />,
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
          element: <RecipePage />,
          path: "/recipes"
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

