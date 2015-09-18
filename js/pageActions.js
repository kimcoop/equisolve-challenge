/**
 * pageActions.js
 */

require(['constants', 'jquery', 'tinyPubSub'], function(Constants) {
  'use strict';

  $(function() {

    $.publish('pr:query', {
      offset: 0,
      limit: 5
    }); // Fire initial query

    $(window).scroll(function() {
      var $window = $(window);
      if ($window.scrollTop() + $window.height() > $(document).height() - Constants.SCROLL_BUFFER_PX) {
        $.publish('pr:query', {
          offset: $('.pr-item').length
        });
      }
    });

  });

});