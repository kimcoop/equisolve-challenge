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