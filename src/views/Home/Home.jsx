import React from "react";

function Home() {
  return (
    <>
      <div className="home-title">
        <h1>Money Manager</h1>
        <p>Seleziona uno dei calcolatori a disposizione</p>
      </div>
      <div className="home-body">
        {/* <div className="home-bg"></div> */}
        <div className="home-menu">
          <a href="./budget-50-30-20" className="home-link">
            <h3>Budget 50/30/20</h3>
          </a>
          <a href="./saving-to-goal" className="home-link">
            <h3>Tempo per Target</h3>
          </a>
          <a href="./irr" className="home-link">
            <h3>Internal Rate of Return</h3>
          </a>
          <a href="./compound-interest" className="home-link">
            <h3>Interesse Composto</h3>
          </a>
          <a href="./mortgage" className="home-link">
            <h3>Simulatore Mutuo</h3>
          </a>
          <a href="./net-salary" className="home-link">
            <h3>Calcola Stipendio Netto</h3>
          </a>
          <a href="./rental" className="home-link">
            <h3>Rendimento da Affitto</h3>
          </a>
        </div>
        <div className="home-menu">
          <div className="home-welcome">
            <p>
              Benvenuto!
              <br />
              Qui puoi trovare una serie di calcolari per gestire al meglio le
              tue finanze!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
