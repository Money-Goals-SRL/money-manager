import React, { useState } from "react";
import sanitizeInput from "../../Utilities/sanitizeInput";
import Input from "../Components/Input";

function Mortgage() {
  // showResults: boolean value to manage the table on screen, if true results are shown.
  // data: object that manages the input field of the page form.
  // results: object that manages the calculations and the results tables shown on page.
  var [showResults, setShowResults] = useState(false);
  var [data, setData] = useState({
    principal: "",
    rate: "",
    frequency: "month",
    years: "",
  });
  var [results, setResults] = useState({
    payment: "",
    principal: "",
    totalAmount: "",
    totalInterest: "",
    interestPercentage: "",
    cagr: "",
    paymentsArr: "",
    interestArr: "",
    principalArr: "",
    outstandingDebtArr: "",
  });
  var [msg, setMsg] = useState("");

  function reset(event) {
    // Removes the result tables from the screen
    event.preventDefault();
    setShowResults(false);
  }
  function calculate(event) {
    // Return the results object with data to be shown on the page
    event.preventDefault();
    setShowResults(true);

    // Input validation and data type control
    var principal = parseFloat(data.principal) || 0;
    var months = parseFloat(data.years) * 12 || 0;
    if (months === 0) {
      // Imposto il valore di default pari a 10 anni
      setData({ ...data, years: "10" });
      months = 10 * 12;
    }
    var rate = parseFloat(data.rate) || 0;
    if (data.frequency === "month") {
      rate = rate / 12;
    } else {
      months = months / 12;
    }
    rate = rate / 100;

    // Monthly payment calculation
    var payment = 0;
    if ((rate === 0 && months === 0) || months === 0) {
      payment = 0;
    } else if (rate === 0) {
      payment = principal / months;
    } else {
      payment =
        principal *
        ((rate * (1 + rate) ** months) / ((1 + rate) ** months - 1));
    }

    // Initialization of results table arrays
    var paymentsArr = [];
    var interestArr = [];
    var principalArr = [];
    var outstandingDebtArr = [];
    var array = [];

    // Creation of the results table arrays
    for (var i = 0; i < months; i++) {
      array.push(i + 1);
      paymentsArr.push(payment);
      if (i === 0) {
        interestArr.push(principal * rate);
      } else {
        interestArr.push(outstandingDebtArr[i - 1] * rate);
      }
      principalArr.push(payment - interestArr[i]);
      if (i === 0) {
        outstandingDebtArr.push(principal - principalArr[i]);
      } else {
        outstandingDebtArr.push(
          Math.abs(outstandingDebtArr[i - 1] - principalArr[i])
        );
      }
    }

    // Other results object calculations
    var cagr;
    if (principal === 0) {
      cagr = 0;
    } else {
      cagr =
        (((payment * months) / principal) ** ((1 / months) * 12) - 1) * 100;
    }
    const totalAmount = payment * months;
    const totalInterest = payment * months - principal;
    const interestPercentage = ((payment * months) / principal - 1) * 100 || 0;

    // Results object assignment
    setResults({
      paymentsArr: paymentsArr,
      interestArr: interestArr,
      principalArr: principalArr,
      outstandingDebtArr: outstandingDebtArr,
      totalAmount: totalAmount,
      payment: payment,
      totalInterest: totalInterest,
      interestPercentage: interestPercentage,
      principal: principal,
      cagr: cagr,
      frequency: data.frequency,
    });

    return;
  }

  function handleChange(event) {
    event.target.value = sanitizeInput(event.target.value);
    if (event.target.value < 0) event.target.value = 0;
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div>
      <h3>Simulatore Mutuo</h3>
      <p>
        Qui puoi calcolare il piano di ammortamento di un mutuo alla francese,
        inserendo un tasso di interesse, un importo prestato e la durata del
        mutuo.
      </p>
      <div>
        <form>
          <Input
            name="principal"
            label="Capitale Prestato"
            value={data.principal || ""}
            placeholder="es. 1000"
            function={handleChange}
            postLabel="€"
            type="number"
          />
          <Input
            name="rate"
            label="Tasso di Interesse"
            value={data.rate || ""}
            placeholder="es. 5 = 5%"
            function={handleChange}
            postLabel="%"
            type="number"
          />
          <Input
            name="years"
            label="Durata"
            value={data.years || ""}
            placeholder="es. 15"
            function={handleChange}
            postLabel="Anni"
            type="number"
          />
          <label htmlFor="frequency">
            <p className="pre-label">Frequenza delle Rate</p>
            <div className="input-container">
              <select name="frequency" id="frequency" onChange={handleChange}>
                <option value="month" defaultValue>
                  Mensile
                </option>
                <option value="year">Annuale</option>
              </select>
            </div>
          </label>
          <button onClick={calculate}>Calcola</button>
          <button onClick={reset}>Cancella</button>
        </form>
        <br />
        {showResults && (
          <>
            <div className="summary-table">
              <div className="head">
                <div>Rata del Mutuo</div>
                <div>Costo Totale</div>
                <div>Interessi Totali</div>
                <div>Interessi %</div>
                <div>CAGR</div>
              </div>
              <div className="body">
                <div>{results.payment.toFixed(2)} €</div>
                <div>{results.totalAmount.toFixed(2)} €</div>
                <div>{results.totalInterest.toFixed(2)} €</div>
                <div>{results.interestPercentage.toFixed(2)} %</div>
                <div>{results.cagr.toFixed(2)} %</div>
              </div>
            </div>
            <div className="summary-table">
              <div className="head">
                <div>{results.frequency === "month" ? "Mese" : "Anno"}</div>
                <div>Importo Rata</div>
                <div>Principale</div>
                <div>Interessi</div>
                <div>Debito Residuo</div>
              </div>
              <div>
                {results.paymentsArr.map((n, i) => {
                  return (
                    <div className="body">
                      <div>{i + 1}</div>
                      <div>{results.payment.toFixed(2)} €</div>
                      <div>{results.principalArr[i].toFixed(2)} €</div>
                      <div>{results.interestArr[i].toFixed(2)} €</div>
                      <div>{results.outstandingDebtArr[i].toFixed(2)} €</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Mortgage;
