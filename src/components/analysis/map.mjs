import chroma from "chroma-js";
import getBoundingBox from "../../geo/get-bounding-box.mjs";
import "../../../../../Leaflet.VectorGrid/dist/Leaflet.VectorGrid.bundled.min.js";

export default class Map {
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

    var bbox = getBoundingBox(geoJSON.features);
    this.map.fitBounds([
      [bbox.yMin, bbox.xMin],
      [bbox.yMax, bbox.xMax],
    ]);
  }
}
