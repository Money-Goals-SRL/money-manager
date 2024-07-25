import React, { useState } from "react";
import sanitizeInput from "../../Utilities/sanitizeInput";
// import Budget503020Results from "./Budget503020Results";
import Input from "../Components/Input";

function Budget503020() {
	var [value, setValue] = useState(0);
	var [savings, setSavings] = useState(0);
	var [expenses, setExpenses] = useState(0);
	var [invest, setInvest] = useState(0);
	var [fun, setFun] = useState(0);
	var [msg, setMsg] = useState("");

	function calcBudget(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		if (value <= 0) {
			setMsg("Non hai inserito un risparmio mensile valido!");
		} else {
			setSavings(value);
			setExpenses(value * 0.5);
			setInvest(value * 0.3);
			setFun(value * 0.2);
		}
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const numToCheck = Number(sanitizeInput(event.target.value));
		const num = isNaN(numToCheck) ? 0 : numToCheck;

		setValue(num);
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
						value={value}
						type="string"
					/>
					<button onClick={calcBudget}>Calcola</button>
				</form>
				<br />
				{expenses && invest && fun ? (
					<div>
						<div>
							Risparmio mensile: <strong>{savings.toFixed(2)}</strong> €
						</div>
						<div>
							Spese: <strong>{expenses.toFixed(2)}</strong> €
						</div>
						<div>
							Investimenti: <strong>{invest.toFixed(2)}</strong> €
						</div>
						<div>
							Divertimento: <strong>{fun.toFixed(2)}</strong> €
						</div>
						{/* <Budget503020Results
						savings={savings}
						expenses={expenses}
						invest={invest}
						fun={fun}
					/> */}
					</div>
				) : msg ? (
					<p className="error-message">{msg}</p>
				) : null}
			</div>
		</div>
	);
}

export default Budget503020;
