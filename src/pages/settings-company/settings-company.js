import React from "react";

import Header from "../../components/Header";
import CompanySettings from "../../components/CompanySettings";

export default function SettingsCompany() {
  return (
    <div className="settings updated-settings robinhood">
      <div className="d-flex">
        <Header title="Company settings" />

        <div className="updated-settings-details w-100">
          <div className="container-fluid">
            <CompanySettings />
          </div>
        </div>
      </div>
    </div>
  );
}
