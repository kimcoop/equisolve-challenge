/**
 * watchdog.js
 *
 * DEBUG ONLY: This utility is not intended to be 
 * used in production builds.
 */

define(['jquery', 'tinyPubSub'], function() {
  'use strict';

  var events = [
    'pr:jsonLoadError',
    'pr:jsonLoadSuccess',
    'pr:query',
  ];

  var subscribe = function(eventName) {
    $.subscribe(eventName, function(event, data) {
      console.groupCollapsed(eventName);
      console.log(data);
      console.groupEnd();
    });
  };
  
  for (var i = 0, len = events.length; i < len; i++) {
    subscribe(events[i]);
  }

  console.log('Watchdog watching!', events);

});