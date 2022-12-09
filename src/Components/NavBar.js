import { Link } from "react-router-dom"
import { useAuth } from "../Hooks/auth";
import { useNavigate } from "react-router";

const NavBar = (() => {
    const auth = useAuth();
    const navigate = useNavigate();
    return (
        <div>
            <h3>{auth.userEmail && `Current User: ${auth.userEmail}`}</h3>
            <Link to="/">Home </Link>
            <Link to="/registration">Register </Link>
            <Link to="/login">Login </Link>
            <Link to="/recipes">Recipes </Link>
            <Link to="/checkout">Cart </Link>
            <button onClick={() => {
                navigate("/login")
                auth.logout();
            }}>Logout</button>
        </div>
    )
});

export default NavBar;