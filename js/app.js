/**
 * app.js
 *
 * Main entry point for requireJS. 
 * Configure paths for common libs/utils,
 * to allow shorthand dependency references
 * (eg 'tinyPubSub' instead of 'libs/tinyPubSub')
 *
 * Third party dependencies (jQuery) go in libs/
 */
require.config({
  paths: {
    jquery: 'https://code.jquery.com/jquery-2.1.4.min',
    microtemplate: 'libs/microtemplate',
    tinyPubSub: 'libs/tinyPubSub',
    constants: 'utils/constants',
    watchdog: 'utils/watchdog',
  }
});

// Modules to load go here
require([
  'watchdog',
  'pageActions',
  'pressReleaseService',
  'pressReleaseListUIUpdater'
]);