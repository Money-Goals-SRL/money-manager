import React, { useState } from "react";
import sanitizeInput from "../../Utilities/sanitizeInput";
// import Budget503020Results from "./Budget503020Results";
import Input from "../Components/Input";
import { Frequency } from "../../types/types";

enum Budget {
	INVEST = 0.5,
	EXPENSE = 0.3,
	FUN = 0.2,
}

type Budget503020Data = {
	saving: number;
	frequency: number;
};

type Budget503020Results = {
	saving: number;
	frequency: number;
	invest: number;
	expense: number;
	fun: number;
};

function Budget503020() {
	var [data, setData] = useState({
		saving: 0,
		frequency: Frequency.Monthly,
	} as Budget503020Data);

	var [result, setResult] = useState({} as Budget503020Results);

	var [msg, setMsg] = useState("");

	function calcBudget(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		if (data.saving < 0) {
			setMsg("Non hai inserito un risparmio mensile valido!");
		} else {
			setMsg("");

			const invest = data.saving * Budget.INVEST;
			const expense = data.saving * Budget.EXPENSE;
			const fun = data.saving * Budget.FUN;

			const result: Budget503020Results = {
				...data,
				invest,
				expense,
				fun,
			};

			setResult(result);
		}
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const numToCheck = Number(sanitizeInput(event.target.value));
		const saving = isNaN(numToCheck) ? 0 : numToCheck;

		setData({ ...data, saving });
	}

	return (
		<div>
			<h3>Budget 50-30-20</h3>
			<p>
				Qui puoi stabilire quale budget dedicare alle diverse tipologie di spesa in funzione
				del tuo risparmio mensile.
			</p>
			<div>
				<form>
					<Input
						name="saving"
						label="Risparmio mensile"
						placeholder="es. 1000"
						function={handleChange}
						postLabel="€"
						value={data.saving}
						type="string"
					/>
					<button onClick={calcBudget}>Calcola</button>
				</form>
				<br />
				{result.saving >= 0 && (
					<div>
						<div>
							Risparmio mensile: <strong>{result.saving.toFixed(2)}</strong> €
						</div>
						<div>
							Spese: <strong>{result.expense.toFixed(2)}</strong> €
						</div>
						<div>
							Investimenti: <strong>{result.invest.toFixed(2)}</strong> €
						</div>
						<div>
							Divertimento: <strong>{result.fun.toFixed(2)}</strong> €
						</div>
						{/* <Budget503020Results
						savings={savings}
						expenses={expenses}
						invest={invest}
						fun={fun}
					/> */}
					</div>
				)}{" "}
				{msg ? <p className="error-message">{msg}</p> : null}
				<br />
				<div>
					La regola di budget 50-30-20 prevede di utilizzare il 50% del proprio risparmio
					mensile per gli investimenti, il 30% per le tue spese necessarie e il restante
					20% per il tuo divertimento.
				</div>
			</div>
		</div>
	);
}

export default Budget503020;
