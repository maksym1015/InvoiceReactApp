import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function AddCard() {
  const history = useHistory();

  useEffect(() => {});

  return (
    <div className="mobile-layer px-4 pb-7">
      <div className="py-4 px-3">
        <button
          onClick={() => history.goBack()}
          className="position-absolute btn-custom-link p-0"
        >
          Cancel
        </button>

        <p className="text-center font-weight-bold">Add Card</p>
      </div>

      <form className="add-card">
        <div className="mb-4">
          <input
            type="number"
            placeholder="Card Number"
            className="form-control"
          />
        </div>

        <div className="mb-4 d-flex">
          <input
            type="text"
            placeholder="Exp Date"
            className="form-control mr-5"
          />
          <input
            type="number"
            placeholder="Security Code"
            className="form-control"
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            placeholder="Zip Code"
            className="form-control"
          />
        </div>

        <button type="button" className="btn btn-custom mt-5">
          Add
        </button>
      </form>
    </div>
  );
}
