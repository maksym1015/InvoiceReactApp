import React from "react";

export default function Loader() {
  return (
    <>
      <div className="loader-bg"></div>

      <div className="loader">
        <div className="spinner-border p-5" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  );
}
