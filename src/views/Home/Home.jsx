import React from "react";

function Home() {
  return (
    <div class="home">
      <div className="home-bg"></div>
      <div>
        <h1>Money Manager</h1>

        <p>Seleziona uno dei calcolatori a disposizione</p>
        <div className="home-menu">
          {" "}
          <a href="./budget-50-30-20">
            <div className="home-link">
              <h3>Budget 50/30/20</h3>{" "}
            </div>
          </a>
          <a href="./saving-to-goal">
            <div className="home-link">
              <h3>Tempo per Target</h3>{" "}
            </div>
          </a>
          <a href="./irr">
            <div className="home-link">
              <h3>Internal Rate of Return</h3>{" "}
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
