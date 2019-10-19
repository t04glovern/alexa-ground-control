"use strict";

const utils = require("../utils");

module.exports = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'SpeedOptionIntent';
  },
  handle(handlerInput) {
    return new Promise((resolve, reject) => {
      const event = handlerInput.requestEnvelope;
      const res = require("../resources")(event.request.locale);
      const color = getSpeedOption(event);

      let speechText;
      let reprompt;

      reprompt = res.strings.SPEED_CHANGE.replace("{0}", color);

      utils.changeSpeedOption(color, response => {
        if (!response) {
          speechText = res.strings.SPEED_OPTION_NOT_FOUND.replace("{0}", color);
        } else {
          speechText = res.strings.SPEED_CHANGED.replace("{0}", color);
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

function getSpeedOption(event) {
  let speedOption;
  const speedOptionSlot =
    event.request.intent &&
    event.request.intent.slots &&
    event.request.intent.slots.SpeedOption;

  if (speedOptionSlot && speedOptionSlot.value) {
    speedOption = speedOptionSlot.value;
  }
  return speedOption;
}
