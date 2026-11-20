import React from "react";
import { Navigate } from "react-router-dom";

function AdminRoutes({children}){

    let token=localStorage.getItem('token')
    let user=null;

    try{
      user=JSON.parse(localStorage.getItem("user"));


    }catch(error){
        user=null;
    }
     console.log(user);
    console.log(user?.role);

    if(!token || !user){
        return <Navigate to='/login' replace/>
    }

    if(user.role !== "admin"){
        return <Navigate to='/' replace />
    }

    return children;

    
}

export default AdminRoutes;