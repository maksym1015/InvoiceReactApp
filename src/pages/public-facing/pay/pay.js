import React from "react";
import { Link, useHistory } from "react-router-dom";

import {
  faCalculator,
  faChevronLeft,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PFPay() {
  const history = useHistory();

  return (
    <div className="pf">
      <Link to="#" className="pf-back-btn" onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Link>

      <div className="pf-inner flex-fill">
        <Link to="/" className="d-block text-center mb-5">
          <img src="/images/honeydu-logo.png" alt="Honeydu" width="80" />
        </Link>

        <h2 className="pf-title">Choose how you'd like to pay</h2>

        <div className="pf-type container">
          <div className="pf-type-box d-flex">
            <FontAwesomeIcon icon={faUniversity} />
            <span>Bank</span>
            <small className="extra-small">No fees.</small>
          </div>
          <div className="pf-type-box d-flex">
            <FontAwesomeIcon icon={faCalculator} />
            <span>Credit Card</span>
            <small className="extra-small">2.97% fee per charge</small>
          </div>
        </div>
      </div>
    </div>
  );
}
