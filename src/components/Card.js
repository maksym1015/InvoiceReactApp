import React, { useEffect, useState } from "react";
import HR from "./HR";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function Card(props) {
  const [show, setShow] = useState(false);
  const [isQuick, setIsQuick] = useState(false);

  useEffect(() => {
    props.onChangeType && props.onChangeType(isQuick);
  }, [isQuick]);

  return (
    <>
      <div className="card-v1" style={props.style}>
        <h3 className="card-v1__header textMBold__font-size d-flex justify-content-between">
          {props.title}
          <FontAwesomeIcon
            icon={faAngleDown}
            onClick={() => setShow(true)}
            style={{ cursor: "pointer" }}
          />
        </h3>

        <div className="position-relative">
          {show && (
            <div
              className="h-100 w-100 fixed-top"
              onClick={() => setShow(false)}
            ></div>
          )}

          {show && (
            <ul className="card-type rounded bg-white py-3 small">
              <li className="px-3 pb-3 border-bottom">Payment Type</li>
              <li
                className={`px-3 py-2 my-2 card-type-link ${
                  isQuick ? "active" : ""
                }`}
                onClick={() => setIsQuick(true)}
              >
                Send general payment
              </li>
              <li
                className={`px-3 py-2 card-type-link ${
                  !isQuick ? "active" : ""
                }`}
                onClick={() => setIsQuick(false)}
              >
                Send itemized payment (Invoice)
              </li>
            </ul>
          )}
        </div>

        <HR className="mt-0" />
        {props.children}
      </div>
    </>
  );
}
