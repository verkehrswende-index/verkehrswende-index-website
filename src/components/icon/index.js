import React from "react";
/* import './style.scss'; */

export default function Icon({ name }) {
  return <i className={`fa fa-${name}`} aria-hidden="true"></i>;
}
