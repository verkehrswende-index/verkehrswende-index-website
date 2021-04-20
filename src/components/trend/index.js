import React from "react";
import Icon from "../icon";
import "./style.scss";

export default function Trend({ value, oldValue, lowerIsBetter, increase }) {
  if ( increase === undefined ) {
    increase = Math.round((value / oldValue - 1) * 1000) / 10;
  } else {
    increase = Math.round( increase * 1000 ) / 10;
  }
  let positive = increase > 2;
  let negative = increase < -2;
  return (
    <span
      className={ "trend " +
        (lowerIsBetter ? "value--lower-is-better " : "") +
        `value__relative--${
          positive ? "increase" : negative ? "decrease" : "constant"
        }`
      }
    >
      <Icon
        name={`arrow-circle-${positive ? "up" : negative ? "down" : "right"}`}
      />{" "}
      <span>
      {(increase > 0 ? "+" : "") + increase.toFixed(1)}%
      </span>
    </span>
  );
}
