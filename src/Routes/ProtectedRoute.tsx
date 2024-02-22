import React, { useEffect } from "react";
import { Outlet,  useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

 const ProtectedRoute = () =>{
    const navigate = useNavigate()
    useEffect(()=>{
       const listener =  onAuthStateChanged(auth,async(user)=>{
            console.log("CHECKINGFORUSER",user)
            if(!user){
                navigate('/login')
            }
            return () =>{
                listener()
            }


        })
    },[])
    return(
        <Outlet/>
    )
}
export default ProtectedRoute