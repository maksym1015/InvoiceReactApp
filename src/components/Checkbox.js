import React, { useState, useEffect } from "react";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons";

export default function Checkbox(props) {
  const [value, setValue] = useState(true);

  useEffect(() => {
    props.onChange && props.onChange(value);
  }, [value]);

  return (
    <div
      className="d-flex align-items-center cursor-pointer"
      onClick={() => setValue(!value)}
    >
      <label className="checkbox-custom__checkbox-wrapper">
        <input type="checkbox" className="checkbox-custom__checkbox" />
        <FontAwesomeIcon icon={value ? faCheckSquare : faSquare} />
      </label>
      <label className={`checkbox-custom__label ${props.labelClassName}`}>
        {props.label}
      </label>
    </div>
  );
}
