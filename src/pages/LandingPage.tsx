import React from "react";
import { useData } from "../context/DataProvider";
import { auth } from "../firebaseConfig/firebaseConfig";
import Menu from "./Menu";
import Hotels from "./Hotels";
import { Login } from "./Login";

const LandingPage = () =>{
    const {isAdmin} = useData()
    const renderPage = () =>{
        if(auth.currentUser){
            if(isAdmin){
                return <Menu/>
            }
            else{
                return <Hotels/> //Change this after designing a user page
            }
        }
        else{
            return <Login/>
        }
    }

    return renderPage()
    
}
export default LandingPage