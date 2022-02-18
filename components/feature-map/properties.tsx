import { useState } from "react";
import styles from "./properties.module.scss";
import { AnalysisProperties } from "lib/data";
import { mapProperties } from "lib/analysis/properties";

type Props = {
  properties: AnalysisProperties;
};

const Properties = ({ properties }: Props) => {
  const [showUnknownProperties, setShowUnknownProperties] =
    useState<bool>(false);

  const propertiesToShow = {};
  var osmLink = null;

  Object.entries(properties).forEach(([k, v]) => {
    if (k === "id") {
      osmLink = (
        <a target="_blank" href={`https://www.openstreetmap.org/${v}`}>
          In der Open Street Map anzeigen
        </a>
      );
    } else {
      propertiesToShow[k] = v;
    }
  });

  const mappedProperties = mapProperties(propertiesToShow);

  const renderValue = (value, type) => {
    switch (type) {
      case "score":
        return `${value * 100}/100`;
        break;
      case "bool":
        return value ? "ja" : "nein";
        break;
      default:
        return value;
    }
  };

  const renderProperties = (properties) => (
    <ul className={styles.properties}>
      {Object.entries(properties).map(([k, v]) => (
        <li key={k}>
          <i>{v.label}:</i> {renderValue(v.value, v.type)}
          <br />
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {properties.name && (
        <>
          <h2>{properties.name}</h2>
          <br />
        </>
      )}
      <strong>Werte:</strong>
      <div className={styles.propertyLists}>
        {renderProperties(mappedProperties.known)}
        {showUnknownProperties && renderProperties(mappedProperties.unknown)}
        {showUnknownProperties || (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowUnknownProperties(true);
            }}
          >
            Alle Attribute anzeigen
          </a>
        )}
      </div>
      <br />
      {osmLink}
    </>
  );
};

export default Properties;
