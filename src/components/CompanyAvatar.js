import React, { useState } from "react";

export default function Avatar({ company, className }) {
  const [image, setImage] = useState(
    process.env.REACT_APP_IMAGE_PATH + company.image
  );

  const onError = () => {
    setImage("/images/default.jpg");
  };

  return (
    // <div className={`avatar mr-4 ${className && className}`}>
    <div className={`avatar ${className && className}`}>
      {company.image ? (
        <img src={image} alt="avatar" id="avatar" onError={onError} />
      ) : (
        <div className="text text-uppercase" id="avatar">
          {company.name ? company.name.split("", 1) : ""}
        </div>
      )}
    </div>
  );
}
