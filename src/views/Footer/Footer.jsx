import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright© {year} - Money Goals SRL Unipersonale</p>
    </footer>
  );
}

export default Footer;
