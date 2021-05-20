import React, { button, useEffect, useState } from "react";
import { Alert, Button, Row, Col } from "react-bootstrap";
import {Link} from "react-router-dom";
import Icon from "../icon";
import Loading from "../loading";
import Map from "./map.mjs";
import Score from "./score.js";
import Value from "./value.js";
import "./style.scss";

import registeredAnalysis from './registered.js';

const Analysis = ({areaId, areaConfig, id, store, className}) => {
  const config = registeredAnalysis[id];

  const [results, setResults] = useState(null);
  const [results1Y, setResults1Y] = useState(null);
  const [mapShown, setMapShown] = useState(false);
  const [mapFinished, setMapFinished] = useState(false);

  const hasMap = 'map' in config;

  const loadFeatures = () => {
    setMapShown(true);
    var map = new Map(`map-${id}`, config.map);
    fetch(
      store.config.dataPath +
        `areas/${encodeURIComponent(
          areaId
        )}/analysis/${config.name}/features.json`
    )
      .then((response) => response.json())
      .then((json) => {
        setMapFinished(true);
        map.view(json);
      });
  };

  useEffect(() => {
    fetch(
      store.config.dataPath +
        `areas/${encodeURIComponent(
          areaId
        )}/analysis/${config.name}/results.json`
    )
      .then((response) => response.json())
      .then((json) => {
        setResults(json);
      });

    fetch(
      store.config.dataPath +
        `areas/${encodeURIComponent(
          areaId
        )}/analysis/${config.name}/results.1y.json`
    )
      .then((response) => response.json())
      .then((json) => {
        setResults1Y(json);
      });
  }, []);

  return (
    <div className={className}>
      <h2>{config.title} in{' '}
        <Link to={`/gebiete/${areaId}`}>
          {areaConfig.name}
        </Link>
      </h2>
      <p>{config.description}</p>
      <Alert variant="warning">
        <Icon name="flask"/>&nbsp;
        Diese Analyse ist zur Zeit noch sehr experimentell und daher mit
        Vorsicht zu genießen!
      </Alert>
      {results !== null && results1Y !== null ? (
        <>
          <Row className="my-5 align-items-center">
            <Col xs={4} sm={3} lg={2}>
              <Score showMaxScore={true} score={results.score} oldScore={results1Y.score} />
            </Col>
            <Col>
              <ul className="analysis-values">
                {Object.keys(config.values || []).map((key) => (
                  <li key={key}>
                    <Value
                      config={config.values[key]}
                      value={results[key]}
                      oldValue={results1Y[key]}
                    />
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
          {hasMap && !mapShown && (
            <p>
              <Button onClick={loadFeatures} variant="info">
                Zeige Karte
              </Button>
              &nbsp; (je nach Größe der Stadt werden viele Daten geladen. Kann
              auf älteren Computern oder im Mobilfunk Probleme bereiten)
            </p>
          )}
        </>
      ) : (
        <p>Daten werden geladen...</p>
      )}

      {hasMap && (
        <div className="feature-map" id={`map-${id}`} style={{display:mapShown ? 'block' : 'none'}}>{mapShown && !mapFinished && <Loading />}</div>
      )}
    </div>
  );
};

export default Analysis;
