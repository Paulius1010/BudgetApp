import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
// import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import RegisterSuccess from "./components/RegisterSuccess";
import HomeLoggedIn from "./components/HomeLoggedIn";
import Income from "./components/Income";
import "./components/FontAwesomeIcon/Icons";
import './App.css'
import Navbar from "./components/Navbar";

const App = () => {
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
                  <Link to={"/income"} className="nav-link">
                    Income
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

      {/* This shows when the screen goes small and user clicks button to expand */}
      <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close mt-3">
            <span className="icon-close2 js-menu-toggle"></span>
          </div>
        </div>
        <div className="site-mobile-menu-body"></div>
      </div>

      <header>
        <Navbar />
      </header>

      <main>
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
          <Route path="/income" element={<Income />} />
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
