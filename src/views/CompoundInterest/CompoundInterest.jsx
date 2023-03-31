import React, { useState } from "react";
import sanitizeInput from "../../Utilities/sanitizeInput";
import CompoundInterestResults from "./CompoundInterestResults";
import Input from "../Components/Input";

function CompoundInterest() {
  var [showResults, setShowResults] = useState(false);
  var [data, setData] = useState({
    capital: "",
    rate: "",
    frequency: "year",
    years: "",
    months: "",
    days: "",
  });
  var [results, setResult] = useState({
    initial: "",
    rate: "",
    frequency: "",
    years: "",
    months: "",
    days: "",
    final: "",
    interest: "",
  });
  var [msg, setMsg] = useState("");

  function calculate(event) {
    event.preventDefault();
    setShowResults(true);
    var capital = data.capital || 0;
    var time = 0;
    var rate = 0;
    switch (data.frequency) {
      case "year":
        time = data.years;
        rate = data.rate * 0.01;
        break;
      case "month":
        time = data.years * 12 + data.months;
        rate = data.rate / 12;
        break;
      case "day":
        time = data.years * 365 + data.months * (365 / 12) + data.days;
        rate = (data.rate * 0.01) / 365;
        break;
      default:
        break;
    }
    const finalAmount = capital * (1 + rate) ** time;
    const interest = finalAmount - capital;
    console.log(interest, finalAmount);
    setResult({
      initial: parseFloat(data.capital).toFixed(2),
      rate: parseFloat(data.rate).toFixed(2),
      frequency: data.frequency,
      years: data.years,
      months: data.months,
      days: data.days,
      final: parseFloat(finalAmount).toFixed(2),
      interest: parseFloat(interest).toFixed(2),
    });
    console.log(typeof results);
    return;
  }

  function handleChange(event) {
    event.target.value = sanitizeInput(event.target.value);
    if (event.target.value < 0) event.target.value = 0;
    switch (event.target.name) {
      case "months":
        if (event.target.value > 11) event.target.value = 11;
        break;
      case "days":
        if (event.target.value > 30) event.target.value = 30;
        break;
      default:
        break;
    }
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div>
      <h3>Interesse Composto</h3>
      <p>
        Qui puoi calcolare quanti soldi avrai sfruttando l'interesse composto, a
        partire da un certo capitale iniziale, un tasso di interesse applicato
        con una certa frequenza e un determinato periodo di tempo.
      </p>
      <div>
        <form>
          <Input
            name="capital"
            label="Capitale Iniziale"
            value={data.capital || ""}
            placeholder="es. 1000"
            function={handleChange}
            postLabel="€"
            type="number"
          />{" "}
          <Input
            name="rate"
            label="Rate"
            value={data.rate || ""}
            placeholder="es. 5 = 5%"
            function={handleChange}
            postLabel="%"
            type="number"
          />{" "}
          <label htmlFor="frequency">
            <p className="pre-label">Frequenza dei Pagamenti</p>
            <div className="input-container">
              <select name="frequency" id="frequency" onChange={handleChange}>
                <option value="year" defaultValue>
                  Annuale
                </option>
                <option value="month">Mensile</option>
                <option value="day">Giornaliera</option>
              </select>
            </div>
          </label>
          <div>
            {(data.frequency === "year" ||
              data.frequency === "month" ||
              data.frequency === "day") && (
              <Input
                name="years"
                label="Tempo"
                value={data.years || ""}
                placeholder="es. 15"
                function={handleChange}
                postLabel="Anni"
                type="number"
              />
            )}
            {(data.frequency === "month" || data.frequency === "day") && (
              <Input
                name="months"
                label=""
                value={data.months || ""}
                placeholder="es. 5"
                function={handleChange}
                postLabel="mesi"
                type="number"
              />
            )}
            {data.frequency === "day" ? (
              <Input
                name="days"
                label=""
                value={data.days || ""}
                placeholder="es. 23"
                function={handleChange}
                postLabel="Giorni"
                type="number"
              />
            ) : null}
          </div>
          <button onClick={calculate}>Calcola</button>
        </form>
        <br />
        {showResults ? (
          <p>
            Dopo{" "}
            {results.years + (results.years === "1" ? " anno, " : " anni, ") ||
              0}
            {(results.frequency === "month" || results.frequency === "day") &&
              results.months +
                (results.months === 1 ? " mese, " : "mesi, ")}{" "}
            {results.frequency === "day" && results.days + " giorni, "}
            partendo da un capitale pari a {results.initial || 0} € e con un
            tasso di interesse annuo dello {results.rate || "0.00"} %, avrai un
            capitale finale pari a {results.final || 0} €, perchè avrai
            guadagnato {results.interest || 0} € lordi.
          </p>
        ) : msg ? (
          <p className="error-message">{msg}</p>
        ) : null}
      </div>
    </div>
  );
}

export default CompoundInterest;
