import NavBar from "../Components/NavBar";
import { Outlet } from "react-router-dom";

const GobalLayout = (() => {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    )
});

export default GobalLayout;