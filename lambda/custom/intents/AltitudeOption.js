"use strict";

const utils = require("../utils");

module.exports = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AltitudeIntent';
  },
  handle(handlerInput) {
    return new Promise((resolve, reject) => {
      const event = handlerInput.requestEnvelope;
      const res = require("../resources")(event.request.locale);
      const color = getAltitudeOption(event);

      let speechText;
      let reprompt;

      reprompt = res.strings.ALTITUDE_CHANGE.replace("{0}", color);

      utils.changeAltitudeOption(color, response => {
        if (!response) {
          speechText = res.strings.ALTITUDE_OPTION_NOT_FOUND.replace("{0}", color);
        } else {
          speechText = res.strings.ALTITUDE_CHANGED.replace("{0}", color);
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

function getAltitudeOption(event) {
  let altitudeOption;
  const altitudeOptionSlot =
    event.request.intent &&
    event.request.intent.slots &&
    event.request.intent.slots.AltitudeOption;

  if (altitudeOptionSlot && altitudeOptionSlot.value) {
    altitudeOption = altitudeOptionSlot.value;
  }
  return altitudeOption;
}
