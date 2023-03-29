import React from "react";

function Header() {
  return (
    <header>
      <a href="./">LOGO</a>
      <div className="header-navbar">
        <a href="./" className="header-link">
          Home
        </a>
        <a href="./profile" className="header-link">
          Profile
        </a>
        <a href="./budget-50-30-20" className="header-link">
          Budget
        </a>
      </div>
    </header>
  );
}

export default Header;
