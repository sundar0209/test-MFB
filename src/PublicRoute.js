import React from "react";
import { Navigate } from "react-router-dom";
import { isLogin } from "./helper";

const PublicRoute = ({component: Component, ...rest}) => {

    if(isLogin()){
        return <Navigate to="/dashboard" />
    }
    return <Component {...rest} />
};

export default PublicRoute;

