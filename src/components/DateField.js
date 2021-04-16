import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";

export default function DateField(props) {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    props.onChange && props.onChange(value);
  }, [value]);

  return (
    <div
      className={`date-field ${
        props.wrapperClassName && props.wrapperClassName
      }`}
      variant={props.variant}
    >
      {props.label && (
        <label htmlFor={props.id} className="m-0">
          {props.label}
        </label>
      )}
      <DatePicker
        calendarIcon={props.calendarIcon}
        clearIcon={props.clearIcon}
        style={{ padding: `${props.padding}` }}
        onChange={(val) => setValue(val)}
        value={value}
      />
    </div>
  );
}
