'use strict';

var Promise = require('bluebird');
var cheerio = require('cheerio');
var fetch = require('node-fetch');
fetch.Promise = Promise;

function extractFromURL(url) {
  return fetch(url)
    .then(function(res) {
      return res.text();
    })
    .then(function(body) {
      return extractFromHTML(body);
    });
}

function extractFromHTML(html) {
  return Promise.try(function() {
      var $ = cheerio.load(html);
      var $el = $('#_bootstrap-neighborhood_card');
      var text = $el.attr('content');
      return JSON.parse(text);
    });
}

module.exports = {
  extractFromURL: extractFromURL,
  extractromHTML: extractFromHTML
};
