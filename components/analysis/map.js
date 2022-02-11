import chroma from "chroma-js";
import getBoundingBox from "../../lib/geo/get-bounding-box.js";
import L from 'leaflet';
import "../../../../Leaflet.VectorGrid/dist/Leaflet.VectorGrid.bundled.min.js";
import 'leaflet/dist/leaflet.css';

export default class Map {
  constructor(mapid, mapSettings) {
    this.mapSettings = mapSettings;
    this.colorScale = chroma.scale('Spectral');
    this.unknownColor = "#FF00FF";
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
    this.addColorLegend();
  }

  addColorLegend() {
    const legend = L.control({position: 'bottomright'});
    legend.onAdd = (map) => {
      var div = L.DomUtil.create('div', 'feature-map__info feature-map__score-legend');
      var inner = "Punkte:<br><span>0</span>";
      inner += '<i style="width: 100px; background: linear-gradient(to right';
      for (var i = 0; i <= 1.0; i = i + 0.1) {
        inner += ',' + this.colorScale(i).hex();
      }
      inner += ')"></i><span>100</span><br>';
      inner += `<i style="width: 10px; background: ${this.unknownColor}"></i> `;
      inner += this.mapSettings.features.default.name;
      div.innerHTML = inner;
      return div;
    };
    legend.addTo(this.map);
  }

  getFeatureStyle({properties, zoom, dimension}, highlighted = false) {
    return {
      weight: highlighted ? 10 : ( dimension === 1 ? 3 : 5 ),
      opacity: 0.8,
      color: highlighted
           ? "#0000FF"
           : properties.score > 0
          ? this.colorScale(properties.score).hex()
        : this.unknownColor,
    };
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
          sliced: (properties, zoom, dimension) =>
          this.getFeatureStyle({ properties, zoom, dimension}),
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
