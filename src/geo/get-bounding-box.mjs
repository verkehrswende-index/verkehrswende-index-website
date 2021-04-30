/**
 * Implementation of getBoundingBox.
 */

/**
 * Enlarges the bounding box for given coordinates if needed.
 *
 * @param {Object} bounds The bounding box.
 * @param {float} longitude
 * @param {float} latitude
 * @returns {Object} The possibly enlarged bounding box.
 */
function fitBounds(bounds, longitude, latitude) {
  bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude;
  bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude;
  bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude;
  bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude;
  return bounds;
}

/**
 * Calculates the bounding box for given features.
 *
 * @param {Object[]} features
 * @returns {Object} The bounding box.
 */
export default function getBoundingBox(features) {
  var bounds = {};
  for (var i = 0; i < features.length; i++) {
    const coordinates = features[i].geometry.coordinates;
    const geoType = features[i].geometry.type;
    if (geoType === 'Point') {
      bounds = fitBounds(bounds,coordinates[0], coordinates[1]);
    } else if (geoType === 'LineString') {
      for (var j = 0; j < coordinates.length; j++) {
        bounds = fitBounds(bounds,coordinates[j][0], coordinates[j][1]);
      }
    } else if (geoType === 'Polygon') {
      for (var j = 0; j < coordinates[0].length; j++) {
        bounds = fitBounds(bounds,coordinates[0][j][0], coordinates[0][j][1]);
      }
    }
  }
  return bounds;
}
