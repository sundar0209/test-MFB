import React from "react";
import { Navigate } from "react-router-dom";
import { isLogin } from "./helper";

const PrivateRoute = ({component: Component, ...rest}) => {

    if(isLogin()){
        return <Component {...rest} />
    }
    return <Navigate to="/login" />
};

export default PrivateRoute;