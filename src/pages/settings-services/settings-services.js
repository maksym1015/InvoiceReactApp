import React from "react";

import Header from "../../components/Header";
import CompanyService from "../../components/CompanyService";

export default function CompanyServices() {
  return (
    <div className="settings updated-settings robinhood">
      <div className="d-flex desktop-nav-p">
        <Header title="Company Services" />

        <div className="updated-settings-details w-100">
          <div className="container-fluid">
            <CompanyService />
          </div>
        </div>
      </div>
    </div>
  );
}
