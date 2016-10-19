'use strict';

var extractAirbnbInfo = require('../lib/extract-airbnb-info');
var airbnbToGeoJSON = require('../lib/airbnb-to-geojson');

function runScript(run) {
  run()
    .then(function() {
    })
    .catch(function(err) {
      console.error(err);
      console.error(err.stack);
      process.exit(1);
    });
}

runScript(function() {
  var url = process.argv[2];

  return extractAirbnbInfo.extractFromURL(url)
    .then(function(json) {
      return airbnbToGeoJSON(json);
    })
    .then(function(geoJSON) {
      console.log(JSON.stringify(geoJSON, null, 2));
    });
});
