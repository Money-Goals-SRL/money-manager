import React from "react";
import Sponsor from "./Sponsor";

function Footer() {
	const year = new Date().getFullYear();
	return (
		<>
			{" "}
			<Sponsor />
			<footer>
				<div className="footer-navbar">
					<a href="/disclaimer" className="footer-link">
						Disclaimer
					</a>
					<a href="/privacy" className="footer-link">
						Privacy e Cookies
					</a>
					<a href="/terms-and-conditions" className="footer-link">
						Termini e Condizioni
					</a>
				</div>
				<div>
					<p className="copyright">
						Copyright© {year} - Money Goals SRL Unipersonale - Tutti i diritti riservati
					</p>
				</div>
			</footer>
		</>
	);
}

export default Footer;
