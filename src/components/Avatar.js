import React, { useState } from "react";

export default function Avatar({ user, className }) {
  const [image, setImage] = useState(
    process.env.REACT_APP_IMAGE_PATH + user.image
  );

  const onError = () => {
    setImage("/images/default.jpg");
  };

  return (
    // <div className={`avatar mr-4 ${className && className}`}>
    <div className={`avatar ${className && className}`}>
      {user.image ? (
        <img src={image} alt="avatar" id="avatar" onError={onError} />
      ) : (
        <div className="text text-uppercase" id="avatar">
          {user.first_name
            ? user.first_name.split("", 1)
            : user.email
            ? user.email.split("", 1)
            : ""}
        </div>
      )}
    </div>
  );
}
