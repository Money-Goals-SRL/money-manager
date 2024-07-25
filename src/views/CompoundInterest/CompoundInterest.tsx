import React, { useState } from "react";
import sanitizeInput from "../../Utilities/sanitizeInput";
import Input from "../Components/Input";
import type { CompoundInterestData, CompoundInterestResult } from "../../types/types";

function CompoundInterest() {
	var [showResults, setShowResults] = useState(false);
	var [data, setData] = useState({
		capital: 0,
		rate: 0,
		frequency: "year",
		years: 0,
		months: 0,
		days: 0,
	} as CompoundInterestData);
	var [results, setResult] = useState({} as CompoundInterestResult);
	var [msg, _] = useState("");

	function calculate(event: React.MouseEvent<HTMLButtonElement>) {
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

		const result: CompoundInterestResult = {
			initial: data.capital,
			rate: data.rate,
			frequency: data.frequency,
			years: data.years,
			months: data.months,
			days: data.days,
			final: finalAmount,
			interest: interest,
		};

		console.log(result);
		setResult(result);
		return;
	}

	function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
		event.target.value = sanitizeInput(event.target.value);
		if (Number(event.target.value) < 0) event.target.value = "0";
		switch (event.target.name) {
			case "months":
				const valMonth: number =
					Number(event.target.value) > 11 ? 11 : Number(event.target.value);
				setData({ ...data, months: valMonth });
				break;
			case "days":
				const valDay: number =
					Number(event.target.value) > 30 ? 30 : Number(event.target.value);
				setData({ ...data, days: valDay });
				break;
			case "frequency":
				setData({ ...data, frequency: event.target.value });
				break;
			default:
				setData({ ...data, [event.target.name]: Number(event.target.value) });
				break;
		}
	}

	return (
		<div>
			<h3>Interesse Composto</h3>
			<p>
				Qui puoi calcolare quanti soldi avrai sfruttando l'interesse composto, a partire da
				un certo capitale iniziale, un tasso di interesse applicato con una certa frequenza
				e un determinato periodo di tempo.
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
						label="Tasso di Interesse"
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
								<option value="year" defaultValue="year">
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
						Dopo {results.years + (results.years === 1 ? " anno, " : " anni, ") || 0}
						{(results.frequency === "month" || results.frequency === "day") &&
							results.months + (results.months === 1 ? " mese, " : " mesi, ")}{" "}
						{results.frequency === "day" && results.days + " giorni, "}
						partendo da un capitale pari a {results.initial.toFixed(2) || 0} € e con un
						tasso di interesse annuo dello {results.rate.toFixed(2) || "0.00"} %, avrai
						un capitale finale pari a {results.final.toFixed(2) || 0} €, perchè avrai
						guadagnato {results.interest.toFixed(2) || 0} € lordi.
					</p>
				) : msg ? (
					<p className="error-message">{msg}</p>
				) : null}
			</div>
		</div>
	);
}

export default CompoundInterest;
