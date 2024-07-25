import React, { useState } from "react";
import sanitizeInput from "../../Utilities/sanitizeInput";
import Input from "../Components/Input";
// import NetSalaryResults from "./NetSalaryResults";
import type { SalaryData, SalaryResults } from "../../types/types";
import regionData, { irpefEchelons, type Echelon } from "./data";

function NetSalary() {
	var [showResults, setShowResults] = useState(false);
	var [data, setData] = useState({ paymentsPerYear: 12 } as SalaryData);
	var [results, setResults] = useState({} as SalaryResults);
	var [msg, setMsg] = useState("");

	// var [msg, setMsg] = useState("");

	function reset(event: React.MouseEvent<HTMLButtonElement>) {
		// Removes the result tables from the screen
		event.preventDefault();
		setShowResults(false);
	}

	const resultTableData = [
		{ text: "Salario Lordo Annuo", value: results.grossYearlyIncome?.toFixed(2), symbol: "€" },
		{ text: "Costo Previdenziale", value: results.pensionCost?.toFixed(2), symbol: "€" },
		{ text: "Imponibile", value: results.taxableIncome?.toFixed(2), symbol: "€" },
		{ text: "IRPEF", value: results.irpefTax?.toFixed(2), symbol: "€" },
		{ text: "Addizionale Regionale", value: results.regionalTax?.toFixed(2), symbol: "€" },
		{ text: "Addizionale Comunale", value: results.comunalTax?.toFixed(2), symbol: "€" },
		{ text: "Imposta Totale Lorda", value: results.totalGrossTax?.toFixed(2), symbol: "€" },
		{ text: "Detrazioni", value: results.deductions?.toFixed(2), symbol: "€" },
		{ text: "Imposta Totale Netta", value: results.totalNetTax?.toFixed(2), symbol: "€" },
		{ text: "Salario Netto Annuo", value: results.netYearlyIncome?.toFixed(2), symbol: "€" },
		{ text: "Mensilità", value: results.months?.toFixed(0), symbol: "" },
		{
			text: "Salario Lordo Mensile",
			value: results.grossMonthlyIncome?.toFixed(2),
			symbol: "€",
		},
		{ text: "Salario Netto Mensile", value: results.netMonthlyIncome?.toFixed(2), symbol: "€" },
		{ text: "Margine di Profitto", value: results.netMargin?.toFixed(2) || 0.0, symbol: "%" },
		{ text: "Carico Fiscale", value: results.costRate?.toFixed(2) || 0.0, symbol: "%" },
	];

	function calcEchelonValue(gross: number, echelons: Echelon[]): number {
		var net = 0;

		echelons.forEach((element) => {
			if (gross > element.minVal && gross <= element.maxVal) {
				net += ((gross - element.minVal) * element.percentage) / 100;
			} else if (gross > element.maxVal) {
				net += ((element.maxVal - element.minVal) * element.percentage) / 100;
			}
		});

		return net;
	}

	function calcDeductions(gross: number): number {
		if (gross < 0) return 0;
		else if (gross <= 15000) return 1955;
		else if (gross <= 28000) return 1910 + (1190 * (28000 - gross)) / 13000;
		else if (gross <= 50000) return 1910 * ((50000 - gross) / 22000);
		else return 0;
	}

	function calcPension(gross: number): number {
		return gross * 0.0919;
	}

	function findRegionalEchelons(code: string): Echelon[] {
		const foundRegion = regionData.find((el) => el.code === code);
		console.log(code, foundRegion);
		if (!foundRegion) return [];
		return foundRegion.echelons;
	}

	function calculate(event: React.MouseEvent<HTMLButtonElement>) {
		// Return the results object with data to be shown on the page
		event.preventDefault();

		if (!data.region) {
			setMsg("Select a region");
			return;
		}

		setMsg("");

		setShowResults(true);

		// Input validation and data type control
		const grossYearlyIncome = data.grossYearlyIncome || 0;
		const months = data.paymentsPerYear;
		const pensionCost = calcPension(grossYearlyIncome);
		const taxableIncome = grossYearlyIncome - pensionCost;
		const regionalEchelons = findRegionalEchelons(data.region);
		console.log(regionalEchelons);
		const irpefTax = calcEchelonValue(taxableIncome, irpefEchelons);
		const regionalTax = calcEchelonValue(taxableIncome, regionalEchelons);
		const comunalTax = (taxableIncome * data.comunalTaxRate) / 100;
		const totalGrossTax = irpefTax + regionalTax + comunalTax;
		const deductions = calcDeductions(grossYearlyIncome);
		const totalNetTax = Math.max(0, totalGrossTax - deductions);
		const netYearlyIncome = taxableIncome - totalNetTax;
		const grossMonthlyIncome = grossYearlyIncome / months;
		const netMonthlyIncome = netYearlyIncome / months;
		const netMargin = isNaN(netYearlyIncome / grossYearlyIncome)
			? 0
			: (netYearlyIncome / grossYearlyIncome) * 100;
		const costRate = 100 - netMargin;

		// Results object assignment

		const result: SalaryResults = {
			grossYearlyIncome,
			pensionCost,
			taxableIncome,
			irpefTax,
			regionalTax,
			comunalTax,
			totalGrossTax,
			deductions,
			totalNetTax,
			netYearlyIncome,
			months,
			grossMonthlyIncome,
			netMonthlyIncome,
			netMargin,
			costRate,
		};

		setResults(result);

		return;
	}

	function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
		event.target.value = sanitizeInput(event.target.value);
		console.log(event.target.name);
		var value: number | string;
		if (event.target.name !== "region") {
			if (Number(event.target.value) < 0) event.target.value = "0";
			value = Number(event.target.value);
		} else {
			value = event.target.value;
		}

		setData({
			...data,
			[event.target.name]: value,
		});
	}

	return (
		<div>
			<h3>Calcolo stipendio netto</h3>
			<p>
				Qui puoi calcolare il tuo stipendio netto inserendo alcuni dati relativi al tuo
				stipendio lordo.
			</p>
			<div>
				<form>
					<Input
						name="grossYearlyIncome"
						label="RAL (Reddito Annuo Lordo)"
						value={data.grossYearlyIncome || ""}
						placeholder="es. 15000"
						function={handleChange}
						postLabel="€"
						type="number"
					/>
					<label htmlFor={"region"}>
						<div className="pre-label">Imposta Regionale</div>
						<div className="input-container">
							<select
								value={data.region}
								defaultValue=""
								name="region"
								onChange={handleChange}>
								<option value="">-</option>
								{regionData.map((reg) => (
									<option value={reg.code} key={"region-" + reg.code}>
										{reg.region}
									</option>
								))}
							</select>{" "}
							<div className="post-label">%</div>
						</div>
					</label>
					<Input
						name="comunalTaxRate"
						label="Imposta Comunale"
						value={data.comunalTaxRate || ""}
						placeholder="es. 1"
						function={handleChange}
						postLabel="%"
						type="number"
					/>
					<label htmlFor="paymentsPerYear">
						<p className="pre-label">Mensilità</p>
						<select
							id="payments"
							name="paymentsPerYear"
							value={data.paymentsPerYear}
							onChange={handleChange}>
							<option value={12} selected>
								12
							</option>
							<option value={13}>13</option>
							<option value={14}>14</option>
						</select>
					</label>

					<button onClick={calculate}>Calcola</button>
					<button onClick={reset}>Cancella</button>
				</form>
				{msg && <div>{msg}</div>}
				<br />
				{showResults && (
					<>
						<div className="net-salary-chart"></div>
						<div className="net-salary-table">
							{resultTableData.map((row) => (
								<div className="pair">
									<div className="head">{row.text}</div>
									<div className="body">
										{row.value} {row.symbol}
									</div>
								</div>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default NetSalary;
