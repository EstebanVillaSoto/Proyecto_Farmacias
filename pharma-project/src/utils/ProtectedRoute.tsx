import { useContext } from "react";
import { UserContext } from "../App";
import Login from "../pages/logins/Login";

type ProtectedRouteProps = {
    adminComponent?: any;
    clientComponent?: any;
    pharmacyComponent?: any;
};

export default function ProtectedRoute(props: ProtectedRouteProps) {
    const userContext = useContext(UserContext);

    if (!userContext || !userContext[0]) {
        return <Login />;
    }

    const [user] = userContext;

    if (user.is_admin){
        return props.adminComponent;
    }
    else if (user.pharmacy_id != null){
        if (!props.pharmacyComponent) {
            return <div className="text-green-1 text-3xl font-bold absolute">404 Not Found</div>;
        }
        return props.pharmacyComponent;
    }
    else {
        return props.clientComponent;
    }
}