import React from "react";
import styles from "./style.module.scss";
import cn from "classnames";

export default function Icon({ name, title = null }) {
  var icon = null;
  if (name === "ban-car") {
    icon = (
      <i
        className={cn(
          "fa",
          styles.fa,
          "fa-car",
          styles["fa-car"],
          styles["icon--ban-car"]
        )}
        title={title}
        aria-hidden="true"
      >
        <i className={cn("fa", styles.fa, "fa-ban")} aria-hidden="true"></i>
      </i>
    );
  } else {
    icon = (
      <i
        className={cn("fa", styles.fa, `fa-${name}`, styles[`fa-${name}`])}
        title={title}
        aria-hidden="true"
      ></i>
    );
  }
  return (
    <span className={styles.icon}>
      {title && <span className="sr-only">{title}</span>}
      {icon}
    </span>
  );
}
