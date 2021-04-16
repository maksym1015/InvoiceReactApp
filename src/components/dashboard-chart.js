import React, { useEffect } from "react";

export default function DashboardChart(props) {
  useEffect(() => {
    if (props.graphFunction) props.graphFunction();
  });
  return (
    <div className="dashboard-chart" style={props.style}>
      <span className="displayM__font-size mb-2">{props.title}</span>
      <h1
        className={`price displayL__font-size mt-3 ${
          props.status === "success" ? "success" : "danger"
        }`}
      >
        {props.price}
      </h1>
      <div className="graph">
        <canvas id={props.graphId}></canvas>
      </div>
    </div>
  );
}
