/**
 * Created by ira on 18.02.16.
 */
'use strict';

define(function() {
  var Photo = function(src) {
    var picture = new Image();
    picture.height = 300;
    picture.src = src;
    return picture;
  };

  return Photo;
});
