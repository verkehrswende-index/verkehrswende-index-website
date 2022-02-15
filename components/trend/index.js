import React from "react";
import Icon from "../icon";
import styles from "./style.module.scss";

export default function Trend({ value, oldValue, lowerIsBetter, increase }) {
  if (increase === undefined) {
    increase = Math.round((value / oldValue - 1) * 1000) / 10;
  } else {
    increase = Math.round(increase * 1000) / 10;
  }
  if (Math.abs(increase) === Infinity) {
    return <></>;
  }
  let positive = increase > 1;
  let negative = increase < -1;
  return (
    <span
      className={
        styles.trend +
        " " +
        (lowerIsBetter ? "value--lower-is-better " : "") +
        `value__relative--${
          positive ? "increase" : negative ? "decrease" : "constant"
        }`
      }
    >
      <Icon
        name={`arrow-circle-${positive ? "up" : negative ? "down" : "right"}`}
      />{" "}
      <span>{(increase > 0 ? "+" : "") + increase.toFixed(1)}%</span>
    </span>
  );
}
