import React, { useEffect, useState } from "react";

export default function Switch(props) {
  const YES = {
    left: "0",
  };
  const NO = {
    right: "0",
  };

  const [toggle, setToggle] = useState(props.status);

  const handleToggle = (event) => {
    let role = event.target.getAttribute("role");
    if (role === "Yes") {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };

  useEffect(() => {
    props.onChange && props.onChange(toggle);
  }, [toggle]);

  return (
    <div className="switch">
      <button
        className={`switch__button${toggle ? " active" : ""}`}
        role="Yes"
        onClick={handleToggle}
      >
        Yes
      </button>
      <button
        className={`switch__button${!toggle ? " active" : ""}`}
        role="No"
        onClick={handleToggle}
      >
        No
      </button>
      <div className="switch__button--bg" style={toggle ? YES : NO}></div>
    </div>
  );
}
