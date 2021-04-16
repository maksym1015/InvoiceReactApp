import React from "react";

export default function FormErrors({ errors }) {
  let keys = Object.keys(errors);

  return (
    <div className="text-danger">
      <p>Errors!</p>
      <ul className="pl-5">
        {keys.map((key) => errors[key].map((error) => <li>{error}</li>))}
      </ul>
    </div>
  );
}
