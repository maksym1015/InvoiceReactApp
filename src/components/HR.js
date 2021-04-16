import React from "react";
export default function HR(props) {
  return (
    <div
      className={`horizontal-line ${props.className && props.className}`}
      style={{
        borderWidth: `${props.borderWidth && props.borderWidth}`,
        borderStyle: `${props.borderStyle && props.borderStyle}`,
        borderColor: `${props.borderColor && props.borderColor}`,
      }}
    ></div>
  );
}
