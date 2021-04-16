import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegramPlane } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowLeft,
  faExclamationTriangle,
  faFile,
  faPaperclip,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { store } from "../store";
import api from "../utils/api";

import { notify } from "../utils/helpers";

export default function FeedbackModal({ show, setShow }) {
  const { state } = useContext(store);

  const [type, setType] = useState("home");
  const [details, setDetails] = useState("");
  const [file, setFile] = useState(null);

  const onFileChange = (event) => {
    // event.stopPropagation();
    // event.preventDefault();
    // var file = event.target.files[0];
    // // apply validations if requested
    // let fd = new FormData();
    // fd.append("image", file);
    // setLoading(true);
    // api
    //   .post("users/avatar", fd)
    //   .then((response) => {
    //     console.log(response.data);
    //     if (response.data.success) {
    //       dispatch({
    //         type: "AVATAR_UPDATED",
    //         payload: response.data.data.image,
    //       });
    //       // window.location.reload();
    //       notify("Profile Updated");
    //       history.push("/");
    //     }
    //     setLoading(false);
    //   })
    //   .catch((errors) => {
    //     console.log(errors.response);
    //     setLoading(false);
    //   });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!(details !== "" && details.length > 0)) {
      return notify("Please enter details.", "error");
    }

    sendFeedback();
  };

  const sendFeedback = () => {
    notify("Send feedback", "success");
    return;

    // setLoading(true);

    // if (state && state.company && state.company.id) {
    //   api
    //     .post(`companies/${state.company.id}/invite`, {
    //       email: email,
    //       first_name: firstName,
    //       last_name: lastName,
    //       role: inviteUserRadio,
    //     })
    //     .then((response) => {
    //       if (response.status == 200) {
    //         notify("Invite sent successfully", "success");

    //         clearState();
    //       }

    //       setLoading(false);
    //     })
    //     .catch((error) => {
    //       notify("Failed to send invite.", "error");

    //       setLoading(false);
    //     });
    // }
  };

  const goBack = () => {
    clearState();
    setType("home");
  };

  const closeModal = () => {
    clearState();
    setShow(false);
  };

  const clearState = () => {
    setDetails("");
    setFile(null);
  };

  return (
    <>
      {show && (
        <div
          className="h-100 w-100 fixed-top bg-trans-black"
          onClick={() => setShow(false)}
        ></div>
      )}

      {show && (
        <div className="feeds-modal">
          {type === "home" && (
            <>
              <div className="header">
                <h3>Give Feedback to Honeydu</h3>

                <Link
                  to="#"
                  className="modal-close"
                  onClick={() => setShow(false)}
                >
                  <span>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </Link>
              </div>

              <p>
                With your help, the team at Honeydu will make our app better.
              </p>

              <Link
                to="#"
                className="feeds-modal-link"
                onClick={() => setType("general")}
              >
                <span className="svg-container">
                  <FontAwesomeIcon icon={faTelegramPlane} />
                </span>

                <div className="d-flex flex-column">
                  <span className="text-dark font-weight-bold">
                    Help us improve Honeydu
                  </span>
                  <span className="text-secondary">
                    Give feedback about your Honeydu experience.
                  </span>
                </div>
              </Link>

              <Link
                to="#"
                className="feeds-modal-link"
                onClick={() => setType("feature")}
              >
                <span className="svg-container svg-fix">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                </span>

                <div className="d-flex flex-column">
                  <span className="text-dark font-weight-bold">
                    Something went wrong
                  </span>
                  <span className="text-secondary">
                    Let us know about a broken feature.
                  </span>
                </div>
              </Link>

              <p className="footer">
                We love feedback, and will reply to all questions directly
                within 24 hours.
              </p>
            </>
          )}

          {type === "general" && (
            <>
              <div className="header">
                <Link to="#" className="modal-back" onClick={goBack}>
                  <span>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </span>
                </Link>

                <h3 className="mb-0">Help Us Improve Honeydu</h3>

                <Link to="#" className="modal-close" onClick={closeModal}>
                  <span>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </Link>
              </div>

              <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="details">Details</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Please include as much info as possible..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  ></textarea>
                </div>

                {file ? (
                  <div className="form-group">
                    <label
                      htmlFor="file"
                      className="d-inline-flex align-items-center mr-3"
                    >
                      <FontAwesomeIcon icon={faPaperclip} className="mr-3" />
                      File attached.
                    </label>
                  </div>
                ) : (
                  <div className="form-group">
                    <label htmlFor="file">
                      <FontAwesomeIcon icon={faPaperclip} /> Add a Screenshot or
                      Video (recommended)
                    </label>
                    <input
                      type="file"
                      id="file"
                      className="d-none"
                      value={file}
                      onChange={(e) => setFile(e.target.value)}
                    />
                  </div>
                )}

                <div className="text-right">
                  <button
                    type="button"
                    className="btn btn-cancel"
                    onClick={goBack}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn bg-custom-primary text-white"
                    onClick={onSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </>
          )}

          {type === "feature" && (
            <>
              <div className="header">
                <Link to="#" className="modal-back" onClick={goBack}>
                  <span>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </span>
                </Link>

                <h3 className="mb-0">Something Went Wrong</h3>

                <Link to="#" className="modal-close" onClick={closeModal}>
                  <span>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </Link>
              </div>

              <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="details">Details</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Please include as much info as possible..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  ></textarea>
                </div>

                {file ? (
                  <div className="form-group">
                    <label
                      htmlFor="file"
                      className="d-inline-flex align-items-center mr-3"
                    >
                      <FontAwesomeIcon icon={faPaperclip} className="mr-3" />
                      File attached.
                    </label>
                  </div>
                ) : (
                  <div className="form-group">
                    <label htmlFor="file">
                      <FontAwesomeIcon icon={faPaperclip} /> Add a Screenshot or
                      Video (recommended)
                    </label>
                    <input
                      type="file"
                      id="file"
                      className="d-none"
                      value={file}
                      onChange={(e) => setFile(e.target.value)}
                    />
                  </div>
                )}

                <div className="text-right">
                  <button
                    type="button"
                    className="btn btn-cancel"
                    onClick={goBack}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn bg-custom-primary text-white"
                    onClick={onSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
