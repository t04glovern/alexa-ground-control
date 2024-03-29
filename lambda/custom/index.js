
/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

// Base Intent Handlers
const Errors = require('./intents/base/Errors');
const Help = require('./intents/base/Help');
const Launch = require('./intents/base/Launch');
const SessionEnd = require('./intents/base/SessionEnd');
const Stop = require('./intents/base/Stop');

// Custom Intents
const AltitudeOption = require('./intents/AltitudeOption');
const WaypointOption = require('./intents/WaypointOption');

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    Help,         // Base intents
    Launch,
    SessionEnd,
    Stop,
    AltitudeOption,   // Custom Intents
    WaypointOption
  )
  .addErrorHandlers(Errors)
  .lambda();
