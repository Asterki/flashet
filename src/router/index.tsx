import React from 'react'
import { Routes, Route } from "react-router-dom";

// Main
import Home from "../views/main/home"
import About from "../views/main/about"

// Accounts
import AccountsRegister from '../views/accounts/register';
import AccountsLogin from '../views/accounts/login';

const Router = () => {
    return (
        <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

            {/* Accounts Routes */}
            <Route path="/register" element={<AccountsRegister />} />
            <Route path="/login" element={<AccountsLogin />} />


            {/* 404 Page */}
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    );
}

export default Router;