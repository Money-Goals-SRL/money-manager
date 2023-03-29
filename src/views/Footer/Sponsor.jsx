import React from "react";

function Sponsor() {
  return (
    <div className="sponsor">
      <div className="sponsor-title">
        <h4>Sponsor del sito web</h4>
      </div>
      <div className="sponsor-div">
        <a
          href="http://bit.ly/DEGIRO_LP"
          target="_blank"
          rel="nofollow noreferrer"
          className="sponsor-banner"
        >
          <div className="sponsor-single-box">
            <img
              src="./images/degiro-logo.png"
              border="0"
              alt="degiro-banner"
            />
          </div>
        </a>
        <a
          href="https://bit.ly/XTB_Leo"
          target="_blank"
          rel="noreferrer nofollow"
          className="sponsor-banner"
        >
          <div className="sponsor-single-box">
            <img border="0" src="./images/xtb-logo.png" alt="xtb-banner" />
          </div>
        </a>

        <a
          href="https://bit.ly/InteractiveBrokers-LP"
          target="_blank"
          rel="noreferrer nofollow"
          className="sponsor-banner"
        >
          <div className="sponsor-single-box">
            <img border="0" src="./images/ib-logo.png" alt="ib-banner" />
          </div>
        </a>
        <a
          href="https://bit.ly/Trading212_LP"
          target="_blank"
          rel="nofollow noreferrer"
          className="sponsor-banner"
        >
          <div className="sponsor-single-box">
            <img
              src="./images/trading212-logo.png"
              border="0"
              alt="trading212-banner"
            />
          </div>
        </a>
      </div>
    </div>
  );
}

export default Sponsor;
