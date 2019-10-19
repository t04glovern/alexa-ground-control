//
// Localized resources
//

const resources = {
  "en-US": {
    translation: {
      // intents/SpeedOption.js
      'SPEED_OPTION_NOT_FOUND': 'No speed option {0} was found.',
      'SPEED_CHANGED': 'Color changed to {0}.',
      'SPEED_CHANGE': 'Want to change the drone speed? Say: speed {0}',
      // intents/base/Help.js
      'HELP_FALLBACK': 'I wasn\'t able to understand your previous command.',
      'HELP_REPROMPT': 'Want to control the drone? say Change Speed',
      // intents/base/Launch.js
      'LAUNCH_WELCOME': 'Welcome to Drone Ground Controller. ',
      'LAUNCH_REPROMPT': 'Want to change the drone state? say Change Speed',
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
