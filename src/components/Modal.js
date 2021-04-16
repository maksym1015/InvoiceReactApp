import React from "react";

export default function Modal({ show, hideModal, children, maxWidth }) {
  return (
    <>
      {show && (
        <div
          className="h-100 w-100 fixed-top bg-trans-black"
          onClick={hideModal}
        ></div>
      )}

      {show && (
        <div
          className="feeds-modal p-5"
          style={{ maxWidth: `${maxWidth && maxWidth}` }}
        >
          <>{children}</>
        </div>
      )}
    </>
  );
}
