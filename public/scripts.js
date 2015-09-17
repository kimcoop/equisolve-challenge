/**
 * tinyPubSub.js
 *
 * jQuery Tiny Pub/Sub - v0.7 - 10/27/2011
 * http://benalman.com/
 * Copyright (c) 2011 "Cowboy" Ben Alman; Licensed MIT, GPL 
 */

define('tinyPubSub',['jquery'], function() {

  var o = $({});

  $.subscribe = function() {
    o.on.apply(o, arguments);
  };

  $.unsubscribe = function() {
    o.off.apply(o, arguments);
  };

  $.publish = function() {
    o.trigger.apply(o, arguments);
  };

});
/**
 * watchdog.js
 *
 * DEBUG ONLY: This utility is not intended to be 
 * used in production builds.
 */

define('watchdog',['jquery', 'tinyPubSub'], function() {
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
/**
 * pageActions.js
 */

require(['jquery', 'tinyPubSub'], function() {
  'use strict';

  $(function() {

    var offset = $('.pr-item').length;

    $.publish('pr:query', {
      offset: offset
    });

  });

});
define("pageActions", function(){});

/**
 * constants.js
 */

define('constants',[],function() {
 'use strict';
    
  var Constants = {
    QUERY_LIMIT_DEFAULT: 10,
    ERROR_DEFAULT: 'We\'re sorry, but something went wrong.',

    getPressReleaseQueryUrl: function(limit, offset) {
      return 'http://www.stellarbiotechnologies.com/media/press-releases/json?offset=' + offset + '&limit=' + limit;
    }
  };

  return Constants;

});
/**
 * pressReleaseService.js
 */

require(['constants', 'jquery', 'tinyPubSub'], function(Constants) {
  'use strict';

  var query = function(offset) {
    var offset = offset || 0; // Index is omitted initially
    var limit = Constants.QUERY_LIMIT_DEFAULT;

    var url = Constants.getPressReleaseQueryUrl(limit, offset);

    $.ajax({
      url: url,
      dataType: 'JSON',
      type: 'GET',
    }).done(function(response) {
      $.publish('pr:jsonLoadSuccess', response);
    }).fail(function(response) {
      // If we don't get a response, something went wrong,
      // so just let the user know there's an error
      $.publish('pr:jsonLoadError', {
        message: Constants.ERROR_DEFAULT
      });
    });
  };

  $.subscribe('pr:query', function(event, data) {
    query(data.offset);
  });

});
define("pressReleaseService", function(){});

/**
 * microtemplate.js
 * 
 * Simple JavaScript Templating
 * John Resig - http://ejohn.org/ - MIT Licensed
 */

(function() {
  var cache = {};
 
  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
     
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
       
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
       
        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
   
    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();
define("microtemplate", function(){});

/**
 * pressReleaseListUIUpdater.js
 */

require(['jquery', 'microtemplate', 'tinyPubSub'], function() {
  'use strict';

  $.subscribe('pr:jsonLoadSuccess', function(event, data) {
    $('.error-search').addClass('hidden'); // Ensure error display is hidden TODO

    var markup = data.news.map(function(prItem) {
      return tmpl('tmpl_prItem', prItem);
    }).join('');

    $('.pr-list').html(markup);
  });

});
define("pressReleaseListUIUpdater", function(){});

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
define("app", function(){});

