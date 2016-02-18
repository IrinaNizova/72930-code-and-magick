/**
 * Created by ira on 17.02.16.
 */
'use strict';

(function() {
  window.inherit = function(child, parent) {
    function emptyCtor() {};
	emptyCtor.prototype = parent.prototype;
	child.prototype = new emptyCtor();
  }
})();