/**
 * Created by eastflag on 2016-05-02.
 */
angular.module('homeApp')
  .controller('ContactCtrl', function ($scope) {
    $scope.message = "this is controller value";

    $scope.likeFunction = function(star) {
      alert("I like the book!, and gave " + star + " star.");
    };

  });
