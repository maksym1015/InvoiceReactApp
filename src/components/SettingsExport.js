import React, { useContext, useEffect, useState } from "react";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faAngleRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import { store } from "../store";
import api, { cancelToken } from "../utils/api";
import HR from "./HR";
import DateRangeField from "./DateRangeField";
import { notify } from "../utils/helpers";

export default function SettingsExport() {
  const { state } = useContext(store);

  const source = cancelToken.source();

  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState([]);
  const [type, setType] = useState("pdf");

  const getNumberWithPrependZero = (number) => {
    if (number < 10)
      return number.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
    else return number;
  };

  const handleDateRange = (range) => {
    let startDate = range[0];
    let endDate = range[1];

    startDate = `${new Date(
      startDate
    ).getFullYear()}-${getNumberWithPrependZero(
      new Date(startDate).getMonth()
    )}-${getNumberWithPrependZero(new Date(startDate).getDate())}`;

    endDate = `${new Date(endDate).getFullYear()}-${getNumberWithPrependZero(
      new Date(endDate).getMonth()
    )}-${getNumberWithPrependZero(new Date(endDate).getDate())}`;

    setDateRange([startDate, endDate]);
  };

  const onSave = () => {
    if (
      !(
        dateRange.length > 0 &&
        !dateRange[0].includes("NaN") &&
        !dateRange[1].includes("NaN")
      )
    ) {
      return notify("Please enter timeframe.", "error");
    }
    if (!(type !== "" && type.length > 0)) {
      return notify("Please enter type.", "error");
    }

    createService();
  };

  const createService = () => {
    setLoading(true);

    api
      .post("invoices/export", {
        tf_start: `${dateRange[0]}`,
        tf_end: `${dateRange[1]}`,
        type: `${type}`,
      })
      .then((response) => {
        if (response.data.status == "success") {
          notify("Successfully exported.");

          setDateRange([]);
          setType("pdf");
        }

        setLoading(false);
      })
      .catch((error) => {
        notify("Error in export.", "error");

        setLoading(false);
      });
  };

  useEffect(() => {
    return () => {
      source.cancel("axios request cancelled");
    };
  }, []);

  return (
    <div>
      <div className="settings-export">
        <div className="updated-settings__card">
          <div className="px-4 py-5 p-md-5">
            <div className="updated-settings__headingM displayM__font-size font-weight-bold mb-5">
              Export
            </div>

            <div className="search-recipient mb-5">
              <div className="form-group position-relative">
                <span className="position-absolute search-icon">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search templates"
                />
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-5">
              <div>
                <div className="textLBold__font-size">Monthly</div>
                <div className="textS__font-size" style={{ color: "#6C6F75" }}>
                  Quick export of past months data
                </div>
              </div>
              <div className="displayS__font-size font-weight-bold">
                <FontAwesomeIcon
                  icon={faFolder}
                  className="ml-3 text-primary"
                />
              </div>
            </div>
            <div className="updated-settings__headingM displayM__font-size font-weight-bold mb-5">
              Format your export
            </div>
            <div className="settings-export__tile">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="textMBold__font-size mb-0">Data</h4>
                <p className="settings-export__tile--color-dark-grey flex-fill text-right text-transform-capitalize textS__font-size mb-0 mr-5">
                  Incoming, Outgoing, Pending
                </p>
                <div className="settings-export__tile--icon d-flex justify-content-center align-items-center">
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
              </div>
              <HR />
            </div>
            <div className="settings-export__tile">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="textMBold__font-size mb-0">Timeframe</h4>
                <div className="d-flex align-items-center justify-content-end settings-export__tile--color-dark-grey flex-fill text-right textS__font-size mb-0 mr-5">
                  <DateRangeField
                    calendarIcon={null}
                    clearIcon={null}
                    variant="standard"
                    wrapperClassName="max-width-200-px m-0"
                    onChange={handleDateRange}
                    value={dateRange}
                  />
                </div>
                <div className="settings-export__tile--icon d-flex justify-content-center align-items-center">
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
              </div>
              <HR />
            </div>
            <div className="settings-export__tile">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="textMBold__font-size mb-0">People</h4>
                <p className="settings-export__tile--color-dark-grey flex-fill text-right text-transform-capitalize textS__font-size mb-0 mr-5">
                  all
                </p>
                <div className="settings-export__tile--icon d-flex justify-content-center align-items-center">
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
              </div>
              <HR />
            </div>
            <div className="settings-export__tile">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="textMBold__font-size mb-0">Type</h4>
                <p className="d-flex justify-content-end align-items-center settings-export__tile--color-dark-grey flex-fill text-right text-transform-capitalize textS__font-size mb-0 mr-5">
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="form-control cursor-pointer"
                    dir="rtl"
                  >
                    <option value="pdf">pdf</option>
                  </select>
                </p>
                <div className="settings-export__tile--icon d-flex justify-content-center align-items-center">
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
              </div>
              <HR />
            </div>
            <div className="settings-export__tile">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="textMBold__font-size mb-0">Destination</h4>
                <p className="settings-export__tile--color-dark-grey flex-fill text-right textS__font-size mb-0 mr-5">
                  dpicciolini@gmail.com
                </p>
                <div className="settings-export__tile--icon d-flex justify-content-center align-items-center">
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
              </div>
              <HR />
            </div>
            <br />
            <br />
            <div>
              <button
                type="submit"
                className="btn btn-custom d-flex align-items-center justify-content-around px-3 py-3"
                onClick={onSave}
              >
                Export
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
