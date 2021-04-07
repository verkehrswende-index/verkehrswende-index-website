import React, { useEffect, useState } from 'react';

const registeredAnalysis = {
  'radinfrastruktur': {
    'title': 'Radinfrastruktur',
  },
};

const Analysis = ( { area, analysis } ) => {
  console.log( area, analysis );
  const config = registeredAnalysis['radinfrastruktur'];


  const [data, setData] = useState(null);

	useEffect(() => {
    var map = new Map('map');

		fetch(
			`http://localhost:3000/areas/${encodeURIComponent(area)}/analysis/bike_infrastructure/features.json`,
		)
      .then( ( response ) => response.json() )
      .then( ( json ) => {  map.view(json);  } );

		fetch(
			`http://localhost:3000/areas/${encodeURIComponent(area)}/analysis/bike_infrastructure/results.json`,
		)
      .then( ( response ) => response.json() )
      .then( ( json ) => {  console.log('gotit', json); setData(json);  } );

	}, []);

  var items = data !== null ? Object.keys(data).map( key => {
    console.log(key);
    return <p>{key}: {data[key]}</p>
  }) : [];

  console.log(data);
  console.log(items);

  return (
    <>
      <h1>{ config.title }</h1>
      <p>
        Items:
      { items  }
      </p>
      <div id="map"></div>
    </>
  );
};

class Map {
  constructor(mapid) {
    this.map = new L.Map(mapid);

    var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
    var overpassAttrib = 'POI via <a href="http://www.overpass-api.de/">Overpass API</a>';

    var osm = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 20, attribution: [osmAttrib, overpassAttrib].join(',')});

    this.map.addLayer(osm);
  }

  getFeatureStyle(feature,highlighted=false) {
    return {
      weight: highlighted ? 10 : 3,
      opacity: 0.6,
      "color": highlighted ? '#0000FF' : feature.properties.category == 'good' ? "#00FF00" : ( feature.properties.category == 'acceptable' ? "#FFCC00" : ( feature.properties.category == 'car' ? "#FF0000" : "#FF00FF" ) ),
    };
  }

  onEachFeature(bounds, feature, layer) {
    var layerBounds = layer.getBounds();
    bounds.extend(layerBounds);

    layer.on({
      mouseover: () => layer.setStyle(this.getFeatureStyle(feature,true)),
      mouseout: () => layer.setStyle(this.getFeatureStyle(feature)),
    });

    if (feature.properties) {
      var content = '';
      if (feature.properties.name) {
        content += '<h2>' + feature.properties.name + '</h2><br>';
      }
      content += '<strong>Werte:</strong><br>';
      for(var property in feature.properties) {
        if (property === 'id') {
          var osmLink = '<a target="_blank" href="https://www.openstreetmap.org/'
            + feature.properties[property]
            + '">View in Open Street Map</a>';
        } else {
          content += '<i>' + property + ':</i> ' + feature.properties[property] + "<br>";
        }
      }
      content += '<br>' + osmLink;

      layer.bindPopup(content);
    }
  }

  view(geoJSON) {
    var bounds = L.latLngBounds([]);
    L.geoJSON(geoJSON.features, {
      onEachFeature: this.onEachFeature.bind(this, bounds),
      style: this.getFeatureStyle.bind(this),
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 8,
          fillColor: "#ff7800",
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        });
      }
    }).addTo(this.map);
    this.map.fitBounds(bounds);
  };
}

export default Analysis;
