import React, { useState } from "react";
import sanitizeInput from "../../Utilities/sanitizeInput";

function SavingToGoal() {
	var [savingValue, setSavingValue] = useState(0);
	var [targetValue, setTargetValue] = useState(0);
	var [savings, setSavings] = useState(0);
	var [target, setTarget] = useState(0);
	var [months, setMonths] = useState(0);
	var [years, setYears] = useState(0);
	var [msg, setMsg] = useState("");

	function calcTime(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		if (savingValue <= 0 || targetValue <= 0) {
			setMsg("Non hai inserito un risparmio mensile e/o un target da raggiungere valido!");
		} else {
			setSavings(savingValue);
			setTarget(targetValue);
			setYears(Math.floor(targetValue / (savingValue * 12)));
			if (savingValue > targetValue) {
				setMonths(0);
			} else {
				setMonths(Math.ceil((targetValue % savingValue) * 12) / savingValue);
			}
		}
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const numToCheck = Number(sanitizeInput(event.target.value));
		const num = isNaN(numToCheck) ? 0 : numToCheck;

		if (event.target.name === "saving") {
			setSavingValue(num);
		} else if (event.target.name === "amount") {
			setTargetValue(num);
		}
	}

	return (
		<div>
			<h3>Risparmio per Raggiungere un Obiettivo</h3>
			<p>
				Qui puoi calcolare in quanto tempo raggiungerai una certa somma, a partire da quanto
				riesci a risparmiare ogni mese.
			</p>
			<div>
				<form>
					{" "}
					<div className="label-div">
						<label htmlFor="saving">Inserisci il tuo risparmio mensile: </label>
						<input
							value={savingValue}
							name="saving"
							placeholder="es. 100"
							onChange={handleChange}></input>{" "}
						€
					</div>
					<div className="label-div">
						<label htmlFor="amount">Inserisci il tuo target da raggiungere: </label>
						<input
							value={targetValue}
							name="amount"
							placeholder="es. 1000"
							onChange={handleChange}></input>{" "}
						€
					</div>
					<button onClick={calcTime}>Calcola</button>
				</form>
				<br />
				{savings && target ? (
					<div>
						<p>
							Con un risparmio di {savings.toFixed(2)} € al mese, per raggiungere la
							somma di {target.toFixed(2)} €, ci impiegherai{" "}
							{years === 0 && months === 0
								? "meno di un mese"
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
			<p style={{ color: "green", fontWeight: "bold" }}>
				NOTA: Aggiungere un calcolo dell'età finale, a partire dall'età attuale e da quanto
				capitale hai ora a disposizione.
			</p>
		</div>
	);
}

export default SavingToGoal;
