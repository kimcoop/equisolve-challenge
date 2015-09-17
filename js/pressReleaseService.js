/**
 * pressReleaseService.js
 */

require(['constants', 'jquery', 'tinyPubSub'], function(Constants) {
  'use strict';

  var query = function(offset) {
    offset = offset || 0; // Index is omitted initially
    var limit = Constants.QUERY_LIMIT_DEFAULT;
    var url = Constants.getPressReleaseQueryUrl(limit, offset);

    $.ajax({
      url: url,
      dataType: 'JSON',
      type: 'GET',
    }).done(function(response) {
      $.publish('pr:jsonLoadSuccess', response);
    });
  };

  $.subscribe('pr:query', function(event, data) {
    query(data.offset);
  });

});