'use strict';

var typeToMaki = require('./type-to-maki');

// https://www.mapbox.com/maki-icons/
var DEFAULT_SYMBOL = 'marker';

function placeToFeature(place, options) {
  var symbol = typeToMaki[place.type] || DEFAULT_SYMBOL;

  return {
    type: 'Feature',
    properties: {
      name: place.scrubbed_name,
      title: place.scrubbed_name, // ?
      description: place.scrubbed_contact,
      'marker-color': '#000000',
      'marker-symbol': symbol,
      'marker-size': 'medium'
    },
    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(place.place.lng),
        parseFloat(place.place.lat)
      ]
    }
  };
}

function placesToFeatures(places, options) {
  return places.map(function(place) {
    return placeToFeature(place, options);
  });
}

function airbnbToGeoJSON(json, options) {
  options = options || {};

  return {
    type: 'FeatureCollection',
    features: placesToFeatures(json.place_recommendations, options)
  };
}

module.exports = airbnbToGeoJSON;
