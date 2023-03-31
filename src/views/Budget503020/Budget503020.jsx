import React, { useState } from "react";
import sanitizeInput from "../../Utilities/sanitizeInput";
import Budget503020Results from "./Budget503020Results";
import Input from "../Components/Input";

function Budget503020() {
  var [value, setValue] = useState("");
  var [savings, setSavings] = useState("");
  var [expenses, setExpenses] = useState("");
  var [invest, setInvest] = useState("");
  var [fun, setFun] = useState("");
  var [msg, setMsg] = useState("");

  function calcBudget(event) {
    event.preventDefault();
    if (value <= 0) {
      setMsg("Non hai inserito un risparmio mensile valido!");
    } else {
      setSavings(value);
      setExpenses(parseFloat(value) * 0.5);
      setInvest(parseFloat(value) * 0.3);
      setFun(parseFloat(value) * 0.2);
    }
  }

  function handleChange(event) {
    setValue(sanitizeInput(event.target.value));
  }

  return (
    <div>
      <h3>Budget 50-30-20</h3>
      <p>
        Qui puoi stabilire quale budget dedicare alle diverse tipologie di spesa
        in funzione del tuo risparmio mensile.
      </p>
      <div>
        <form>
          <Input
            name="saving"
            label="Risparmio mensile"
            placeholder="es. 1000"
            function={handleChange}
            postLabel="€"
          />
          <button onClick={calcBudget}>Calcola</button>
        </form>
        <br />
        {expenses && invest && fun ? (
          <Budget503020Results
            savings={savings}
            expenses={expenses}
            invest={invest}
            fun={fun}
          />
        ) : msg ? (
          <p className="error-message">{msg}</p>
        ) : null}
      </div>
    </div>
  );
}

export default Budget503020;
