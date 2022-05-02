import React, { useState, useEffect } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import AuthService from "../services/auth.service";
import "../navbar bootstrap/bootstrap.module.min.css"

export default function Navbar() {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const location = useLocation();

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }

    }, []);

    const logOut = () => {
        AuthService.logout();
    };


    return (
        <div className="site-navbar site-navbar-target bg-white"
            role="banner">
            <div className="container">
                <div className="row align-items-center position-relative">
                    <div className="col-lg-4">
                        <nav className="site-navigation text-right ml-auto "
                            role="navigation">
                            <ul className="site-menu main-menu js-clone-nav ml-auto d-none d-lg-block">
                                {showAdminBoard ? (
                                    <li >
                                        <NavLink to={"/"}
                                            className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                                            Namai
                                        </NavLink>
                                    </li>
                                ) : currentUser ? (
                                    <>
                                        <li >
                                            <NavLink to={"/welcome"}
                                                className={({ isActive }) => (isActive ? 'active' : 'inactive')} >
                                                Namai
                                            </NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li >
                                            <NavLink to={"/"}
                                                className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                                                Namai
                                            </NavLink>
                                        </li>
                                    </>
                                )}

                                {showAdminBoard ? (
                                    <>
                                        <li>
                                            <NavLink to={"/register"}
                                                className={({ isActive }) => (isActive ? 'active' : 'inactive')} >
                                                Vartotojų registracija
                                            </NavLink>
                                        </li>
                                        <li>
                                            <a href="/"
                                                onClick={logOut}>
                                                Atsijungti
                                            </a>
                                        </li>
                                    </>
                                ) : currentUser ? (
                                    <>
                                        <li>
                                            <NavLink to={"/income"}
                                                className={({ isActive }) => (isActive ? 'active' : 'inactive')} >
                                                Pajamos
                                            </NavLink>
                                        </li>
                                        <li>
                                            <a href="/"
                                                onClick={logOut}>
                                                Atsijungti
                                            </a>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li >
                                            <NavLink to={"/login"}
                                                className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                                                Prisijungti
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={"/register"}
                                                className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                                                Registruotis
                                            </NavLink>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-4 text-center">
                        <div className="site-logo">
                            {showAdminBoard ? (
                                <>
                                    <div >
                                        <NavLink to={"/"}
                                            className={({ isActive }) => (isActive ? 'active' : 'inactive')} >
                                            taupyk
                                        </NavLink>
                                    </div>
                                </>
                            ) : currentUser ? (
                                <>
                                    <div >
                                        <NavLink to={"/income"}
                                            className={({ isActive }) => (isActive ? 'active' : 'inactive')} >
                                            taupyk
                                        </NavLink>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div >
                                        <NavLink to={"/"}
                                            className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                                            taupyk
                                        </NavLink>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="ml-auto toggle-button d-inline-block d-lg-none">
                            <a href="#"
                                className="site-menu-toggle py-5 js-menu-toggle text-black"
                            >
                                <span className="icon-menu h3 text-black"></span>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <nav className="site-navigation text-left mr-auto "
                            role="navigation">
                            <ul className="site-menu main-menu js-clone-nav ml-auto d-none d-lg-block">
                                {!currentUser && (
                                    <>
                                        <li >
                                            <NavLink to={"/aboutus"}
                                                className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                                                Apie mus
                                            </NavLink>
                                        </li>
                                        <li >
                                            <NavLink to={"/blog"}
                                                className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                                                Tinklaraštis
                                            </NavLink>
                                        </li>
                                        <li >
                                            <NavLink to={"/contacts"}
                                                className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                                                Kontaktai
                                            </NavLink>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Insert the break element everywhere but homepage */}
            {location.pathname === "/" ? "" : < hr />}
        </div >
    )
}
