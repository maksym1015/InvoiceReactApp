import React, { useEffect } from "react";
import { dashboardGraph } from "../../utils/helpers";
import HR from "../../components/HR";

export default function ProfilePublic() {
  useEffect(() => {
    dashboardGraph();
  }, []);

  return (
    <div className="profile-public">
      <div className="d-flex align-items-center justify-content-center height-xl-100-per p-2 p-md-5">
        <div className="card-v1 w-md-75 max-width-980-px d-flex align-items-center flex-column px-3 py-4">
          <div className="profile-public__avatar mb-3"><h1>T</h1></div>
          <h1 className="mb-5">Ted's Pizza</h1>
          <span className="mb-5">
            <a className="text-primary">See less</a>
          </span>
          <div className="w-100 px-5">
            <div className="profile-user__about mb-5">
              <div className="profile-user__about--heading font-bold">
                <span>About</span>
              </div>
              <HR className="d-none d-md-block" />
              <div className="profile-user__about--description">
                Lorem ipsum lorem visum Lorem ipsum lorem visum Lorem ipsum
                lorem visum Lorem ipsum lorem visum Lorem ipsum lorem visum
                Lorem ipsum lorem visum Lorem ipsum lorem visum Lorem ipsum
                lorem visum Lorem ipsum lorem visum Lorem ipsum lorem visum
                Lorem ipsum lorem visum Lorem ipsum lorem visum Lorem ipsum
                lorem visum Lorem ipsum lorem visum
              </div>
            </div>
          </div>

          <div className="d-flex flex-column flex-md-row px-5 w-100 mb-5">
            <div className="w-100 w-md-75 d-flex flex-md-wrap flex-column flex-md-row order-1 order-md-0">
              <span className="profile-user__link mb-5">
                <h4 className="text-light-grey-1 text-md-black font-bold">
                  Email
                </h4>
                <span className="text-light-grey-2 text-md-black">
                  info@tedspizza.com
                </span>
              </span>
              <span className="profile-user__link mb-5">
                <h4 className="text-light-grey-1 text-md-black font-bold">
                  Website
                </h4>
                <span className="text-light-grey-2 text-md-black">
                  https://tedspizza.com
                </span>
              </span>
              <span className="profile-user__link mb-5">
                <h4 className="text-light-grey-1 text-md-black font-bold">
                  Referred by
                </h4>
                <span className="text-light-grey-2 text-md-black">
                  Tom’s Dough company
                </span>
              </span>
            </div>

            <div className="w-100 w-md-25 d-flex align-items-center justify-content-center justify-content-md-end order-0 order-md-0 mb-5 mb-md-0"></div>
          </div>

          <button className="btn btn-custom d-flex justify-content-around">
            <span>Send Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
}
