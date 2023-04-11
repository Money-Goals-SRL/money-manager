import React, { useState } from "react";
import sanitizeInput from "../../Utilities/sanitizeInput";
import Input from "../Components/Input";

function Rental() {
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

  function blockFinancialInputs() {
    const checkbox = document.getElementsByName("useMortgage")[0];
    const rateInput = document.getElementsByName("rate")[0];
    const yearsInput = document.getElementsByName("years")[0];

    rateInput.disabled = checkbox.checked;
    yearsInput.disabled = checkbox.checked;
  }

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
        (((payment * months) / principal) **
          ((1 / months) * (data.frequency === "month" ? 12 : 1)) -
          1) *
        100;
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
      <h3>Rendimento da Affitto Immobiliare</h3>
      <p>
        Qui puoi calcolare il rendimento di un investimento immobiliare a
        partire da una serie di input.
      </p>
      <div>
        <form>
          <div className="inputs-container">
            <div className="inputs-block">
              <h4>Acquisto Immobile</h4>
              <Input
                name="buy-cost"
                label="Costo d'Acquisto"
                value={data.buyPrice || ""}
                placeholder="es. 1000"
                function={handleChange}
                postLabel="€"
                type="number"
              />
              <Input
                name="tax"
                label="Imposte sull'Acquisto"
                value={data.tax || ""}
                placeholder="es. 200"
                function={handleChange}
                postLabel="€"
                type="number"
              />
              <Input
                name="agency"
                label="Agenzia Immobiliare"
                value={data.agency || ""}
                placeholder="es. 150"
                function={handleChange}
                postLabel="€"
                type="number"
              />
              <Input
                name="otherCosts"
                label="Altri Costi"
                value={data.otherCosts || ""}
                placeholder="es. 150"
                function={handleChange}
                postLabel="€"
                type="number"
              />
            </div>
            <div className="inputs-block">
              <h4>Finanziamento Operazione</h4>
              <Input
                name="downPayment"
                label="Equity Iniziale"
                value={data.downPayment || ""}
                placeholder="es. 1000"
                function={handleChange}
                postLabel="€"
                type="number"
              />
              <label
                for="useMortgage"
                style={{ display: "flex", margin: "1em 0.5em" }}
              >
                <b>Non mi serve il Mutuo</b>
                <input
                  style={{ width: "auto", margin: "auto" }}
                  type="checkbox"
                  id="useMortgage"
                  name="useMortgage"
                  onChange={blockFinancialInputs}
                ></input>
              </label>
              <Input
                name="rate"
                label="Tasso di Interesse Mutuo"
                value={data.rate || ""}
                placeholder="es. 2,5"
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
            </div>
            <div className="inputs-block">
              <h4>Reddito dell'Immobile</h4>
              <Input
                name="grossIncome"
                label="Affitto Lordo"
                value={data.grossIncome || ""}
                placeholder="es. 1000"
                function={handleChange}
                postLabel="€"
                type="number"
              />
              <Input
                name="incomeTax"
                label="Imposte sull'Affitto"
                value={data.incomeTax || ""}
                placeholder="es. 2,5"
                function={handleChange}
                postLabel="%"
                type="number"
              />
              <Input
                name="propertyTax"
                label="Imposte sull'Immobile"
                value={data.years || ""}
                placeholder="es. 2,5"
                function={handleChange}
                postLabel="%"
                type="number"
              />
            </div>
          </div>
          <button onClick={calculate}>Calcola</button>
          <button onClick={reset}>Cancella</button>{" "}
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

export default Rental;
