import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Header({title}) {
  const history = useHistory();

  return (
    <div className="header desktop-none">
      <button
        onClick={() => history.goBack()}
        className="position-absolute btn-custom-link p-0"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <div className="text-center">{title}</div>
    </div>
  );
}
