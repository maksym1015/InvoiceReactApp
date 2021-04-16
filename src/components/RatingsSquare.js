import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function RatingsSquare(props) {
  return (
    <>
      <div className={`ratings__square ${props.className}`}>
        <h4 className="textMBold__font-size">{props.title}</h4>
        <div className="pb-5 text-success textLBold__font-size">
          <FontAwesomeIcon icon={faStar} className="mr-2" />
          {props.rating}
        </div>
      </div>
    </>
  );
}
