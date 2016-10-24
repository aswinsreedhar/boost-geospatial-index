var boostbinding = require('bindings')('BoostSpatialIndex');

function BoostSpatialIndex() {
  return this;
}

/**
 * Adds a bounding box shape to the index
 *
 * @param {string} id - bounding box identifier
 * @param {Array<Number>} coordinates - [min_lat, min_lon, max_lat, max_lon]
 * @return {boolean}
 */
BoostSpatialIndex.prototype.addBoundingBox = function addBoundingBox(id, coordinates) {
  var idx;

  if (!id) {
    throw new Error('Missing "id" parameter');
  }

  if (!coordinates) {
    throw new Error('Missing "coordinates" parameter');
  }

  if (typeof id !== 'string' || id.length === 0) {
    throw new Error('Invalid "id" parameter: must be a non-empty string');
  }

  idx = coordinates.findIndex(v => typeof v !== 'number');

  if (typeof coordinates !== 'object' || !Array.isArray(coordinates) || coordinates.length !== 4 || idx !== -1) {
    throw new Error('Invalid "coordinates" parameter: must be an array containing numbers');
  }

  return boostbinding.addBBox(id, coordinates);
}

/**
 * Gets all shapes identifiers covering the provided coordinates
 *
 * @param {Number} lat
 * @param {Number} lon
 * @return {Array<string>}
 */
BoostSpatialIndex.prototype.queryPoint = function queryPoint(lat, lon) {
  if (!lat) {
    throw new Error('Missing lat parameter');
  }

  if (!lon) {
    throw new Error('Missing lon parameter');
  }

  if (typeof lat !== 'number' || typeof lon !== 'number') {
    throw new Error('lat and lon parameters must be numbers');
  }

  return boostbinding.queryPoint(lat, lon);
}

module.exports = BoostSpatialIndex;