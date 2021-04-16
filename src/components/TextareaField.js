import React from "react";

export default function TextareaField(props) {
  return (
    <>
      <div className="textarea-field" variant={props.variant}>
        {props.label && <label for={props.id}>{props.label}</label>}
        <textarea
          placeholder={props.placeholder}
          autoComplete={props.autoComplete}
          rows={props.rows}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
          style={{ padding: `${props.padding}` }}
        />
      </div>
    </>
  );
}
