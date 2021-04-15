import React from "react";
import Icon from "../icon";

export default function Trend({ value, oldValue, lowerIsBetter }) {
  let increase = Math.round((value / oldValue - 1) * 1000) / 10;
  let positive = increase > 2;
  let negative = increase < -2;
  return (
    <span
      className={
        (lowerIsBetter ? "value--lower-is-better " : "") +
        `value__relative--${
          positive ? "increase" : negative ? "decrease" : "constant"
        }`
      }
    >
      <Icon
        name={`arrow-circle-${positive ? "up" : negative ? "down" : "right"}`}
      />{" "}
      {(increase > 0 ? "+" : "") + increase}%
    </span>
  );
}
