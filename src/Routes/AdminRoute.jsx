import React from 'react';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import Spinner from '../Components/Spinner/Spinner';
import { Navigate } from 'react-router';

const AdminRoute = ({children}) => {
    const {user, loading}=useAuth();
    const {role, isLoading}=useUserRole();
    if(loading || isLoading){
        return <Spinner></Spinner>;
    }
    if(!user || role!== 'admin'){
        return <Navigate state={{from:location.pathname}} to={"/no-permission-to-access"}></Navigate>;
    }
    return children;
};

export default AdminRoute;