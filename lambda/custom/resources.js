//
// Localized resources
//

const resources = {
  "en-US": {
    translation: {
      // intents/AltitudeOption.js
      'ALTITUDE_OPTION_NOT_FOUND': 'Value {0} for altitude is not valid.',
      'ALTITUDE_CHANGED': 'Altitude changed to {0}.',
      'ALTITUDE_CHANGE': 'Want to change the drone altitude? Say: set altitude to 200',
      // intents/WaypointOption.js
      'WAYPOINT_OPTION_NOT_FOUND': 'No waypoint {0} was found.',
      'WAYPOINT_CHANGED': 'Navigating to {0}.',
      'WAYPOINT_CHANGE': 'Want to navigate to a waypoint? Say: navigate to {0}',
      // intents/base/Help.js
      'HELP_FALLBACK': 'I wasn\'t able to understand your previous command.',
      'HELP_REPROMPT': 'Want to control the drone? say go to alpha',
      // intents/base/Launch.js
      'LAUNCH_WELCOME': 'Welcome to Drone Ground Controller. ',
      'LAUNCH_REPROMPT': 'Want to change the drone state? say navigate to alpha',
      // intents/base/Stop.js
      'EXIT_SKILL': 'Goodbye!',
    }
  }
};

const utils = locale => {
  let translation;
  if (resources[locale]) {
    translation = resources[locale].translation;
  } else {
    // Default to en-US
    translation = resources["en-US"].translation;
  }

  return {
    strings: translation
  };
};

module.exports = utils;
