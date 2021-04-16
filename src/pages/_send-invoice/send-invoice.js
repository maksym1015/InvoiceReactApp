import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function SendInvoice() {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const [active, setActive] = useState(false);

  const onSubmit = (data) => {
    console.log(data);

    if (data.invoiceable == 1) {
      history.push("/recipient");
    } else {
      history.push("/");
    }
  };

  return (
    <div className="px-3 pt-4 pb-7 min-vh-92 bg-custom-light">
      <p className="font-weight-bold mt-3">Honeydu</p>

      <form onSubmit={handleSubmit(onSubmit)} className="register p-5 mt-7">
        <p className="font-weight-bold">Want to send an invoice right now?</p>

        <div
          className={
            active === 1
              ? "form-group-custom text-center active"
              : "form-group-custom text-center"
          }
          onClick={() => setActive(1)}
        >
          <label className="form-check-label w-100 h-100">
            <input
              type="radio"
              name="invoiceable"
              value="1"
              ref={register({ required: "Please select an option." })}
            />
            Yes
          </label>
        </div>

        <div
          className={
            active === 0
              ? "form-group-custom text-center active"
              : "form-group-custom text-center"
          }
          onClick={() => setActive(0)}
        >
          <label className="form-check-label w-100 h-100">
            <input
              type="radio"
              name="invoiceable"
              value="0"
              ref={register({ required: "Please select an option." })}
            />
            No
          </label>
        </div>

        {errors.invoiceable && (
          <span className="text-danger">{errors.invoiceable.message}</span>
        )}
      </form>

      <div className="btn-cta bg-custom-light">
        <button className="btn btn-custom" onClick={handleSubmit(onSubmit)}>
          Next
        </button>
      </div>
    </div>
  );
}
