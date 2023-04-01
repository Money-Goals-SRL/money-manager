import React from "react";

function Input(props) {
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
        ></input>
        <p className="post-label">{props.postLabel}</p>
      </div>
    </label>
  );
}

export default Input;