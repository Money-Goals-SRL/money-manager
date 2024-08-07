import React from "react";
import sanitizeInput from "../../Utilities/sanitizeInput";
import Input from "../Components/Input";
import type { CashFlow } from "../../types/types";

function InternalRateReturn() {
	var [cashflows, setCashflows] = React.useState([] as CashFlow[]);
	var [irrValue, setIrrValue] = React.useState(0);
	var [msg, _] = React.useState("");

	function addField(event: React.MouseEvent<HTMLElement>) {
		event.preventDefault();
		var newField: CashFlow = { date: new Date(), value: 0 };
		setCashflows([...cashflows, newField]);
	}

	function irrCalculation(cashflows: CashFlow[]) {
		console.log(cashflows);
		const dates = cashflows.map((cf) => new Date(cf.date));
		const values = cashflows.map((cf) => cf.value);

		// Set an initial guess rate
		let guess = 0.1;

		// Define a maximum number of iterations to avoid infinite loops
		const maxIterations = 100;

		// Define a threshold for considering the IRR converged
		const epsilon = 0.00001;

		let iteration = 0;
		let npv = 0;
		let prevNpv;
		do {
			prevNpv = npv;
			npv = 0;
			for (let i = 0; i < cashflows.length; i++) {
				const years =
					(dates[i].getTime() - dates[0].getTime()) / (1000 * 60 * 60 * 24 * 365);
				npv += values[i] / Math.pow(1 + guess, years);
			}

			if (Math.abs(npv) < epsilon) {
				return guess;
			}

			guess = guess - npv / derivative(values, guess, dates);

			iteration++;
			console.log(guess);

			if (iteration > maxIterations) {
				throw new Error("IRR did not converge");
			}
		} while (Math.abs(npv - prevNpv) > epsilon);
		return guess;
	}

	function derivative(values: number[], guess: number, dates: Date[]) {
		const h = 0.00001;
		const f1 = npv(values, guess + h, dates);
		const f2 = npv(values, guess - h, dates);
		return (f1 - f2) / (2 * h);
	}

	function npv(values: number[], rate: number, dates: Date[]) {
		let result = 0;
		for (let i = 0; i < values.length; i++) {
			const years = (dates[i].getTime() - dates[0].getTime()) / (1000 * 60 * 60 * 24 * 365);
			result += values[i] / Math.pow(1 + rate, years);
		}
		return result;
	}

	function calcIRR(event: React.MouseEvent<HTMLElement>) {
		event.preventDefault();

		// Cashflow input validation to correct empty dates (set as of today)
		const cashflowsWithDates = cashflows.map((cf, i) => {
			if (!cf.date) {
				cashflows[i].date = new Date();
				console.log("sono qui");
				setCashflows(cashflows);
			}
			return {
				date: new Date(cf.date),
				value: cf.value,
			};
		});
		const irr = irrCalculation(cashflowsWithDates);
		setIrrValue(irr);
	}

	function handleChange(i: number, event: React.ChangeEvent<HTMLInputElement>) {
		try {
			const newCashflows = [...cashflows];

			if (event.target.name === "date" + i) {
				newCashflows[i].date = new Date(sanitizeInput(event.target.value));
			} else if (event.target.name === "value" + i) {
				newCashflows[i].value = Number(sanitizeInput(event.target.value));
			}
			setCashflows(newCashflows);
		} catch (e) {
			console.log("Error updating input change: ", e);
			return;
		}
	}

	return (
		<div>
			<h3>Tasso Interno di Rendimento</h3>
			<p>
				Qui puoi calcolare il tasso interno di rendimento (IRR) di una serie di flussi di
				cassa.
			</p>
			<div>
				<form>
					<p>Inserisci i flussi di cassa: </p>
					<div style={{ margin: "1em 0" }}>
						{cashflows.map((cf, i) => {
							return (
								<div className="irr-movement">
									<Input
										name={"date" + i}
										label="Data"
										value={cf.date.toString()}
										placeholder="yyyy-mm-gg"
										function={(event: React.ChangeEvent<HTMLInputElement>) =>
											handleChange(i, event)
										}
										type="date"
										postLabel=""
									/>
									<Input
										name={"value" + i}
										label="Importo"
										value={cf.value}
										placeholder="es. 1000"
										function={(event: React.ChangeEvent<HTMLInputElement>) =>
											handleChange(i, event)
										}
										type="number"
										postLabel="€"
									/>
								</div>
							);
						})}
						<button onClick={addField}>Aggiungi movimento</button>
					</div>
					<button onClick={calcIRR}>Calcola IRR</button>
				</form>
				<br />
				{irrValue || irrValue === 0 ? (
					<div>
						<p>
							Il tasso interno di rendimento è pari allo {(irrValue * 100).toFixed(2)}{" "}
							%.
						</p>
					</div>
				) : msg ? (
					<p className="error-message">{msg}</p>
				) : null}
			</div>
			<p style={{ color: "green", fontWeight: "bold" }}>
				ATTENZIONE: <br />
				Non inserire un valore iniziale positivo. Non avere movimenti per i quali la somma
				totale è negativa. In caso contrario, il sito si blocca.
			</p>
		</div>
	);
}

export default InternalRateReturn;
