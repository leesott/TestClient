/**
 * Created by eastflag on 2016-05-02.
 * 참고 자료
 * http://blog.byunghyun.me/?p=144
 */
angular
  .module('homeApp')

.directive("restricted", function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      // Some auth check function
      //var isAuthorized = checkAuthorization();
      var isAuthorized = false;
      if (!isAuthorized) {
        element.css('display', 'none');
      }
    }
  }
})

.directive("user", function() {
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      scope.username = attrs.username;
      scope.avatar = attrs.avatar;
      scope.reputation = attrs.reputation;
    },
    template: '<div>Username: {{username}}, Avatar: {{avatar}}, Reputation: {{reputation}}</div>'
  }
})

/**
 * directive가 한개가 아니라 3개를 넣었기 때문에, 하나만 수정하면 나머지 3개가 모두 수정된다.
 * 부모로부터 상속된 scope를 사용했기 때문에 발생하는 문제,
 * 각각 동작하기 위해서 분리해야 한다.isolated scope로 scope: {} 추가
  */
  .directive("item", function() {
  return {
    restrict: 'E',
    scope: {},
    link: function(scope, element, attrs) {
      scope.name = attrs.name;
    },
    template: '<div><strong>Name:</strong> {{name}} <strong>Select Amount:</strong> <select name="count" ng-model="count"><option value="1">1</option><option value="2">2</option></select> <strong>Selected Amount:</strong> {{count}}</div>'
  }
})

  /**
   * @ 는 부모의 scope로 부터의 변수 값을 주입반는다. call by value
   */
    .directive("notification", function() {
  return {
    restrict: 'E',
    scope: {
      message: '@'
    },
    template: '<div class="alert">{{message}}</div>'
  }
})

/**
 * 변수 자체를 주입받는다. call by reference
 */
    .directive("bookComment", function() {
  return {
    restrict: 'E',
    scope: {
      text: '='
    },
    template: '<input type="text" ng-model="text"/>'
  }
})

/**
 * 상호 작용
 */
  .directive("likeBook", function() {
    return {
      restrict: 'E',
      scope: {
        like: '&'
      },
      template: '<input type="text" ng-model="starCount" placeholder="Enter rate count here"/><br/>' +
      '<input type="button" ng-click="like({star: starCount})" value="Like"/>'
    }
  })


/**
 * controller 상속 테스트
 */
.directive('mouseClicked', function() {
  return {
    restrict: 'E',
    scope: {},
    controller: "MouseClickedCtrl as mouseClicked"
  }
})
.directive('ebook', function() {
  return {
    require: "mouseClicked",
    link: function(scope, element, attrs, MouseClickedCtrl) {
      MouseClickedCtrl.setBookType("EBOOK");
    }
  }
})
.directive('magazine', function() {
  return {
    require: "mouseClicked",
    link: function(scope, element, attrs, MouseClickedCtrl) {
      MouseClickedCtrl.setBookType("MAGAZINE");
    }
  }
})

/**
 * test 용 코드
  */
  .directive('booktest', function() {
  return {
    restrict: 'E',
    scope: {
      title: '@'
    },
    replace: true,
    template: '<div>{{title}}</div>',
    link: function(scope, element, attrs) {
      element.bind("click", function() {
        console.log("book viewed!");
        scope.viewed = true;
      });
    }
  }
})
