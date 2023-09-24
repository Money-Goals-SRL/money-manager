import React, { useState } from "react";
import sanitizeInput from "../../Utilities/sanitizeInput";
import Input from "../Components/Input";
import NetSalaryResults from "./NetSalaryResults";

function NetSalary() {
  var [showResults, setShowResults] = useState(false);

  var [data, setData] = useState({
    grossYearlyIncome: "",
    paymentsPerYear: 12,
    regionalTax: "",
    comunalTax: "",
  });

  var [results, setResults] = useState({
    grossYearlyIncome: "",
    pension: "",
    taxes: "",
    netYearlyIncome: "",
    grossMonthlyIncome: "",
    netMonthlyIncome: "",
    deduction: "",
    totalNetYearlyIncome: "",
    netMargin: "",
  });

  var [msg, setMsg] = useState("");

  function reset(event) {
    // Removes the result tables from the screen
    event.preventDefault();
    setShowResults(false);
  }

  function calcIRPEF(gross) {
    var net = 0;
    if (gross <= 15000) {
      net += gross * 0.23;
    } else if (gross > 15000) {
      net += 15000 * 0.23;
    }
    if (gross > 15000 && gross <= 28000) {
      net += (gross - 15000) * 0.25;
    } else if (gross > 28000) {
      net += 13000 * 0.25;
    }
    if (gross > 28000 && gross <= 50000) {
      net += (gross - 28000) * 0.35;
    } else if (gross > 55000) {
      net += 22000 * 0.35;
    }
    if (gross > 50000) {
      net += (gross - 50000) * 0.43;
    }
    return net;
  }

  function calcDeductions(gross) {
    var deduction = 0;

    if (gross <= 15000) {
      deduction = 1880;
    } else if (gross > 15000 && gross <= 28000) {
      deduction = 1910 + (1190 * (28000 - gross)) / 13000;
    } else if (gross > 28000 && gross <= 50000) {
      deduction = (1190 * (50000 - gross)) / 22000;
    }

    if (calcIRPEF(gross) <= deduction) deduction = 0;

    return deduction;
  }

  function calcPension(gross) {
    return gross * 0.0919;
  }

  var regionData = {
    Aosta: [1, 2, 3, 4, 5],
    Piemonte: [1, 2, 3, 4, 5],
    EmiliaRomagna: [1, 2, 3, 4, 5],
    Campania: [1, 2, 3, 4, 5],
    Basilicata: [1, 2, 3, 4, 5],
    Sardegna: [1, 2, 3, 4, 5],
  };

  function calculate(event) {
    // Return the results object with data to be shown on the page
    event.preventDefault();
    setShowResults(true);

    // Input validation and data type control
    var grossYearlyIncome = parseFloat(data.grossYearlyIncome) || 0;
    var comunalTax = parseFloat(data.comunalTax) || 0;
    var regionalTax = parseFloat(data.regionalTax) || 0;
    var months = parseFloat(data.paymentsPerYear);

    var pension = calcPension(grossYearlyIncome);

    var imposable = grossYearlyIncome - pension;

    var taxes =
      calcIRPEF(imposable) + (imposable * (regionalTax + comunalTax)) / 100;

    var netYearlyIncome = imposable - taxes;

    var deduction = calcDeductions(grossYearlyIncome);

    var totalNetYearlyIncome = netYearlyIncome + deduction;

    var grossMonthlyIncome = grossYearlyIncome / months;
    var netMonthlyIncome = totalNetYearlyIncome / months;

    var netMargin = netYearlyIncome / grossYearlyIncome;

    // Results object assignment
    setResults({
      grossYearlyIncome: grossYearlyIncome,
      pension: pension,
      taxes: taxes,
      netYearlyIncome: netYearlyIncome,
      grossMonthlyIncome: grossMonthlyIncome,
      netMonthlyIncome: netMonthlyIncome,
      deduction: deduction,
      totalNetYearlyIncome: totalNetYearlyIncome,
      netMargin: netMargin,
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
      <h3>Calcolo stipendio netto</h3>
      <p>
        Qui puoi calcolare il tuo stipendio netto inserendo alcuni dati relativi
        al tuo stipendio lordo.
      </p>
      <div>
        <form>
          <Input
            name="grossYearlyIncome"
            label="RAL (Reddito Annuo Lordo"
            value={data.grossYearlyIncome || ""}
            placeholder="es. 15000"
            function={handleChange}
            postLabel="€"
            type="number"
          />
          <Input
            name="regionalTax"
            label="Imposta Regionale"
            value={data.regionalTax || ""}
            placeholder="es. 1"
            function={handleChange}
            postLabel="%"
            type="number"
          />
          <Input
            name="comunalTax"
            label="Imposta Comunale"
            value={data.comunalTax || ""}
            placeholder="es. 1"
            function={handleChange}
            postLabel="%"
            type="number"
          />
          {/* <select
            id="region"
            name="region"
            value={data.region}
            onChange={handleChange}
          >
            <option value="Aosta">Valle d'Aosta</option>
            <option value="Piemonte">Piemonte</option>
            <option value="EmiliaRomagna">Emilia-Romagna</option>
            <option value="Basilicata">Basilicata</option>
          </select> */}
          <label name="payments" htmlFor="payments">
            <p className="pre-label">Mensilità</p>
            <select
              id="payments"
              name="paymentsPerYear"
              value={data.paymentsPerYear}
              onChange={handleChange}
            >
              <option value={12}>12</option>
              <option value={13}>13</option>
              <option value={14}>14</option>
            </select>
          </label>

          <button onClick={calculate}>Calcola</button>
          <button onClick={reset}>Cancella</button>
        </form>

        <br />
        {showResults && (
          <>
            <div className="NetSalaryChart"></div>
            <div className="summary-table">
              <div className="head">
                <div>RAL</div>
                <div>Netto Annuo + Detrazioni</div>
                <div>Netto Mensile</div>
                <div>Contributi INPS</div>
                <div>IRPEF e Addizionali</div>
                <div>Detrazioni Lavoro Dipendente</div>
              </div>
              <div className="body">
                <div>{results.grossYearlyIncome} €</div>
                <div>{results.totalNetYearlyIncome.toFixed(2)} €</div>
                <div>{results.netMonthlyIncome.toFixed(2)} €</div>
                <div>{results.pension.toFixed(2)} €</div>
                <div>{results.taxes.toFixed(2)} €</div>
                <div>{results.deduction.toFixed(2)} €</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default NetSalary;
