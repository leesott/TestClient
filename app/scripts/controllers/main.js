'use strict';

/**
 * @ngdoc function
 * @name homeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the homeApp
 */
angular.module('homeApp')
  .controller('MainCtrl', function ($scope) {
    $scope.todos = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
