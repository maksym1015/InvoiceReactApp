import React from "react";

const TextField = (props) => {
  return (
    <>
      <div
        className={`text-field ${props.textFieldClassName}`}
        variant={props.variant}
      >
        {props.label && (
          <label className={`${props.labelClassName}`} htmlFor={props.id}>
            {props.label}
          </label>
        )}
        <input
          style={{ padding: `${props.padding}` }}
          className={`${props.inputTagClassName}`}
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          autoComplete={props.autoComplete}
          disabled={props.disabled}
        />
      </div>
    </>
  );
};

TextField.defaultProps = {
  textFieldClassName: "",
  labelClassName: "",
  inputTagClassName: "",
  padding: "",
  type: "text",
};

export default TextField;
