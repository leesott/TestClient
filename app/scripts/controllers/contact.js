/**
 * Created by eastflag on 2016-05-02.
 */
angular.module('homeApp')
  .controller('ContactCtrl', function ($scope) {
    $scope.message = "this is controller value";

    $scope.likeFunction = function(star) {
      alert("I like the book!, and gave " + star + " star.");
    };

    $scope.expanders = [
      {title: 'Click me to expand',
        text: 'Hi there folks, I am the content that was hidden but is now shown.'},
      {title: 'Click this',
        text: 'I am even better text than you have seen previously'},
      {title: 'No, click me!',
        text: 'I am text that should be seen before seeing other texts'}
    ];

    //expander 한개짜리 테스트
    $scope.title = 'Click me to expand';
    $scope.text = 'Hi there folks, I am the content '
      + 'that was hidden but is now shown.';

  });
