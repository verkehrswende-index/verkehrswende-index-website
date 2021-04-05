import React, { useEffect, useState } from 'react';

const registeredAnalysis = {
  'radinfrastruktur': {
    'title': 'Radinfrastruktur',
  },
};

const Analysis = ( { area, analysis } ) => {
  console.log( area, analysis );
  const config = registeredAnalysis['radinfrastruktur'];

	useEffect(() => {
    var map = new Map('map');

		const opts = {
			headers: {
				// 'X-WP-Nonce': wpApiSettings.nonce,
			},
			method: 'GET',
		};
		fetch(
			`http://localhost:3000/areas/${encodeURIComponent(area)}/analysis/radinfrastruktur/features.json`,
			opts
		)
      .then( ( response ) => response.json() )
      .then( ( json ) => {  map.view(json);  } );
	}, []);

  return (
    <>
      <h1>{ config.title }</h1>
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

    this.map.setView(new L.LatLng(50.15,8.7), 13);
    this.map.addLayer(osm);
  }

  onEachFeature(feature, layer) {
    // console.log( feature );
    // does this feature have a property named popupContent?
    function highlightFeature(e) {
      var layer = e.target;

      layer

      layer.setStyle({
        weight: 25,
        color: '#ff3300',
        dashArray: '',
        fillOpacity: 0.7
      });

      if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
      }
    }

    function resetHighlight(e) {
      layer.setStyle({
        weight: 5,
        color: '#0000ff',
        dashArray: '',
        fillOpacity: 0.7
      });
    }

    layer.on({
      /* mouseover: highlightFeature, */
      /* mouseout: resetHighlight, */
      // click: zoomToFeature
    });

    if (feature.properties) {
      var content = '';
      if (feature.properties.name) {
        content += '<h2>' + feature.properties.name + '</h2><br>';
      }
      content += '<strong>Properties:</strong><br>';
      for(var property in feature.properties) {
        if (property === 'id') {
          content += '<a target="_blank" href="https://www.openstreetmap.org/'
            + feature.properties[property]
            + '">View in Open Street Map</a>';
        } else {
          content += '<i>' + property + ':</i> ' + feature.properties[property] + "<br>";
        }
      }
      layer.bindPopup(content);
    }
  }

  view(geoJSON) {
    for (const feature of geoJSON.features) {
      L.geoJSON(feature, {
        onEachFeature: this.onEachFeature.bind(this),
		    style: function (feature) {
          return {
            "color": feature.properties.category == 'good' ? "#00FF00" : ( feature.properties.category == 'acceptable' ? "#FFCC00" : ( feature.properties.category == 'car' ? "#FF0000" : "#FF00FF" ) ),
          };
		    },
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
    }
  };
}

export default Analysis;
