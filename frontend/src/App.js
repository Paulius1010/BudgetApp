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
      {/* <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <a className="navbar-brand" href="#">Home</a>
          <div className="navbar-header">
            <a className="nav-item" href="#">Login</a>
            <a href="#">Sign up</a>
          </div>
          <a className="navbar-nav ml-auto" href="#">Login</a>
          <a className="navbar-nav ml-auto" href="#">Sign up</a>
          <ul className="nav navbar-nav navbar-right collapse navbar-collapse">
            <li className="active"><a href="#">Home</a></li>
            <li><a href="#">Login</a></li>
            <li><a href="#">Sign up</a></li>
          </ul>
        </div>
    </nav> */}

{/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button
      className="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i className="fas fa-bars"></i>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a className="nav-link active" aria-current="page" href="#">Home</a>
        <a className="nav-link" href="#">Features</a>
        <a className="nav-link" href="#">Pricing</a>
        <a className="nav-link disabled">Disabled</a>
      </div>
    </div>
  </div>
</nav> */}
<div className="container">
          <div className="row align-items-center position-relative">

            <div className="col-lg-4">
              <nav className="site-navigation text-right ml-auto " role="navigation">
                <ul className="site-menu main-menu js-clone-nav ml-auto d-none d-lg-block">
                  <li className="active"><a href="index.html" className="nav-link">Home</a></li>
                  <li><a href="project.html" className="nav-link">Projects</a></li>
                  <li><a href="services.html" className="nav-link">Services</a></li>
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
                  <li><a href="about.html" className="nav-link">About</a></li>
                  <li><a href="blog.html" className="nav-link">Blog</a></li>
                  <li><a href="contact.html" className="nav-link">Contact</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

      <header className="container" >
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

      <footer className="container">
        <p>footer</p>
      </footer>
    </>
  );
};
export default App;
