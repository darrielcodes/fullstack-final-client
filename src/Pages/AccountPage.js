import OrderHistory from "../Components/OrderHistory"
import UserInfo from "../Components/UserInfo"


const AccountPage = (props) => {
const { urlEndpoint } = props;

    return (
        <div>
            <h1>Account Page</h1>
            <UserInfo urlEndpoint={urlEndpoint}/>
            <OrderHistory urlEndpoint={urlEndpoint}/>
        </div>
    )
};

 export default AccountPage;