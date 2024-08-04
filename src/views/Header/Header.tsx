import React from "react";

function Header() {
	function handleMenu() {
		var menu = document.getElementById("navbar-menu");
		var logo = document.getElementById("logo-container");
		var navbar = document.getElementById("header-navbar");

		if (!menu || !logo || !navbar) {
			console.log(
				"Elements with id 'navbar-menu', 'logo-container' and 'header-navbar' must all exist."
			);
			return;
		}

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

	return (
		<header>
			<a href="/" className="logo-container" id="logo-container">
				<img src="/images/favicon.png" alt="logo"></img>
				<h2 id="name">MONEY MANAGER</h2>
			</a>
			<div className="header-navbar" id="header-navbar">
				<div className="hamburger-div" id="hamburger-div">
					<img
						src="/images/hamburger-icon.png"
						alt="hamburger-icon"
						className="hamburger"
						onClick={handleMenu}
					/>
				</div>
				<div className="navbar-menu" id="navbar-menu">
					<a className="navbar-element" href="/">
						Home
					</a>
					<a className="navbar-element" href="/terms-and-conditions">
						T&Cs
					</a>
				</div>
			</div>
		</header>
	);
}

export default Header;
