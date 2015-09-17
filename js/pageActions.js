/**
 * pageActions.js
 */

require(['jquery', 'tinyPubSub'], function() {
  'use strict';

  $(function() {

    $.publish('pr:query', {
      offset: 0
    }); // Fire initial query

    // TODO - spinner

    $(document).click(function() {
      var offset = $('.pr-item').length;

      $.publish('pr:query', {
        offset: offset
      });
    });

  });

});