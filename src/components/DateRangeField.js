import React, { useEffect, useState } from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

export default function DateRangeField(props) {
  const [value, onChange] = useState([new Date(), new Date()]);

  useEffect(() => {
    props.onChange && props.onChange(value);
  }, [value]);

  return (
    <div
      className={`date-range-field ${
        props.wrapperClassName && props.wrapperClassName
      }`}
      variant={props.variant}
    >
      {props.label && (
        <label htmlFor={props.id} className="m-0">
          {props.label}
        </label>
      )}
      <DateRangePicker
        calendarIcon={props.calendarIcon}
        clearIcon={props.clearIcon}
        style={{ padding: `${props.padding}` }}
        onChange={(val) => onChange(val)}
        value={value}
      />
    </div>
  );
}
