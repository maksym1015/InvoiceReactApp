import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faTimes } from "@fortawesome/free-solid-svg-icons";

import { store } from "../../store";

export default function CompanyOwner() {
  const { state, dispatch } = useContext(store);
  const history = useHistory();

  const [isOnwer, setIsOnwer] = useState(true);

  const onSubmit = () => {
    dispatch({
      type: "SET_WELCOME_COMPANY",
      payload: { ...state.welcomeCompany, owner: isOnwer },
    });

    history.push("/company/details");
  };

  return (
    <div className="ob new-company company-owner">
      <div class="new-company__header mb-5 mb-xxl-0">
        <div
          class="new-company__icon--wrapper"
          onClick={() => history.goBack()}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        <div class="new-company__progress-bar--wrapper">
          <div class="new-company__progress-bar--path">
            <div
              class="new-company__progress-bar--progress"
              style={{ width: "75%" }}
            ></div>
          </div>
        </div>
        <div
          class="new-company__icon--wrapper"
          onClick={() => history.push("/company")}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
      <div className="d-flex flex-column flex-fill align-items-center justify-content-lg-center w-100 h-100">
        <div className="pf-inner w-100">
          <h2 className="pf-title">Are you an owner of Shans Pizza?</h2>

          <div className="pf-login d-flex flex-column align-items-center w-100">
            <div className="pf-volume w-100">
              <div className="d-flex justify-content-between align-items-center">
                <div
                  className={`pf-volume-box d-flex justify-content-center align-items-center ${
                    isOnwer ? "active" : ""
                  }`}
                  onClick={() => setIsOnwer(true)}
                >
                  Yes
                </div>
                <div
                  className={`pf-volume-box d-flex justify-content-center align-items-center ${
                    !isOnwer ? "active" : ""
                  }`}
                  onClick={() => setIsOnwer(false)}
                >
                  No
                </div>
              </div>
            </div>

            <button
              className="btn btn-custom w-50 py-4 mt-5"
              onClick={onSubmit}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
