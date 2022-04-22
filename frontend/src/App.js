import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import RegisterSuccess from "./components/RegisterSuccess";
import HomeLoggedIn from "./components/HomeLoggedIn";
import './App.css'

const App = () => {

  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

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
    <>
      {/* <header className="container" >
        <nav className="navbar navbar-expand navbar-light "  >
          {currentUser ? (
            <Link to={"/welcome"} className="navbar-brand ">
              Home
            </Link>
          ) : (
            <Link to={"/"} className="navbar-brand">
              Home
            </Link>
          )}
          <div className="navbar-nav mr-auto">
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}
            {currentUser && (
              <>
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User board
                  </Link>
                </li>
              </>
            )}
          </div>
          {currentUser ? (
            <>
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    Log out
                  </a>
                </li>
              </div>
            </>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign up
                </Link>
              </li>
            </div>
          )}
        </nav>
      </header> */}

      <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close mt-3">
            <span className="icon-close2 js-menu-toggle"></span>
          </div>
        </div>
        <div className="site-mobile-menu-body"></div>
      </div>

      <header className="site-navbar site-navbar-target bg-white" role="banner">
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
                      <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                          <a href="/login" className="nav-link" onClick={logOut}>
                            Log out
                          </a>
                        </li>
                      </div>
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
                <a href="index.html">Brand</a>
              </div>
              <div className="ml-auto toggle-button d-inline-block d-lg-none"><a href="#" className="site-menu-toggle py-5 js-menu-toggle text-black"><span className="icon-menu h3 text-black"></span></a></div>
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
      </header>

      <main className="container mt-3">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          {/* <Route path="/mod" element={<BoardModerator />} /> */}
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/register-success" element={<RegisterSuccess />} />
          <Route path="/welcome" element={<HomeLoggedIn />} />
        </Routes>
      </main>

      {/* Commented the footer section for now */}
      {/* <footer className="container">
        <p>footer</p>
      </footer> */}
    </>
  );
};
export default App;
