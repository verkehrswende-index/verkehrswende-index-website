import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import React, { useRef } from "react";
import Trend from "../trend";

export default function Value({ config, value, oldValue }) {
  const target = useRef(null);

  const trend = (
    <Trend
      oldValue={oldValue}
      value={value}
      lowerIsBetter={config.lowerIsBetter}
    />
  );

  const valueOnly = (
    <>
      <strong>{config.title}</strong>:{" "}
      {config.unit == "m"
        ? Math.round(value / 1000) + " km"
        : Math.round(value * 1000) / 1000 +
          (config.unit ? " " + config.unit : "")}
      &nbsp;
      {trend}
    </>
  );

  if (config.description === undefined) {
    return <span>{valueOnly}</span>;
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {config.description}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <span>
        {valueOnly}
        &nbsp;
        <small>
          <Badge pill variant="info">
            ?
          </Badge>
        </small>
      </span>
    </OverlayTrigger>
  );
}
