import React from 'react'
import { Navigate } from 'react-router-dom'
const ProduCutRoute = ({ isAuthanticate, children }) => {
    if (!isAuthanticate) {
        return <Navigate to="/login" />;
    }
    return children;
}

export default ProduCutRoute