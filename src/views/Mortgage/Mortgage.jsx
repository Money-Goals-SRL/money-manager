import React, { useState } from "react";
import sanitizeInput from "../../Utilities/sanitizeInput";
import Input from "../Components/Input";
import IRR from "../../Utilities/irr";

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
    repaidPrincipal: "",
    // =SE(RESTO([@Mese];12)=1;SE([@Mese]>12;SE(Input!$F$29>P3;0;Input!$F$29);0);0)
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

  function calcPayment(r, n, C) {
    // r: interest rate; n: number of periods; C: debt outstanding
    // function returns p: payment per period
    var p = 0;
    if ((r === 0 && n === 0) || n === 0) {
      p = 0;
    } else if (r === 0) {
      p = C / n;
    } else {
      p = C * ((r * (1 + r) ** n) / ((1 + r) ** n - 1));
    }
    return p;
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
    var repaidPrincipal = parseFloat(data.repaidPrincipal) || 0;
    console.log(repaidPrincipal);

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
    // First element
    payment = calcPayment(rate, months, principal);
    paymentsArr[0] = payment;
    interestArr[0] = principal * rate;
    principalArr[0] = payment - interestArr[0];
    outstandingDebtArr[0] = principal - principalArr[0];
    array[0] = 1;

    for (var i = 1; i < months; i++) {
      if (i % 12 === 0) {
        payment = calcPayment(
          rate,
          months - i,
          outstandingDebtArr[i - 1 - (i % 12)]
        );
      }
      paymentsArr.push(payment);
      interestArr.push(outstandingDebtArr[i - 1] * rate);
      if ((i + 1) % 12 === 0) {
        if (repaidPrincipal >= outstandingDebtArr[i - 1]) {
          repaidPrincipal = outstandingDebtArr[i - 1];
        }
        principalArr.push(payment - interestArr[i] + repaidPrincipal);
      } else {
        principalArr.push(payment - interestArr[i]);
      }

      outstandingDebtArr.push(
        Math.max(0, outstandingDebtArr[i - 1] - principalArr[i])
      );
      array.push(i + 1);
    }

    // Other results object calculations
    const totalAmount = principal + interestArr.reduce((a, b) => a + b, 0);
    const totalInterest = interestArr.reduce((a, b) => a + b, 0);
    const interestPercentage = (totalInterest / principal) * 100 || 0;
    var currentYear = new Date().getFullYear();
    var cf = [];
    paymentsArr.forEach((pm, i) => {
      if (i === 0) {
        cf.push({ date: new Date(currentYear, i, 1), value: -principal });
      } else {
        console.log(repaidPrincipal);
        cf.push({
          date: new Date(currentYear, i + 1, 1),
          value: (i + 1) % 12 === 0 ? pm + repaidPrincipal : pm,
        });
      }
    });
    console.log(cf);
    const cagr = principal === 0 ? 0 : IRR(cf) * 100;
    console.log(cagr);
    // ((totalAmount / principal) ** (1 / data.years) - 1) * 100;

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
          <Input
            name="repaidPrincipal"
            label="Principale Restituito"
            value={data.repaidPrincipal || ""}
            placeholder="es. 2000"
            function={handleChange}
            postLabel="€/anno"
            type="number"
          />
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
                      <div>{results.paymentsArr[i].toFixed(2)} €</div>
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
