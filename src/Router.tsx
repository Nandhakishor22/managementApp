import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import ProtectedRoute from "./Routes/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Menu from "./pages/Menu";
import Hotels from "./pages/Hotels";
import HotelData from "./pages/HotelData";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";

export const Router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<ProtectedRoute/>}>
                <Route index element={<LandingPage/>}/>
                <Route path="/menu" element={<Menu/>}/>
                <Route path="/hotels" element={<Hotels/>}/>
                <Route path="/view" element={<HotelData/>}/>
            </Route>
            <Route path="/login" element={<Login/>}/>
            <Route path="/createAcccount" element={<Signup/>}/>
        </>
    )
)