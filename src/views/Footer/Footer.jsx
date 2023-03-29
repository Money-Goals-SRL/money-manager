import React from "react";
import Sponsor from "./Sponsor";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      {" "}
      <Sponsor />
      <footer>
        <div>
          <a href="./disclaimer">Disclaimer</a>
          <a href="./privacy">Privacy Policy</a>
          <a href="./cookies">Cookies</a>
          <a href="./terms-and-conditions">Termini e Condizioni</a>
        </div>
        <div>
          <p className="copyright">
            Copyright© {year} - Money Goals SRL Unipersonale - Tutti i diritti
            riservati
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
