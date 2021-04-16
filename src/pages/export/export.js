import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFolderPlus,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import Header from "../../components/Header";

export default function Export() {
  return (
    <div className="export mobile-layer px-4">
      <Header title="Export" />

      <form className="search-recipient mt-5">
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
      </form>

      <div className="item border-bottom-0">
        <div className="flex-fill">
          <p className="item-title font-weight-bold">Monthly</p>
          <small className="extra">Quick export of past months data.</small>
        </div>

        <div
          className="item-icon border-0 text-primary"
          style={{ fontSize: "3rem" }}
        >
          <FontAwesomeIcon icon={faFolderPlus} />
        </div>
      </div>

      <div className="top-business desktop-none">
        <small className="font-weight-bold">Format your export</small>
      </div>

      <div className="export-list">
        <div className="export-item">
          <div className="flex-fill">
            <p className="font-weight-bold">Data</p>
          </div>

          <div className="d-flex align-items-center">
            <p className="small">Incoming, Outgoing, Pending.</p>
            <span className="icon-grey pl-3">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </div>
        </div>
        <div className="export-item">
          <div className="flex-fill">
            <p className="font-weight-bold">Timeframe</p>
          </div>

          <div className="d-flex align-items-center">
            <p className="small">7/1/2020 - 8/1/2020</p>
            <span className="icon-grey pl-3">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </div>
        </div>
        <div className="export-item">
          <div className="flex-fill">
            <p className="font-weight-bold">People</p>
          </div>

          <div className="d-flex align-items-center">
            <p className="small">all</p>
            <span className="icon-grey pl-3">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </div>
        </div>
        <div className="export-item">
          <div className="flex-fill">
            <p className="font-weight-bold">Type</p>
          </div>

          <div className="d-flex align-items-center">
            <p className="small">csv</p>
            <span className="icon-grey pl-3">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </div>
        </div>
        <div className="export-item">
          <div className="flex-fill">
            <p className="font-weight-bold">Destination</p>
          </div>

          <div className="d-flex align-items-center">
            <p className="small">contact@coral.global</p>
            <span className="icon-grey pl-3">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </div>
        </div>
      </div>

      <div className="btn-cta bg-white">
        <button className="btn btn-custom">Export</button>
      </div>
    </div>
  );
}
