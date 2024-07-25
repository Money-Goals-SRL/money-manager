import React, { type ChangeEventHandler } from "react";

type inputProps = {
	name: string;
	label: string;
	value: string | number;
	placeholder: string;
	function: ChangeEventHandler;
	type: string;
	disabled?: boolean | undefined;
	step?: string | number | undefined;
	postLabel: string;
};
function Input(props: inputProps) {
	//   <Input
	//     name="capital"
	//     label=""
	//     value={}
	//     placeholder=""
	//     function={}
	//     type=""
	//     postLabel=""
	//   />

	return (
		<label htmlFor={props.name}>
			<p className="pre-label">{props.label}</p>
			<div className="input-container">
				<input
					value={props.value}
					name={props.name}
					placeholder={props.placeholder}
					onChange={props.function}
					type={props.type}
					disabled={props.disabled}
					step={props.step}
				/>

				<p className="post-label">{props.postLabel}</p>
			</div>
		</label>
	);
}

export default Input;
