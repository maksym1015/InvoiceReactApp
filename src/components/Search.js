import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { store } from "../store";
import Avatar from "./Avatar";

export default function Search() {
  const { state } = useContext(store);
  const history = useHistory();

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const applySearch = () => {
    // Reset List
    if (search.length === 0) {
      return setSuggestions([]);
    }

    // Filter list
    let filtered = state.users.filter((user) => {
      if (
        user.first_name.toLowerCase().includes(search.toLowerCase()) ||
        user.first_name.includes(search) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.email.includes(search)
      ) {
        return user;
      }

      return null;
    });

    setSuggestions(filtered);
  };

  useEffect(() => {
    applySearch();
  }, [search]);

  return (
    <div className="w-100 common-search-field d-none d-xl-block">
      <div className="form-group position-relative">
        <span className="position-absolute common-search-field__search-icon">
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <input
          type="text"
          className="form-control textS__font-size"
          placeholder="Name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            border: `${search.length ? "none" : "1px solid #e3e9ed"}`,
          }}
        />
        <div
          className="common-search-field__suggestion--wrapper"
          style={{
            boxShadow: `${
              search.length
                ? "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
                : "none"
            }`,
          }}
        >
          {suggestions.map((suggest) => {
            return (
              <div
                className="d-flex align-items-center mb-4 Dashboard__Filter"
                style={{ cursor: "pointer" }}
                onClick={() => history.push(`/profile/${suggest.id}`)}
                key={suggest.id}
              >
                <Avatar user={suggest} className="m-0 mr-4" />
                <span className="textS__font-size">
                  {suggest.first_name} {suggest.last_name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
