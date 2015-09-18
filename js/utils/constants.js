/**
 * constants.js
 */

define(function() {
 'use strict';
    
  var Constants = {
    QUERY_LIMIT_DEFAULT: 2,
    ERROR_DEFAULT: 'We\'re sorry, but something went wrong.',
    SCROLL_BUFFER_PX: 200,

    getPressReleaseQueryUrl: function(limit, offset) {
      return 'http://www.stellarbiotechnologies.com/media/press-releases/json?offset=' + offset + '&limit=' + limit;
    }
  };

  return Constants;

});