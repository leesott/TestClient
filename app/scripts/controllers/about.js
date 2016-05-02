/**
 * Created by eastflag on 2016-05-02.
 */
angular.module('homeApp')
  .controller('AboutCtrl', function ($scope, HttpSvc) {
    $scope.getBoardList = function() {
      HttpSvc.getBoardList()
        .success(function (values, status, headers) {
          $scope.boardList = values;
        })
        .error(function(values, status) {

        });
    };

    $scope.getBoardList();
  });
