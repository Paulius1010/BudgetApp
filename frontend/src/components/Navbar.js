import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
        <div className="site-navbar site-navbar-target bg-white" role="banner">
            <div className="container">
                <div className="row align-items-center position-relative">
                    <div className="col-lg-4">
                        <nav className="site-navigation text-right ml-auto " role="navigation">
                            <ul className="site-menu main-menu js-clone-nav ml-auto d-none d-lg-block">
                                {currentUser ? (
                                    <>
                                        <li className="active">
                                            <Link to={"/welcome"} className="nav-link">
                                                Namai
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="active">
                                            <Link to={"/"} className="nav-link">
                                                Namai
                                            </Link>
                                        </li>
                                    </>
                                )}

                                {currentUser ? (
                                    <>
                                        <li className="active">
                                            <Link to={"/income"} className="nav-link" >
                                                Pajamos
                                            </Link>
                                        </li>
                                        <li>
                                            <a href="/" className="nav-link" onClick={logOut}>
                                                Atsijungti
                                            </a>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link to={"/login"} className="nav-link">
                                                Prisijungti
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={"/register"} className="nav-link">
                                                Registruotis
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-4 text-center">
                        <div className="site-logo">
                            <a href="/">taupyk</a>
                        </div>
                        <div className="ml-auto toggle-button d-inline-block d-lg-none"><a href="#"
                            className="site-menu-toggle py-5 js-menu-toggle text-black"><span className="icon-menu h3 text-black"></span></a>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <nav className="site-navigation text-left mr-auto " role="navigation">
                            <ul className="site-menu main-menu js-clone-nav ml-auto d-none d-lg-block">
                                <li><a href="about.html" className="nav-link">Apie mus</a></li>
                                <li><a href="blog.html" className="nav-link">Tinklaraštis</a></li>
                                <li><a href="contact.html" className="nav-link">Kontaktai</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Insert the break element everywhere but homepage */}
            {location.pathname === "/" ? "" : < hr />}
        </div>
    )
}
