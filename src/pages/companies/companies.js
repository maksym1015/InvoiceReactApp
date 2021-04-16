import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { store } from "../../store";
import { notify } from "../../utils/helpers";

import Header from "../../components/Header";
import Aside from "../../components/Aside";
import CompanyAvatar from "../../components/CompanyAvatar";

export default function Companies() {
  const { state, dispatch } = useContext(store);

  const onCompanyChange = (company) => {
    if (company.id === state.company.id) return;

    dispatch({ type: "SET_COMPANY", payload: company });

    notify("Company has been switched");
  };

  useEffect(() => {
    localStorage.setItem("honeydu_company", state.company.id);
  }, [state.company]);

  return (
    <div className="home updated-settings companies robinhood">
      <div className="d-flex desktop-nav-p">
        <Aside />

        <div className="content-area__updated-version">
          <div className="custom-background w-100">
            <Header title="Companies" />

            <div className="grid--first-child d-flex flex-column">
              <div className="filter-box d-none d-md-flex justify-content-between">
                <div className="page-title displayL__font-size font-weight-bold">
                  Companies
                </div>
                <div className="d-inline-block">
                  <Link
                    to="company/new"
                    className="btn btn-custom d-flex align-items-center justify-content-around px-5 py-2"
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-3" />
                    New company
                  </Link>
                </div>
              </div>

              {state.user.companies.length < 2 && (
                <div className="container-fluid mt-5 mt-md-0 pt-5 pt-md-0">
                  <div className="row">
                    <div className="col-12 hints-card">
                      <div>
                        <h2 className="textLBold__font-size">
                          Meet your companies dashboard!
                        </h2>
                        <p className="textM__font-size">
                          You can now manage multiple companies’ payments from
                          one place! Easily set up new companies in Honeydu and
                          take advantage of free bank transfers or paper check
                          deliveries for all of them. <br />
                          <br /> Let’s go! Add your first company to get
                          started.
                        </p>
                      </div>
                      <div className="d-none d-lg-block">
                        <img
                          src="https://production-webcdn.meliopayments.com/static/media/companies-illustration.7f657cb6.svg"
                          className="ZeroStateMessage__Image-wme65l-5 iqXrCo"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="container-fluid">
                <div className="row">
                  <ul className="d-flex flex-wrap w-100 settings-menu updated-settings-menu manage-li-padding">
                    {state.user.companies.map((company) => (
                      <li className="col-12 col-lg-6">
                        <div
                          key={company.id}
                          className="settings-menu-item d-block"
                          onClick={() => onCompanyChange(company)}
                        >
                          {/* <Link to="#" className="settings-menu-item d-block"> */}
                          <div className="d-flex align-items-center mb-4">
                            <CompanyAvatar
                              company={company}
                              className="m-0 mr-4"
                            />
                            <h4 className="textMBold__font-size">
                              {company.name}
                            </h4>
                          </div>
                          <div className="status d-flex justify-content-between align-items-center w-100 mt-2">
                            <div className="d-flex flex-column flex-fill w-0 white-space-nowrap">
                              <h4 className="textS__font-size">Inbox</h4>
                              <p className="textS__font-size text-overflow-ellipsis overflow-hidden m-0">
                                0
                              </p>
                            </div>
                            <div className="d-flex flex-column flex-fill w-0 white-space-nowrap pl-4">
                              <h4 className="textS__font-size">Pending</h4>
                              <p className="textS__font-size text-overflow-ellipsis overflow-hidden m-0">
                                0
                              </p>
                            </div>
                            <div className="d-flex flex-column flex-fill w-0 white-space-nowrap pl-4">
                              <h4 className="textS__font-size">Scheduled</h4>
                              <p className="textS__font-size text-overflow-ellipsis overflow-hidden m-0">
                                0
                              </p>
                            </div>
                            <div className="d-flex flex-column flex-fill w-0 white-space-nowrap pl-4">
                              <h4 className="textS__font-size">Failed</h4>
                              <p className="textS__font-size text-overflow-ellipsis overflow-hidden m-0">
                                0
                              </p>
                            </div>
                          </div>
                          {/* </Link> */}
                        </div>
                      </li>
                    ))}
                    <li className="col-12 col-lg-6 avoid-card-style">
                      <div className="add-company__wrapper">
                        New companies added will appear here
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="btn-cta bg-white border-top desktop-none">
              <Link
                to="company/new"
                // onClick={() => dispatch({ type: "RESET_INVOICE" })}
                className="btn btn-custom btn-pay-request"
              >
                <FontAwesomeIcon icon={faPlus} /> New company
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
