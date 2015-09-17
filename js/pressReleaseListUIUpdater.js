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