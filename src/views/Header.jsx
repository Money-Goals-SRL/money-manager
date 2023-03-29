import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  var [isAuth, setIsAuth] = React.useState(sessionStorage.getItem("isAuth"));
  const navigate = useNavigate();

  function handleMenu() {
    var menu = document.getElementById("dropdowns");
    var logo = document.getElementById("logo-container");
    var navbar = document.getElementById("header-navbar");

    if (menu.classList.contains("opened-menu")) {
      // Closing the menu
      logo.classList.remove("hidden");
      menu.classList.remove("opened-menu");
      navbar.classList.remove("opened-navbar");
    } else {
      // Opening the menu
      logo.classList.add("hidden");
      menu.classList.add("opened-menu");
      navbar.classList.add("opened-navbar");
    }
  }

  async function sessionLogout(event) {
    event.preventDefault();
    sessionStorage.removeItem("isAuth");
    sessionStorage.removeItem("user");
    setIsAuth(sessionStorage.getItem("isAuth"));
    await fetch("/logout").then(() => navigate("/logout"));
  }

  async function checkAuth() {
    await fetch("/isAuth", { method: "POST", credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setIsAuth(data.auth);
      });
  }

  return (
    <header>
      <div className="header-div">
        <div className="logo-container" id="logo-container">
          <a href="/">
            <img
              className="logo-mg"
              src="/images/logos/money-goals-logo.png"
              alt="money-goals-logo"
            />
          </a>
        </div>
        <div className="header-navbar" id="header-navbar">
          <div
            className="hamburger-div"
            id="hamburger-div"
            onClick={handleMenu}
          >
            <img
              src="./images/header/hamburger-icon.png"
              alt="hamburger-icon"
              className="hamburger"
            />
          </div>
          <div className="dropdowns" id="dropdowns">
            <a className="header-element" href="/holdings">
              Holdings
            </a>
            <a className="header-element" href="/courses">
              Courses
            </a>
            {!sessionStorage.getItem("isAuth") ? (
              <>
                <a className="header-element" id="register" href="/register">
                  Register
                </a>
                <a
                  className="header-element"
                  id="login"
                  href="/login"
                  onClick={checkAuth}
                >
                  Login
                </a>
              </>
            ) : (
              <>
                <a className="header-element" id="account" href="/account">
                  Account
                </a>
                <a
                  className="header-element"
                  id="logout"
                  onClick={sessionLogout}
                  href="/logout"
                >
                  Logout
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
