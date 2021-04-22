import React, { button, useEffect, useState } from "react";
import { Alert, Button, Row, Col } from "react-bootstrap";
import chroma from "chroma-js";
import Loading from "../loading";
import Score from "./score.js";
import Value from "./value.js";
import "./style.scss";

const registeredAnalysis = {
  radinfrastruktur: {
    title: "Radinfrastruktur",
    description: `
Wie viele Radwege und Radspuren gibt es
im Verhältnis zu allen Wegen?
    `,
    values: {
      good: {
        title: "Gut",
        unit: "m",
        description: "Komfortable, schnelle, sichere Rad-Infrastruktur",
      },
      acceptable: {
        title: "Akzeptabel",
        unit: "m",
        description:
       "Minimal/Akzeptable Rad-Infrastruktur sowie Wege mit Tempo 30",
      },
      bad: {
        title: "Schlecht",
        unit: "m",
        description: "Schlechte oder nicht vorhandene Rad-Infrastruktur",
        lowerIsBetter: true,
      },
    },
  },
};

const Analysis = ({ area, analysis, store }) => {
  const config = registeredAnalysis["radinfrastruktur"];

  const [results, setResults] = useState(null);
  const [results1Y, setResults1Y] = useState(null);
  const [mapShown, setMapShown] = useState(false);
  const [mapFinished, setMapFinished] = useState(false);

  const loadFeatures = () => {
    setMapShown(true);
    var map = new Map("map");
    fetch(
      store.config.dataPath +
        `areas/${encodeURIComponent(
          area
        )}/analysis/bike_infrastructure/features.json`
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
          area
        )}/analysis/bike_infrastructure/results.json`
    )
      .then((response) => response.json())
      .then((json) => {
        setResults(json);
      });

    fetch(
      store.config.dataPath +
        `areas/${encodeURIComponent(
          area
        )}/analysis/bike_infrastructure/results.1y.json`
    )
      .then((response) => response.json())
      .then((json) => {
        setResults1Y(json);
      });
  }, []);

  return (
    <>
      <h2>{config.title}</h2>
      <p>{config.description}</p>
      <Alert variant="warning">
        Diese Analyse ist zur Zeit noch sehr experimentell und daher mit
        Vorsicht zu genießen!
      </Alert>
      {results !== null && results1Y !== null ? (
        <>
          <Row className="my-5 align-items-center">
            <Col xs={4} sm={3} lg={2}>
              <Score score={results.score} oldScore={results1Y.score} />
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
          {!mapShown && (
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

      <div id="map">{mapShown && !mapFinished && <Loading />}</div>
    </>
  );
};

class Map {
  constructor(mapid) {
    this.colorScale = chroma.scale('Spectral');
    var options = {
      minZoom: 10,
      maxZoom: 24,
    };

    this.map = new L.Map(mapid, options);

    var osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    var osmAttrib =
      'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
    var overpassAttrib =
      'POI via <a href="http://www.overpass-api.de/">Overpass API</a>';

    var osm = new L.TileLayer(osmUrl, {
      minZoom: 0,
      maxZoom: 20,
      attribution: [osmAttrib, overpassAttrib].join(","),
    });

    this.map.addLayer(osm);
  }

  getFeatureStyle(feature, highlighted = false) {
    return {
      weight: highlighted ? 10 : 3,
      opacity: 0.8,
      color: highlighted
           ? "#0000FF"
           : feature.properties.score > 0
          ? this.colorScale(feature.properties.score).hex()
        : "#FF00FF",
    };
  }

  onEachFeature(bounds, feature, layer) {
    var layerBounds = layer.getBounds();
    bounds.extend(layerBounds);

    layer.on({
      mouseover: () => layer.setStyle(this.getFeatureStyle(feature, true)),
      mouseout: () => layer.setStyle(this.getFeatureStyle(feature)),
    });
  }

  getPopupContent(feature) {
    var content = "";
    if (feature.properties.name) {
      content += "<h2>" + feature.properties.name + "</h2><br>";
    }
    content += "<strong>Werte:</strong><br>";
    for (var property in feature.properties) {
      if (property === "id") {
        var osmLink =
          '<a target="_blank" href="https://www.openstreetmap.org/' +
          feature.properties[property] +
          '">View in Open Street Map</a>';
      } else {
        content +=
          "<i>" + property + ":</i> " + feature.properties[property] + "<br>";
      }
    }
    content += "<br>" + osmLink;
    return content;
  }

  view(geoJSON) {
    L.DomEvent._fakeStop = L.DomEvent.fakeStop;

    var bounds = L.latLngBounds([]);
    /* L.geoJSON(geoJSON.features, {
     *   onEachFeature: this.onEachFeature.bind(this, bounds),
     *   style: this.getFeatureStyle.bind(this),
     * }).addTo(this.map); */

    var highlight;
    var clearHighlight = function () {
      if (highlight) {
        vectorGrid.resetFeatureStyle(highlight);
      }
      highlight = null;
    };

    var self = this;

    var vectorGrid = L.vectorGrid
      .slicer(geoJSON, {
        rendererFactory: L.canvas.tile,
        vectorTileLayerStyles: {
          sliced: (properties, zoom) =>
            this.getFeatureStyle({ properties: properties }),
        },
        interactive: true,
        getFeatureId: function (f) {
          return f.properties.id;
        },
        maxZoom: 24, // max zoom to preserve detail on; can't be higher than 24
        tolerance: 10, // simplification tolerance (higher means simpler)
        extent: 4096, // tile extent (both width and height)
        buffer: 64, // tile buffer on each side
        debug: 0, // logging level (0 to disable, 1 or 2)
        lineMetrics: false, // whether to enable line metrics tracking for LineString/MultiLineString features
        promoteId: null, // name of a feature property to promote to feature.id. Cannot be used with `generateId`
        generateId: false, // whether to generate feature ids. Cannot be used with `promoteId`
        indexMaxZoom: 10, // max zoom in the initial tile index
        indexMaxPoints: 100000, // max number of points per tile in the index
      })
      .on("click", function (e) {
        var properties = e.layer.properties;
        L.popup()
          .setLatLng(e.latlng)
          .setContent(self.getPopupContent({ properties: properties }))
          .openOn(self.map);
      })
      .on("mouseover", function (e) {
        var properties = e.layer.properties;
        clearHighlight();
        highlight = properties.id;

        var style = {
          opacity: 1,
          weight: 3,
        };

        vectorGrid.setFeatureStyle(properties.id, style);
      })
      .on("mouseout", function (e) {
        clearHighlight();
      })
      .addTo(this.map);

    /* this.map.on('click', clearHighlight); */

    var bbox = getBoundingBox(geoJSON);
    this.map.fitBounds([
      [bbox.yMin, bbox.xMin],
      [bbox.yMax, bbox.xMax],
    ]);
  }
}
function getBoundingBox(data) {
  var bounds = {},
    coordinates,
    point,
    latitude,
    longitude;
  for (var i = 0; i < data.features.length; i++) {
    coordinates = data.features[i].geometry.coordinates;
    var geoType = data.features[i].geometry.type;

    if (geoType === 'LineString') {
      for (var j = 0; j < coordinates.length; j++) {
        longitude = coordinates[j][0];
        latitude = coordinates[j][1];
        bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude;
        bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude;
        bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude;
        bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude;
      }
    } else if (geoType === 'Polygon') {
        for (var j = 0; j < coordinates[0].length; j++) {
          longitude = coordinates[0][j][0];
          latitude = coordinates[0][j][1];
          bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude;
          bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude;
          bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude;
          bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude;
        }
    }
  }
  return bounds;
}

export default Analysis;
