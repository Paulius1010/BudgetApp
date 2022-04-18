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
      <header className="container">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          {currentUser ? (
            <Link to={"/welcome"} className="navbar-brand">
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
