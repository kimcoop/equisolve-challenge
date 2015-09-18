/**
 * pressReleaseListUIUpdater.js
 */

require(['jquery', 'microtemplate', 'tinyPubSub', 'dateFormat'], function() {
  'use strict';

  var getFormattedDate = function(rawDate) {
    var publishDate = new Date(rawDate);
    return publishDate.formatDate("hh:mmt on MM/dd/yyyy");
  };

  $.subscribe('pr:jsonLoadSuccess', function(event, data) {
    var markup = data.news.map(function(prItem) {
      prItem.publishDate = getFormattedDate(prItem.published);
      return tmpl('tmpl_prItem', prItem);
    }).join('');

    $('.pr-list').append(markup);
  });

});