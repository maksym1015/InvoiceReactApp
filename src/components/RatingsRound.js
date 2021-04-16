import React from "react";

export default function RatingsRound(props) {
  return (
    <>
      <div className={`ratings__round ${props.className && props.className}`}>
        <h4 className="displayL__font-size">{props.rating}</h4>
      </div>
    </>
  );
}
