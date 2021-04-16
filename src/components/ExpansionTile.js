import React, { useEffect, useState } from "react";
import HR from "./HR";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function ExpansionTile(props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="expansion-tile__container">
        {props.borderTop && <HR />}

        <div className="expansion-tile__line" onClick={() => setOpen(!open)}>
          <p className="textM__font-size m-0">{props.header}</p>
          <FontAwesomeIcon icon={open ? faMinus : faPlus} />
        </div>
        <div className={`expansion-tile__inner ${open ? "open" : ""}`}>
          <div className="expansion-tile__content">{props.children}</div>
        </div>

        {props.borderBottom && <HR />}
      </div>
    </>
  );
}
