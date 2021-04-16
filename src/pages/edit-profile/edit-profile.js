import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import Aside from "../../components/Aside";
import Avatar from "../../components/Avatar";
import Loader from "../../components/Loader";

import { notify } from "../../utils/helpers";
import { store } from "../../store";
import api from "../../utils/api";
import Header from "../../components/Header";

export default function EditProfile() {
  const { state, dispatch } = useContext(store);
  const history = useHistory();

  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState(state.user.first_name);
  const [lastName, setLastName] = useState(state.user.last_name);
  const [company, setCompany] = useState(state.user.company);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(state.user.email);

  const inputFile = useRef(null);
  const selectFile = () => inputFile.current.click();

  const onFileChange = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];

    // apply validations if requested
    let fd = new FormData();
    fd.append("image", file);

    setLoading(true);

    api
      .post("users/avatar", fd)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          dispatch({
            type: "AVATAR_UPDATED",
            payload: response.data.data.image,
          });

          // window.location.reload();
          notify("Profile Updated");
          history.push('/');
        }
        setLoading(false);
      })
      .catch((errors) => {
        console.log(errors.response);
        setLoading(false);
      });
  };

  const onSubmit = () => {
    if (firstName === "" || lastName === "") {
      return notify("Error! Missing fields.", "error");
    }

    saveUser();
  };

  const saveUser = () => {
    setDisabled(true);
    setLoading(true);

    setTimeout(() => {
      setDisabled(false);
      setLoading(false);
    }, 500);

    let data = { first_name: firstName, last_name: lastName, company };

    api
      .put(`/users/${state.user.id}`, data)
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: "LOGGEDIN", payload: { ...state.user, ...data } });

          notify(response.data.message);
        }

        setDisabled(false);
        setLoading(false);
      })
      .catch((errors) => {
        console.log(errors.response);
        setLoading(false);
        setDisabled(false);
      });
  };

  useEffect(() => {
    // if (state.user.first_name) setFirstName(state.user.first_name);
    // if (state.user.last_name) setLastName(state.user.last_name);
    // if (state.user.company) setCompany(state.user.company);
    // if (state.user.email) setEmail(state.user.email);
  }, []);

  return (
    <div className="profile">
      {loading && <Loader />}

      <div className="d-flex desktop-nav-p">
        <Aside />

        <div className="content-area">
          <div className="page-title">Edit Profile</div>

          <Header title="Edit Profile" />

          <div className="text-center mt-5">
            <div className="d-inline-block" onClick={selectFile}>
              <Avatar user={state.user} />
            </div>

            <input
              type="file"
              id="file"
              ref={inputFile}
              className="d-none"
              onChange={onFileChange}
            />

            {/* <h2 className="m-0 text-dark">{state.user.company}</h2> */}
            <p className="m-0 text-secondary">{state.user.email}</p>
          </div>

          <form className="p-4" onSubmit={onSubmit}>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="form-control"
              />
            </div>

            {/* <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
              />
            </div> */}

            <div className="form-group">
              <label>
                Email <small className="extra-small">(Readonly)</small>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                readOnly
              />
            </div>

            <p className="extra-small">
              You can be paid using your username, email or phone number.
            </p>
          </form>
        </div>
      </div>

      <div className="btn-cta">
        <button
          className="btn btn-custom shadow"
          onClick={onSubmit}
          disabled={disabled}
        >
          <span>Save Profile</span>
        </button>
      </div>
    </div>
  );
}
