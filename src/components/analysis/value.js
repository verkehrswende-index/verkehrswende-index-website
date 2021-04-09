import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import React, { useRef } from 'react';

export default function Value( { config, value } ) {
  const target = useRef(null);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      { config.description }
    </Tooltip>
  );


  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <span>
        <strong>
          {config.title}
        </strong>: {
          config.unit = 'm'
                      ? Math.round( value / 1000 ) + ' km'
                      : value + ' ' + config.unit
        }
    &nbsp;
    <Badge pill variant="info">?</Badge>
      </span>
    </OverlayTrigger>
  );
};
