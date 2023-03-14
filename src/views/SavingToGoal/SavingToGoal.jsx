import React, { useState } from "react";
import sanitizeInput from "../../Utilities/sanitizeInput";

function SavingToGoal() {
  var [savingValue, setSavingValue] = useState("");
  var [targetValue, setTargetValue] = useState("");
  var [savings, setSavings] = useState("");
  var [target, setTarget] = useState("");
  var [months, setMonths] = useState("");
  var [years, setYears] = useState("");
  var [msg, setMsg] = useState("");

  function calcTime(event) {
    event.preventDefault();
    if (savingValue <= 0 || targetValue <= 0) {
      setMsg(
        "Non hai inserito un risparmio mensile e/o un target da raggiungere valido!"
      );
    } else {
      setSavings(savingValue);
      setTarget(targetValue);
      setMonths(
        Math.ceil(
          (parseFloat(targetValue) % (parseFloat(savingValue) * 12)) /
            parseFloat(savingValue)
        )
      );
      setYears(
        Math.floor(parseFloat(targetValue) / (parseFloat(savingValue) * 12))
      );
      console.log(savings, target);
    }
  }

  function handleChange(event) {
    if (event.target.name === "saving") {
      setSavingValue(sanitizeInput(event.target.value));
    } else if (event.target.name === "amount") {
      setTargetValue(sanitizeInput(event.target.value));
    }
  }

  return (
    <div>
      <h3>Risparmio per Raggiungere un Obiettivo</h3>
      <p>
        Qui puoi calcolare in quanto tempo raggiungerai una certa somma, a
        partire da quanto riesci a risparmiare ogni mese.
      </p>
      <div>
        <form>
          <label htmlFor="saving">Inserisci il tuo risparmio mensile: </label>
          <input
            value={savingValue}
            name="saving"
            placeholder="es. 100"
            onChange={handleChange}
          ></input>{" "}
          €
          <br />
          <label htmlFor="amount">
            Inserisci il tuo target da raggiungere:{" "}
          </label>
          <input
            value={targetValue}
            name="amount"
            placeholder="es. 1000"
            onChange={handleChange}
          ></input>{" "}
          €<br />
          <button onClick={calcTime}>Calcola</button>
        </form>
        <br />
        {savings && target ? (
          <div>
            <p>
              Con un risparmio di {parseFloat(savings).toFixed(2)} € al mese,
              per raggiungere la somma di {parseFloat(target).toFixed(2)} €, ci
              impiegherai{" "}
              {years === 0 && months === 0
                ? "meno di un mese!"
                : years === 0
                ? ""
                : years === 1
                ? years + " anno"
                : years + " anni"}
              {months === 0
                ? "."
                : years === 0
                ? months + " mesi."
                : " e " + months + " mesi."}
            </p>
          </div>
        ) : msg ? (
          <p className="error-message">{msg}</p>
        ) : null}
      </div>
    </div>
  );
}

export default SavingToGoal;
