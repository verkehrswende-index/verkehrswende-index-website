import { useState, useEffect } from "react";
import { Alert, Button, Row, Col } from "react-bootstrap";
import dynamic from 'next/dynamic';
import Link from "next/link";
import Icon from "../icon";
import Score from "./score.js";
import Value from "./value.js";
import styles from "./style.module.scss";
import registeredAnalysis from 'lib/analysis/registered.ts';
import { fetchFeaturesDownloadSize } from "lib/data.ts";


const Map = dynamic(
  () => import('components/feature-map'),
  { ssr: false }
)

const Analysis = ({areaId, areaConfig, id, className, data}) => {
  const config = registeredAnalysis[id];
  const { results, results1y } = data;

  const [showMap, setShowMap] = useState(false);

  const [featuresDownloadSize, setFeaturesDownloadSize] = useState<number>(0);

  useEffect(() => { (async () => {
    const size = await fetchFeaturesDownloadSize(areaId, config.name);
    setFeaturesDownloadSize(size);
    })();
  }, []);

  const hasMap = 'map' in config;

  return (
    <div className={className}>
      <h2>{config.title} in{' '}
        <Link href={`/gebiete/${areaId}`}>
          {areaConfig.name}
        </Link>
      </h2>
      <p>{config.description}</p>
      <Alert variant="warning">
        <Icon name="flask"/>&nbsp;
        Diese Analyse ist zur Zeit noch sehr experimentell und daher mit
        Vorsicht zu genießen!
      </Alert>
      <Row className="my-5 align-items-center">
        <Col xs={4} sm={3} lg={2}>
          <Score showMaxScore={true} score={results.score} oldScore={results1y.score} />
        </Col>
        <Col>
          <ul className={styles['analysis-values']}>
            {Object.keys(config.values || []).map((key) => (
              <li key={key}>
                <Value
                  config={config.values[key]}
                  value={results[key]}
                  oldValue={results1y[key]}
                />
              </li>
            ))}
          </ul>
        </Col>
      </Row>
      {hasMap && !showMap && (
        <p>
          <Button onClick={() => setShowMap(true)} variant="info">
            Zeige Karte {featuresDownloadSize > 0 ? `(> ${Math.round(featuresDownloadSize / 1024)}kb)` : ''}
          </Button>
          &nbsp; (je nach Größe der Stadt werden viele Daten geladen. Kann
          auf älteren Computern oder im Mobilfunk Probleme bereiten)
        </p>
      )}
      {showMap && <Map area={areaId} analysis={config.name} config={config.map}/>}
    </div>
  );
};

export default Analysis;
