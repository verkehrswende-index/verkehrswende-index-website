import React from "react";
/* import './style.scss'; */

export default function Icon({ name, title }) {
  return (
    <>
      { title &&
        <span className="sr-only">{title}</span>
      }
      <i className={`fa fa-${name}`} title={title} aria-hidden="true"></i>
    </>
  );
}
