import React from "react";
import './style.scss';

export default function Icon({ name, title }) {
  var icon = null;
  if (name === "ban-car") {
    icon = (
      <i className={`fa fa-car icon--ban-car`} title={title} aria-hidden="true">
        <i className={`fa fa-ban`} aria-hidden="true"></i>
      </i>
    );
  } else {
    icon = <i className={`fa fa-${name}`} title={title} aria-hidden="true"></i>;
  }
  return (
    <div className="icon">
      { title &&
        <span className="sr-only">{title}</span>
      }
      { icon }
    </div>
  );
}
