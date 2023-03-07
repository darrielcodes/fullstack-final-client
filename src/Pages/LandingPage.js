import RegistrationPage from "./RegistrationPage"
import LoginPage from "./LoginPage";

const LandingPage = () => {

    return (
        <div>
        <h1 style={{ fontFamily: "copperplate", background: "rgba(255, 255, 255, 0.5)", width: "50%", alignContent: "center", marginLeft: "300px"}}>Create-a-Meal Ecommerce Store</h1>
            <RegistrationPage />
            <LoginPage />
        </div>
    )
};

export default LandingPage;