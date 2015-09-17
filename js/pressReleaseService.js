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