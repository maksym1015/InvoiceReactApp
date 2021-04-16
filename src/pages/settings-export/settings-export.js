import React from "react";
import SettingsExportComponent from "../../components/SettingsExport";

import Header from "../../components/Header";

export default function SettingsExport() {
  return (
    <div className="settings updated-settings robinhood">
      <div className="d-flex">
        <Header title="Company settings" />

        <div className="updated-settings-details w-100">
          <div className="container-fluid">
            <SettingsExportComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
