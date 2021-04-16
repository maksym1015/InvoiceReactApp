import React from "react";
import { Link } from "react-router-dom";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function InvoiceButton() {
  return (
    <Link to="/invoice/new" className="send-invoice shadow">
      <FontAwesomeIcon icon={faPaperPlane} size="2x" />
    </Link>
  );
}
