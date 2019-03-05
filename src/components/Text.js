import React from "react";

export default ({ type, className, text }) => {
  switch (type) {
    case "span":
      return <span className={className}>{text}</span>;
    default:
      return <p className={className}>{text}</p>;
  }
};
