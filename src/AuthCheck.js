import React from "react";
import { Navigate } from "react-router-dom";

const AuthCheck = ({ children }) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        return children;
    }
    return <Navigate to='/login' />;
};

export default AuthCheck;