import React, { button, useEffect, useState } from "react";
import { Alert, Button, Row, Col } from "react-bootstrap";
import {Link} from "react-router-dom";
import Loading from "../loading";
import Score from "../analysis/score.js";
import registeredAnalysis from '../analysis/registered.js';
import "./style.scss";

export default function AnalysisPreview({ area, id, store}) {
  const config = registeredAnalysis[id];

  const [results, setResults] = useState(null);
  const [results1Y, setResults1Y] = useState(null);

  useEffect(() => {
    fetch(
      store.config.dataPath +
        `areas/${encodeURIComponent(
          area
        )}/analysis/${config.name}/results.json`
    )
      .then((response) => response.json())
      .then((json) => {
        setResults(json);
      });

    fetch(
      store.config.dataPath +
        `areas/${encodeURIComponent(
          area
        )}/analysis/${config.name}/results.1y.json`
    )
      .then((response) => response.json())
      .then((json) => {
        setResults1Y(json);
      });
  }, []);

  return (
    <div className="analysis-preview">
      {results !== null && results1Y !== null ? (
        <>
          <h3>
            <Link to={`/gebiete/${area}/analysen/${id}`}>
              {config.title}
            </Link>
          </h3>
          <Score showMaxScore={true} score={results.score} oldScore={results1Y.score} />
        </>
      ) : (
        <p>Daten werden geladen...</p>
      )}
    </div>
  );
}
