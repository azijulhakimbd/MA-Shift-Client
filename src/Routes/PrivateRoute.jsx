import React from 'react';
import useAuth from '../Hooks/useAuth';

const PrivateRoute = () => {
    const {user,loading}= useAuth()
    return (
        <div>
            
        </div>
    );
};

export default PrivateRoute;