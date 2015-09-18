/**
 * pressReleaseService.js
 */

require(['constants', 'jquery', 'tinyPubSub'], function(Constants) {
  'use strict';

  var query = function(data) {
    var offset = data.offset || 0, // Index is omitted initially
      limit = data.limit || Constants.QUERY_LIMIT_DEFAULT,
      url = Constants.getPressReleaseQueryUrl(limit, offset);

    $.ajax({
      url: url,
      dataType: 'JSON',
      type: 'GET',
    }).done(function(response) {
      $.publish('pr:jsonLoadSuccess', response);
    });
  };

  $.subscribe('pr:query', function(event, data) {
    query(data);
  });

});