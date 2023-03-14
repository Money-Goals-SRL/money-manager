import React from "react";

function Home() {
  return (
    <div class="home">
      <h1>Money Manager</h1>

      <p>Seleziona uno dei calcolatori a disposizione</p>
      <div>
        {" "}
        <a href="./budget-50-30-20">
          <h3>Budget 50/30/20</h3>
        </a>
        <a href="./saving-to-goal">
          <h3>Rispamio per Target</h3>
        </a>
      </div>
    </div>
  );
}

export default Home;
