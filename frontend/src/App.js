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
import AboutUs from "./components/AboutUs";
import Contacts from "./components/Contacts.js";
import Blog from "./components/Blog.js";

const App = () => {
  return (
    <>
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
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/blog" element={<Blog />} />
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
