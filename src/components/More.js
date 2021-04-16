import React from "react";

export default function More(props) {
  const handleOnClick = () => {
    props.onClick && props.onClick(props.lineItem);
  };

  return (
    <>
      <ul
        className={`more ${props.className && props.className}`}
        onClick={handleOnClick}
      >
        <li className="more__dot"></li>
        <li className="more__dot"></li>
        <li className="more__dot"></li>
      </ul>
    </>
  );
}
