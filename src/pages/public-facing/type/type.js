import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import {
  faBuilding,
  faCalculator,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { store } from "../../../store";

export default function PFType() {
  const history = useHistory();
  const { state, dispatch } = useContext(store);

  const onSelect = (type) => {
    dispatch({
      type: "SET_WELCOME_USER",
      payload: { ...state.welcomeUser, type },
    });

    history.push("/pf-location");
  };

  useEffect(() => {
    if (!state.welcomeUser.company) return history.goBack();
  }, []);

  return (
    <div className="pf">
      <Link to="#" className="pf-back-btn" onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Link>

      <div className="pf-inner flex-fill">
        <Link to="/" className="d-block text-center mb-5">
          <img src="/images/honeydu-logo.png" alt="Honeydu" width="80" />
        </Link>

        <h2 className="pf-title">What type of company are you with?</h2>

        <div className="pf-type container">
          <div
            className="pf-type-box d-flex"
            onClick={() => onSelect("business")}
          >
            <FontAwesomeIcon icon={faBuilding} />
            <span>Business</span>
          </div>
          <div
            className="pf-type-box d-flex"
            onClick={() => onSelect("accounting_firm")}
          >
            <FontAwesomeIcon icon={faCalculator} />
            <span>Accounting Firm</span>
          </div>
        </div>
      </div>
    </div>
  );
}
