const titleize = require('underscore.string/titleize')

// // // //

module.exports = function (label) {
  // Replaces all non letter & whitespace characters
  // Replaces all chains of whitespace to a single space each
  return titleize(label.replace(/[^a-zA-Z\s]/gi, '').replace(/\s\s+/g, ' '));
}
