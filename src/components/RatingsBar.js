import React from "react";

export default function RatingsBar(props) {
  let ratings = (parseFloat(props.rating) / 5) * 100;
  return (
    <>
      <div
        className={`d-flex align-items-center ratings__bar ${props.className}`}
      >
        <div
          className="flex-1 ratings__bar--path"
          style={{ backgroundColor: `${props.pathColor}` }}
        >
          <div
            className="ratings__bar--fill"
            style={{
              width: `${ratings}%`,
              backgroundColor: `${props.progressColor}`,
            }}
          ></div>
        </div>
        <h4
          className="m-0 ml-4 textS__font-size"
          style={{
            color: `${props.progressColor}`,
          }}
        >
          {props.title}
        </h4>
      </div>
    </>
  );
}
