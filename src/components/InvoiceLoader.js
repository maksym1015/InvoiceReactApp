import React from "react";
export default function InvoiceLoader(props) {
  console.log("Animate: ", props)
  const contentLoader__heading = `content-loader__heading ${props.animate ? '':  'animate--paused'}`;
  const contentLoader__detailsHeading = `content-loader__details--heading ${props.animate ? '':  'animate--paused'}`;
  const contentLoader__detailsDescription = `content-loader__details--description ${props.animate ? '':  'animate--paused'}`;
  const contentLoader__avatar = `content-loader__avatar ${props.animate ? '':  'animate--paused'}`;
  
  return (
    <div className="content-loader__wrapper">
      <div className="content-loader">
        <div className={contentLoader__heading}></div>
        <br />
        <br />
        <div className="d-flex">
          <div className="w-50">
            <div className="content-loader__details">
              <div className={contentLoader__detailsHeading}></div>
              <div className={contentLoader__detailsDescription}></div>
            </div>
            <div className="content-loader__details">
              <div className={contentLoader__detailsHeading}></div>
              <div className={contentLoader__detailsDescription}></div>
            </div>
            <div className="content-loader__details">
              <div className={contentLoader__detailsHeading}></div>
              <div className={contentLoader__detailsDescription}></div>
            </div>
            <div className="content-loader__details">
              <div className={contentLoader__detailsHeading}></div>
              <div className={contentLoader__detailsDescription}></div>
            </div>
          </div>
          <div className="w-50">
            <div className={contentLoader__avatar}></div>
          </div>
        </div>
        <br />
        <br />
        <div className={contentLoader__heading}></div>
        <br />
        <br />
        <div className="d-flex">
          <div className="w-50">
            <div className="content-loader__details">
              <div className={contentLoader__detailsHeading}></div>
              <div className={contentLoader__detailsDescription}></div>
            </div>
          </div>
          <div className="w-50"></div>
        </div>
        <div className="content-loader__details">
          <div className={contentLoader__detailsDescription + " w-100"}></div>
          <div className={contentLoader__detailsDescription + " w-100"}></div>
          <div className={contentLoader__detailsDescription + " w-100"}></div>
          <div className={contentLoader__detailsDescription + " w-75"}></div>
        </div>
        <div className="content-loader__details">
          <div className={contentLoader__detailsDescription + " w-100"}></div>
          <div className={contentLoader__detailsDescription + " w-100"}></div>
          <div className={contentLoader__detailsDescription + " w-100"}></div>
          <div className={contentLoader__detailsDescription + " w-75"}></div>
        </div>
      </div>
    </div>
  );
}
