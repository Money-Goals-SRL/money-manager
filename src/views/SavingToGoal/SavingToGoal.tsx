import React, { useState } from "react";
import sanitizeInput from "../../Utilities/sanitizeInput";
import { Frequency } from "../../types/types";

type SavingToGoalData = {
	start: number;
	saving: number;
	frequency: number;
	target: number;
	currentAge: number;
};

type SavingToGoalResult = {
	start: number;
	saving: number;
	frequency: number;
	target: number;
	finalAge: number;
	months: number;
	years: number;
};

function SavingToGoal(): React.JSX.Element {
	var [data, setData] = useState({
		start: 0,
		saving: 0,
		frequency: Frequency.Monthly,
		target: 0,
		currentAge: 0,
	} as SavingToGoalData);

	var [result, setResult] = useState({} as SavingToGoalResult);

	var [msg, setMsg] = useState("");

	function calcTime(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		if (data.saving <= 0) {
			setMsg("Non hai inserito un risparmio mensile valido!");
		} else {
			setMsg("");
			var years = Math.floor((data.target - data.start) / (data.saving * data.frequency));

			var months = Math.ceil(
				(data.target - data.start - years * 12 * data.saving) / data.saving
			);

			if (years < 0) {
				years = 0;
				months = 0;
			}

			if (months === 12) {
				years++;
				months = 0;
			}

			var finalAge = data.currentAge + years + (months !== 0 ? 1 : 0);

			const newResult: SavingToGoalResult = {
				start: data.start,
				saving: data.saving,
				frequency: data.frequency,
				target: data.target,
				years,
				months,
				finalAge,
			};

			setResult(newResult);
		}
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const numToCheck = Number(sanitizeInput(event.target.value));
		const num = isNaN(numToCheck) ? 0 : numToCheck;

		setData({ ...data, [event.target.name]: num });
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
						<label htmlFor="start">Inserisci il tuo capitale iniziale (€)</label>
						<input
							value={data.start}
							name="start"
							placeholder="es. 100"
							onChange={handleChange}></input>
					</div>
					<div className="label-div">
						<label htmlFor="saving">Inserisci il tuo risparmio mensile (€)</label>
						<input
							value={data.saving}
							name="saving"
							placeholder="es. 100"
							onChange={handleChange}></input>
					</div>
					<div className="label-div">
						<label htmlFor="target">Inserisci il tuo target da raggiungere (€)</label>
						<input
							value={data.target}
							name="target"
							placeholder="es. 1000"
							onChange={handleChange}></input>
					</div>
					<div className="label-div">
						<label htmlFor="currentAge">Inserisci la tua età (Anni)</label>
						<input
							value={data.currentAge}
							name="currentAge"
							placeholder="es. 25"
							onChange={handleChange}></input>
					</div>
					<button onClick={calcTime}>Calcola</button>
				</form>
				<br />
				{result.saving && (
					<div>
						Partendo da un capitale di {result.start} €, con un risparmio di{" "}
						{result.saving.toFixed(2)} € al mese, per raggiungere la somma di{" "}
						{result.target.toFixed(2)} €, ci impiegherai{" "}
						{result.years === 0 && result.months === 0
							? "meno di un mese"
							: result.years === 0
							? ""
							: result.years === 1
							? result.years + " anno"
							: result.years + " anni"}
						{result.months === 0
							? ""
							: result.years === 0
							? result.months + " mesi"
							: " e " + result.months + " mesi"}
						{", "}e avrai {result.finalAge} anni.
					</div>
				)}{" "}
				{msg && <div className="error-message">{msg}</div>}
			</div>
		</div>
	);
}

export default SavingToGoal;
