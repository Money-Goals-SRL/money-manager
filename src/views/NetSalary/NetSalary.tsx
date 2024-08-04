import React, { useState } from "react";
import sanitizeInput from "../../Utilities/sanitizeInput";
import Input from "../Components/Input";
// import NetSalaryResults from "./NetSalaryResults";
import type { SalaryData, SalaryResults } from "../../types/types";
import { Contract } from "../../types/types";

import regionData, {
	irpefEchelons,
	MIN_DETRACTION_DETERMINATO,
	MIN_DETRACTION_INDETERMINATO,
	PENSION_RATE_APPRENTICESHIP,
	PENSION_RATE_NORMAL,
	type Echelon,
} from "./data";

function NetSalary() {
	const defaultData = {
		grossYearlyIncome: 0,
		paymentsPerYear: 12,
		region: "06",
		comunalTaxRate: 0.8,
		dailyFoodRefund: 0,
		dailyTravelRefund: 0,
		workDaysPerYear: 365,
		smartWorking: 0,
		contract: Contract.Indeterminato,
		alwaysIncludeFood: false,
		alwaysIncludeTravel: false,
	} as SalaryData;

	var [showResults, setShowResults] = useState(false);
	var [timeFrame, setTimeFrame] = useState("month");
	var [results, setResults] = useState({} as SalaryResults);
	var [msg, setMsg] = useState("");
	var [data, setData] = useState(defaultData);

	function reset(event: React.MouseEvent<HTMLButtonElement>) {
		// Removes the result tables from the screen
		event.preventDefault();
		setShowResults(false);
		setData(defaultData);
	}

	type SalaryResultBox = {
		title: string;
		yearValue: string;
		monthValue?: string;
		symbol: string;
		id: string;
		description: string;
		important?: boolean;
	};

	const salaryData: SalaryResultBox[] = [
		{
			id: "salario-lordo",
			title: "Salario Lordo",
			yearValue: results.grossYearlyIncome?.toFixed(2),
			monthValue: results.grossMonthlyIncome?.toFixed(2),
			symbol: "€",
			description:
				"Differenza tra Salario lordo e costi previdenziali sostenuti nel periodo (principio di cassa).",
		},
		{
			id: "costo-previdenziale",
			title: "Costo Previdenziale",
			yearValue: results.pensionCost?.toFixed(2),
			monthValue: (results.pensionCost / results.months)?.toFixed(2),
			symbol: "€",
			description: "",
		},
		{
			id: "imponibile-fiscale",
			title: "Imponibile Fiscale",
			yearValue: results.taxableIncome?.toFixed(2),
			monthValue: (results.taxableIncome / results.months)?.toFixed(2),
			symbol: "€",
			description: "",
		},
		{
			id: "irpef",
			title: "IRPEF",
			yearValue: results.irpefTax?.toFixed(2),
			monthValue: (results.irpefTax / results.months)?.toFixed(2),
			symbol: "€",
			description:
				"Imposta si redditi delle persone fisiche, calcolata secondo i tre scaglioni vigenti (2024).",
		},
		{
			id: "addizionale-regionale",
			title: "Addizionale Regionale",
			yearValue: results.regionalTax?.toFixed(2),
			monthValue: (results.regionalTax / results.months)?.toFixed(2),
			symbol: "€",
			description:
				"Imposta calcolata sull'imponibile, con aliquote variabili a seconda della regione.",
		},
		{
			id: "addizionale-comunale",
			title: "Addizionale Comunale",
			yearValue: results.comunalTax?.toFixed(2),
			monthValue: (results.comunalTax / results.months)?.toFixed(2),
			symbol: "€",
			description:
				"Imposta calcolata sull'imponibile, con aliquote variabili a seconda del comune.",
		},
		{
			id: "imposta-totale-lorda",
			title: "Imposta Totale Lorda",
			yearValue: results.totalGrossTax?.toFixed(2),
			monthValue: (results.totalGrossTax / results.months)?.toFixed(2),
			symbol: "€",
			description: "Somma di IRPEF e addionali regionale e comunale",
		},
		{
			id: "detrazioni-lavoro-dipendente",
			title: "Detrazioni Lavoro Dipendente",
			yearValue: results.deductions?.toFixed(2),
			monthValue: (results.deductions / results.months)?.toFixed(2),
			symbol: "€",
			description:
				"Detrazioni di imposta spettanti ai lavoratori dipendenti, secondo gli scaglioni del 2024.",
		},
		{
			id: "imposta-totale-netta",
			title: "Imposta Totale Netta",
			yearValue: results.totalNetTax?.toFixed(2),
			monthValue: (results.totalNetTax / results.months)?.toFixed(2),
			symbol: "€",
			description:
				"Imposta totale netta pagata, sottraendo le detrazioni. L'imposta non può essere negativa.",
		},
		{
			id: "salario-netto",
			title: "Salario Netto",
			yearValue: results.netYearlyIncome?.toFixed(2),
			monthValue: (results.netYearlyIncome / results.months)?.toFixed(2),
			symbol: "€",
			description:
				"Reddito netto ottenuto come differenza tra imponibile fiscale e imposta netta pagata (o come salario lordo totale, meno contributi previdenziali, meno imposte pagate lorde, più detrazioni.",
		},
		{
			id: "buoni-pasto",
			title: "Buoni Pasto **",
			yearValue: results.foodRefunds?.toFixed(2),
			monthValue: (results.foodRefunds / results.months)?.toFixed(2),
			symbol: "€",
			description:
				"Valore totale ricevuto sottoforma di buono pasto, calcolato a partire dal valore giornaliero.",
		},
		{
			id: "rimborso-trasferta",
			title: "Rimborso Trasferta **",
			yearValue: results.travelRefunds?.toFixed(2),
			monthValue: (results.travelRefunds / results.months)?.toFixed(2),
			symbol: "€",
			description:
				"Rimborso totale ricevuto per le trasferte o per lavoro da cliente fuori dalla sede aziendale, calcolato a partire dal valore giornaliero.",
		},
		{
			id: "salario-netto-con-bonus",
			title: "Salario Netto con Bonus",
			yearValue: results.netYearlyIncomeIncludingBonuses?.toFixed(2),
			monthValue: (results.netYearlyIncomeIncludingBonuses / results.months)?.toFixed(2),
			symbol: "€",
			description:
				"Guadagno netto del lavoratore, ottenuto sommando al salario netto i buoni pasto e rimborsi per trasferte.",
		},
		{
			id: "mensilita",
			title: "Mensilità",
			yearValue: results.months?.toFixed(0),
			monthValue: results.months?.toFixed(0),
			symbol: "",
			description: "Numero di stipendi ricevuti per anno.",
		},
		{
			id: "margine-profitto",
			title: "Margine di Profitto",
			yearValue: results.netMargin?.toFixed(2) || "0.00",
			monthValue: results.netMargin?.toFixed(2) || "0.00",
			symbol: "%",
			description: "Percentuale di salario netto rispetto al salario lordo.",
		},
		{
			id: "carico-fiscale",
			title: "Carico Fiscale",
			yearValue: results.costRate?.toFixed(2) || "0.00",
			monthValue: results.costRate?.toFixed(2) || "0.00",
			symbol: "%",
			description: "Percentuale di carico fiscale e previdenziale rispetto al salario lordo.",
		},
		{
			id: "margine-profitto-rimborsi",
			title: "Margine di Profitto Con Rimborsi",
			yearValue: results.netMarginIncludingBonuses?.toFixed(2) || "0.00",
			monthValue: results.netMarginIncludingBonuses?.toFixed(2) || "0.00",
			symbol: "%",
			description: "Come il margine di profitto, ma include anche i rimborsi esentasse",
		},
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

	function calcPension(gross: number, type: Contract): number {
		if (type === Contract.Apprendistato) {
			return Math.max(0, (gross * PENSION_RATE_APPRENTICESHIP) / 100);
		}
		return Math.max(0, (gross * PENSION_RATE_NORMAL) / 100);
	}

	function findRegionalEchelons(code: string): Echelon[] {
		const foundRegion = regionData.find((el) => el.code === code);
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
		const pensionCost = calcPension(grossYearlyIncome, data.contract);
		const taxableIncome = grossYearlyIncome - pensionCost;
		const irpefTax = calcEchelonValue(taxableIncome, irpefEchelons);
		const regionalTax = calcEchelonValue(taxableIncome, findRegionalEchelons(data.region));
		const comunalTax = (taxableIncome * data.comunalTaxRate) / 100;
		const totalGrossTax = irpefTax + regionalTax + comunalTax;

		var deductions;
		if (data.contract === Contract.Determinato) {
			deductions = Math.max(MIN_DETRACTION_DETERMINATO, calcDeductions(grossYearlyIncome));
		} else {
			deductions = Math.max(MIN_DETRACTION_INDETERMINATO, calcDeductions(grossYearlyIncome));
		}

		const totalNetTax = Math.max(0, totalGrossTax - deductions);
		//const travelRefunds = data.dailyTravelRefund * data.workDaysPerYear * 1 - data.smartWorking / 100;
		//const foodRefunds = data.dailyFoodRefund * data.workDaysPerYear * 1 - data.smartWorking / 100;
		const travelRefunds =
			((((data.dailyTravelRefund * data.workDaysPerYear * 5) / 7) * 11) / 12) *
			(data.alwaysIncludeTravel ? 1 : 1 - data.smartWorking / 100);
		const foodRefunds =
			((((data.dailyFoodRefund * data.workDaysPerYear * 5) / 7) * 11) / 12) *
			(data.alwaysIncludeFood ? 1 : 1 - data.smartWorking / 100);
		const netYearlyIncome = taxableIncome - totalNetTax;
		const netYearlyIncomeIncludingBonuses = netYearlyIncome + travelRefunds + foodRefunds;
		const grossMonthlyIncome = grossYearlyIncome / months;
		const netMonthlyIncome = netYearlyIncome / months;
		const netMonthlyIncomeIncludingBonuses = netYearlyIncomeIncludingBonuses / months;
		const netMargin = isNaN(netYearlyIncome / grossYearlyIncome)
			? 0
			: (netYearlyIncome / grossYearlyIncome) * 100;
		const costRate = 100 - netMargin;
		const netMarginIncludingBonuses = isNaN(netYearlyIncomeIncludingBonuses / grossYearlyIncome)
			? 0
			: (netYearlyIncomeIncludingBonuses / grossYearlyIncome) * 100;
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
			foodRefunds,
			travelRefunds,
			netYearlyIncome,
			netYearlyIncomeIncludingBonuses,
			months,
			grossMonthlyIncome,
			netMonthlyIncome,
			netMonthlyIncomeIncludingBonuses,
			netMargin,
			costRate,
			netMarginIncludingBonuses,
		};

		setResults(result);

		return;
	}

	function handleChange(
		event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>
	) {
		event.target.value = sanitizeInput(event.target.value);
		var value: number | string | boolean = "";

		// Differentiate between sting and non-string inputs
		console.log(event.target.name, event.target.value);

		switch (event.target.name) {
			case "region":
			case "contract":
				value = event.target.value;
				break;
			case "alwaysIncludeFood":
				value = !data.alwaysIncludeFood;
				break;
			case "alwaysIncludeTravel":
				value = !data.alwaysIncludeTravel;
				break;
			default:
				if (event.target.value !== "") value = Number(event.target.value);
				else value = 0;
				break;
		}

		setData({
			...data,
			[event.target.name]: value,
		});
	}

	const contracts = Object.entries(Contract).map(([key, value]) => ({
		value,
		label: key,
	}));

	return (
		<div>
			<h3>Calcolo stipendio netto</h3>
			<p>
				Qui puoi calcolare il tuo stipendio netto inserendo alcuni dati relativi al tuo
				stipendio lordo.
			</p>
			<div className="net-salary-disclaimer">
				* I rimborsi giornalieri sono calcolati in modo approssimativo escludendo i weekend
				(prendendo solo 5 giorni su 7), 1 mese all'anno per ferie o festività (11 mesi su
				12) e lo smartworking (proporzione diretta).
			</div>
			<div className="net-salary-container">
				<div className="net-salary-input-container">
					<form>
						<Input
							name="grossYearlyIncome"
							label="RAL (Reddito Annuo Lordo) (€)"
							value={data.grossYearlyIncome.toString()}
							placeholder="es. 15000"
							function={handleChange}
							postLabel="€"
							type="number"
						/>
						<label htmlFor={"region"}>
							<div className="pre-label">Regione di Lavoro</div>
							<div className="input-container">
								<select defaultValue="06" name="region" onChange={handleChange}>
									{regionData.map((reg) => (
										<option value={reg.code} key={"region-" + reg.code}>
											{reg.region}
										</option>
									))}
								</select>
							</div>
						</label>
						<Input
							name="comunalTaxRate"
							label="Imposta Comunale (%)"
							value={data.comunalTaxRate.toString()}
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
								defaultValue={12}
								onChange={handleChange}>
								<option value={12}>12</option>
								<option value={13}>13</option>
								<option value={14}>14</option>
							</select>
						</label>
						<label htmlFor="contract">
							<p className="pre-label">Tipo di Contratto</p>
							<select
								id="contract"
								name="contract"
								defaultValue={Contract.Indeterminato}
								onChange={handleChange}>
								{contracts.map((c) => (
									<option key={c.value} value={c.value}>
										{c.label}
									</option>
								))}
							</select>
						</label>
						<label htmlFor={"dailyFoodRefund"}>
							<div className="pre-label">Buono Pasto Giornaliero (€) *</div>
							<div className="input-container">
								<input
									value={data.dailyFoodRefund.toString()}
									name="dailyFoodRefund"
									placeholder="es. 1"
									onChange={handleChange}
									type="number"
								/>
							</div>
						</label>
						<label htmlFor={"alwaysIncludeFood"} style={{ display: "flex" }}>
							<div className="pre-label" style={{ fontSize: "12px", width: "250px" }}>
								Buono Pasto anche in Smart?
							</div>
							<input
								checked={data.alwaysIncludeFood}
								name="alwaysIncludeFood"
								onChange={handleChange}
								type="checkbox"
								style={{ width: "25px", margin: "auto 0" }}
							/>
						</label>
						<label htmlFor={"dailyTravelRefund"}>
							<div className="pre-label">Rimborso Trasferta Giornaliero (€) *</div>
							<div className="input-container">
								<input
									value={data.dailyTravelRefund.toString()}
									name="dailyTravelRefund"
									placeholder="es. 1"
									onChange={handleChange}
									type="number"
								/>
							</div>
						</label>
						<label htmlFor={"alwaysIncludeTravel"} style={{ display: "flex" }}>
							<div className="pre-label" style={{ fontSize: "12px", width: "250px" }}>
								Rimborso Viaggio anche in Smart?
							</div>
							<input
								checked={data.alwaysIncludeTravel}
								name="alwaysIncludeTravel"
								onChange={handleChange}
								type="checkbox"
								style={{ width: "25px", margin: "auto 0" }}
							/>
						</label>
						<label htmlFor="smartWorking">
							<div className="pre-label">Smart Working: {data.smartWorking} % *</div>
							<input
								type="range"
								id="smart-working"
								name="smartWorking"
								min="0"
								max="100"
								value={data.smartWorking}
								step="20"
								onChange={handleChange}
								style={{ padding: "0" }}
							/>{" "}
						</label>
						{/* <Input
							name="workDaysPerYear"
							label="Giorni Lavorati (incluso weekend)"
							value={data.workDaysPerYear.toString()}
							placeholder="es. 1"
							function={handleChange}
							postLabel="giorni"
							type="number"
						/> */}

						<button onClick={calculate}>Calcola</button>
						<button onClick={reset} style={{ backgroundColor: "red" }}>
							Cancella
						</button>
					</form>
					{msg && <div>{msg}</div>}
				</div>
				<br />

				{showResults && (
					<div className="net-salary-table">
						<div className="pair">
							<div className="table-head">Frequenza</div>
							<div className="table-head net-salary-table-radio">
								<div className="net-salary-table-radio">
									<input
										type="radio"
										name="month"
										value="month"
										checked={timeFrame === "month"}
										onChange={(e) => setTimeFrame(e.target.value)}
									/>
									<label htmlFor="month">Mensile</label>
								</div>

								<div className="net-salary-table-radio">
									<input
										type="radio"
										name="year"
										value="year"
										checked={timeFrame === "year"}
										onChange={(e) => setTimeFrame(e.target.value)}
									/>
									<label htmlFor="year">Annuale</label>
								</div>
							</div>
						</div>
						{salaryData.map((row) => (
							<div className="pair">
								<a className="head" href={"#" + row.id}>
									{row.title}
								</a>
								{timeFrame === "year" && (
									<div className="body">
										{row.yearValue} {row.symbol}
									</div>
								)}
								{timeFrame === "month" && (
									<div className="body">
										{row.monthValue} {row.symbol}
									</div>
								)}
							</div>
						))}
					</div>
				)}

				<div className="net-salary-details">
					{salaryData.map((entry) => (
						<div id={entry.id} className="net-salary-details-item">
							<div className="net-salary-details-title">{entry.title}</div>
							<div className="net-salary-details-text">{entry.description}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default NetSalary;
