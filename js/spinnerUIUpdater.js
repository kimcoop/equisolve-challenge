/** 
 * spinnerUIUpdater.js
 * 
 */

require(['jquery', 'microtemplate', 'tinyPubSub'], function() {
  'use strict';

  $.subscribe('pr:query', function(event, data) {
    $('.icon-spinner').show();
  });

  $.subscribe('pr:jsonLoadSuccess', function(event, data) {
    $('.icon-spinner').hide();
  });

});