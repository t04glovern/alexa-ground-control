//
// Utility functions
//

"use strict";

const request = require("request");
const config = require("./config");

module.exports = {
  changeAltitudeOption: function (altitude_option, callback) {

    var options = {
      method: 'POST',
      url: `${config.url}/altitude`,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json'
      },
      body: {
        'altitude_change': altitude_option
      },
      json: true
    };

    request(options, function (error, response, body) {
      if (error) {
        callback();
      }
      callback(response);
    });
  },
  changeWaypointOption: function (waypoint, callback) {

    var options = {
      method: 'POST',
      url: `${config.url}/waypoint`,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json'
      },
      body: {
        'go_waypoint': waypoint
      },
      json: true
    };

    request(options, function (error, response, body) {
      if (error) {
        callback();
      }
      callback(response);
    });
  }
}
