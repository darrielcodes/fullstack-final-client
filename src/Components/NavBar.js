import { Link } from "react-router-dom"
import { useAuth } from "../Hooks/auth";
import { useNavigate } from "react-router";

const NavBar = (() => {
    const auth = useAuth();
    const navigate = useNavigate();
    return (
        <div className="nav-bar">
            <h3>{auth.userEmail && `Hello ${auth.userEmail}!`}</h3>
            <Link to="/home">Home </Link>
            <Link to="/registration">Register </Link>
            <Link to="/login">Login </Link>
            <Link to="/recipes">Recipes </Link>
            <Link to="/checkout">Cart </Link>
            <Link to="/user-info">Account</Link>
            <button onClick={() => {
                navigate("/login")
                auth.logout();
            }}>Logout</button>
        </div>
    )
});

export default NavBar;