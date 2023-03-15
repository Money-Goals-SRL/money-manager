import React, { useState } from "react";
import sanitizeInput from "../../Utilities/sanitizeInput";
import IRR from "../../Utilities/irr";

function InternalRateReturn() {
  var [cashflows, setCashflows] = useState([{ date: "", value: "" }]);
  var [irr, setIrr] = useState("");
  var [msg, setMsg] = useState("");

  function addField(event) {
    event.preventDefault();
    var newField = { date: "", value: 0 };
    setCashflows([...cashflows, newField]);
  }

  function calcIRR(event) {
    event.preventDefault();
    console.log(cashflows);
    setIrr(IRR(cashflows));
  }

  function handleChange(i, event) {
    const newCashflows = [...cashflows];

    if (event.target.name === "date" + i) {
      newCashflows[i].date = sanitizeInput(event.target.value);
    } else if (event.target.name === "value" + i) {
      newCashflows[i].value = sanitizeInput(event.target.value);
    }
    setCashflows(newCashflows);
  }

  return (
    <div>
      <h3>Tasso Interno di Rendimento</h3>
      <p>
        Qui puoi calcolare il tasso interno di rendimento (IRR) di una serie di
        flussi di cassa.
      </p>
      <div>
        <form>
          <p>Inserisci i flussi di cassa: </p>
          {cashflows.map((cf, i) => {
            return (
              <>
                <label htmlFor={"date" + i}>Data: </label>
                <input
                  value={cf.date}
                  name={"date" + i}
                  placeholder="yyyy-mm-gg"
                  onChange={(event) => handleChange(i, event)}
                ></input>{" "}
                <label htmlFor={"value" + i}>Importo: </label>
                <input
                  value={cf.value}
                  name={"value" + i}
                  placeholder="es. 1000"
                  onChange={(event) => handleChange(i, event)}
                ></input>{" "}
                €<br />
              </>
            );
          })}
          <button onClick={addField}>Aggiungi movimento</button>
          <button onClick={calcIRR}>Calcola IRR</button>
        </form>
        <br />
        {irr ? (
          <div>
            <p>
              Il tasso interno di rendimento è pari allo{" "}
              {(irr * 100).toFixed(2)} %.
            </p>
          </div>
        ) : msg ? (
          <p className="error-message">{msg}</p>
        ) : null}
      </div>
      <p style={{ color: "green", fontWeight: "bold" }}>
        ATTENZIONE: <br />
        Non inserire un valore iniziale positivo. Non avere movimenti per i
        quali la somma totale è negativa. In caso contrario, il sito si blocca.
      </p>
    </div>
  );
}

export default InternalRateReturn;
