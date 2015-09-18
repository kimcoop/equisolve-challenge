/**
 * pageActions.js
 */

require(['constants', 'jquery', 'tinyPubSub'], function(Constants) {
  'use strict';

  var isQuerying = false;

  $(function() {

    $.publish('pr:query', {
      offset: 0,
      limit: 10
    }); // Fire initial query

    $(window).scroll(function() {
      var $window = $(window);
      if (isQuerying) {
        return;
      }
      if ($window.scrollTop() + $window.height() > $(document).height() - Constants.SCROLL_BUFFER_PX) {
        $.publish('pr:query', {
          offset: $('.pr-item').length
        });
        isQuerying = true;
      }
    });

  });

  $.subscribe('pr:jsonLoadSuccess', function(event, data) {
    isQuerying = false;
  });

});