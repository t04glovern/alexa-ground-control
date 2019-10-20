"use strict";

const utils = require("../utils");

module.exports = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'WaypointIntent';
  },
  handle(handlerInput) {
    return new Promise((resolve, reject) => {
      const event = handlerInput.requestEnvelope;
      const res = require("../resources")(event.request.locale);
      const waypoint = getWaypointOption(event);

      let speechText;
      let reprompt;

      reprompt = res.strings.WAYPOINT_CHANGE.replace("{0}", waypoint);

      utils.changeWaypointOption(waypoint, response => {
        if (!response) {
          speechText = res.strings.WAYPOINT_OPTION_NOT_FOUND.replace("{0}", waypoint);
        } else {
          speechText = res.strings.WAYPOINT_CHANGED.replace("{0}", waypoint);
        }

        const responseHandle = handlerInput.responseBuilder
          .speak(speechText)
          .reprompt(reprompt)
          .getResponse();
        resolve(responseHandle);
      })
    });
  }
}

function getWaypointOption(event) {
  let waypointOption;
  const waypointOptionSlot =
    event.request.intent &&
    event.request.intent.slots &&
    event.request.intent.slots.WaypointOption;

  if (waypointOptionSlot && waypointOptionSlot.value) {
    waypointOption = waypointOptionSlot.value;
  }
  return waypointOption;
}
