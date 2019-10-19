//
// Utility functions
//

"use strict";

const request = require("request");

module.exports = {
  changeSpeedOption: function (speed_option, callback) {

    var options = {
      method: 'POST',
      url: 'https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/speed',
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json'
      },
      body: {
        'speed_option': speed_option
      },
      json: true
    };

    request(options, function (error, response, body) {
      if (error) {
        callback();
      }
      callback(body.status);
    });
  }
}
