import React, { useEffect, useState } from "react";

export default function Switch2(props) {
  const [toggle, setToggle] = useState(props.status);
  const YES = {
    right: "1px",
  };
  const NO = {
    left: "1px",
  };
  const background = {
    backgroundColor: toggle ? "rgb(0, 210, 143)" : "rgb(194, 194, 195)",
  };

  useEffect(() => {
    props.onChange && props.onChange(toggle);
  }, [toggle]);

  return (
    <div className="d-flex align-items-center justify-content-between">
      {toggle ? "Yes" : "No"}
      <div
        className="switch switch-round ml-4"
        onClick={() => setToggle(!toggle)}
        style={background}
      >
        <div className="switch__button--bg" style={toggle ? YES : NO}></div>
      </div>
    </div>
  );
}
