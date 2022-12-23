import OrderHistory from "../Components/OrderHistory"
import UserInfo from "../Components/UserInfo"


const AccountPage = (props) => {
const { urlEndpoint } = props;

    return (
        <div>
            <h2>My Account</h2>
            <UserInfo urlEndpoint={urlEndpoint}/>
            <OrderHistory urlEndpoint={urlEndpoint}/>
        </div>
    )
};

 export default AccountPage;