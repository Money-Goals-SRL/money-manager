import React, { useState } from "react";
import type { ConversionLengthData } from "../../../types/types";
import Input from "../../Components/Input";
import sanitizeInput from "../../../Utilities/sanitizeInput";

export default function ConversionLength(): JSX.Element {
	// var [showResults, setShowResults] = useState(false);
	var [data, setData] = useState({
		unitFrom: "km",
		valueFrom: "",
		unitTo: "m",
		valueTo: "",
	} as ConversionLengthData);
	// var [results, setResults] = useState({} as ConversionLengthResult);
	type MeasureUnit = {
		symbol: string;
		factor: number;
		name: string;
		base?: boolean;
	};

	const lengthUnit: MeasureUnit[] = [
		{ name: "nanometers", symbol: "nm", factor: 1000000000 },
		{ name: "micrometers", symbol: "um", factor: 1000000 },
		{ name: "millimeters", symbol: "mm", factor: 1000 },
		{ name: "centimeters", symbol: "cm", factor: 100 },
		{ name: "decimeters", symbol: "dm", factor: 10 },
		{ name: "meters", symbol: "m", factor: 1, base: true },
		{ name: "decameters", symbol: "dam", factor: 0.1 },
		{ name: "ettometers", symbol: "hm", factor: 0.01 },
		{ name: "kilometers", symbol: "km", factor: 0.001 },

		{ name: "inches", symbol: "in", factor: 39.3701 },
		{ name: "feets", symbol: "ft", factor: 3.28084 },
		{ name: "yards", symbol: "yd", factor: 1.09361 },
		{ name: "miles", symbol: "mi", factor: 0.000621371 },
	];

	function convert(value: number, unitFrom: string, unitTo: string): number {
		const fromObj = lengthUnit.find((item) => item.symbol === unitFrom);
		const toObj = lengthUnit.find((item) => item.symbol === unitTo);

		if (!fromObj || !toObj) {
			throw new Error(`Conversion not supported between ${unitFrom} and ${unitTo}`);
		}

		return (value * toObj.factor) / fromObj.factor;
	}

	function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
		event.target.value = sanitizeInput(event.target.value);
		var convertedValue = 0;

		try {
			switch (event.target.name) {
				case "valueFrom":
					convertedValue = convert(
						Number(event.target.value),
						data.unitFrom,
						data.unitTo
					);
					break;
				case "unitFrom":
					convertedValue = convert(
						Number(data.valueFrom),
						event.target.value,
						data.unitTo
					);
					break;
				case "unitTo":
					convertedValue = convert(
						Number(data.valueFrom),
						data.unitFrom,
						event.target.value
					);
					break;
				default:
					break;
			}

			setData({
				...data,
				[event.target.name]: event.target.value,
				valueTo: convertedValue.toString(),
			});
		} catch (e) {
			console.log(e);
			setData({ ...data, [event.target.name]: event.target.value });
		}
	}

	return (
		<div>
			<label htmlFor="unitFrom">
				<div className="pre-label">unitFrom</div>
				<div className="input-container">
					<select value={data.unitFrom} name="unitFrom" onChange={handleChange}>
						{lengthUnit.map((u) => (
							<option value={u.symbol} key={"unit-from-" + u.symbol}>
								{u.name}
							</option>
						))}
					</select>
				</div>
			</label>
			<Input
				name="valueFrom"
				label="valueFrom"
				value={data.valueFrom}
				placeholder=""
				function={handleChange}
				type="number"
			/>
			<label htmlFor="unitTo">
				<div className="pre-label">unitTo</div>
				<div className="input-container">
					<select value={data.unitTo} name="unitTo" onChange={handleChange}>
						{lengthUnit.map((u) => (
							<option value={u.symbol} key={"unit-to-" + u.symbol}>
								{u.name}
							</option>
						))}
					</select>
				</div>
			</label>
			<Input
				name="valueTo"
				label="valueTo"
				value={data.valueTo}
				placeholder=""
				function={handleChange}
				type="number"
				disabled={true}
			/>
		</div>
	);
}
