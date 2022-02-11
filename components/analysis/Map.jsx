import { button, useEffect, useState } from "react";
import { Alert, Button, Row, Col } from "react-bootstrap";
import Loading from "../loading";
import MapWidget from "./map.js";
import styles from "./style.module.scss";
import { fetchFeatures } from "../../lib/data.js";

import registeredAnalysis from './registered.js';

const Map = ({area, analysis, config}) => {
  const [mapFinished, setMapFinished] = useState(false);
  useEffect(async () => {
    const map = new MapWidget(`map-${analysis}`, config);
    const features = await fetchFeatures(area, analysis);
    setMapFinished(true);
    map.view(features);
  }, []);

  return (
    <div className={styles['feature-map']} id={`map-${analysis}`}>
      {!mapFinished && <Loading />}
    </div>
  );
};

export default Map;
