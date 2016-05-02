/**
 * Created by eastflag on 2016-05-02.
 */
angular
  .module('homeApp')
.controller('MouseClickedCtrl', function($element) {
  var mouseClicked = this;

  mouseClicked.bookType = null;

  mouseClicked.setBookType = function(type) {
    mouseClicked.bookType = type
  };

  $element.bind("click", function() {
    alert("Typeof book: " + mouseClicked.bookType + " sent for statistical analysis!");
  })
});

