import React from "react";

const Population = ({ value }) => {
  return (value && <>{Math.round(value / 1000)} Tsd.</>) || "";
};

export default Population;
