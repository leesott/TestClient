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
        element.css('display', 'none'); //모든 앵규러 element는 jquery로 래핑되어있다.
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
 * 3
 * directive가 한개가 아니라 3개를 넣었기 때문에, 하나만 수정하면 나머지 3개가 모두 수정된다.
 * 부모로부터 상속된 scope를 사용했기 때문에 발생하는 문제,
 * 각각 동작하기 위해서 분리해야 한다.isolated scope로 scope: {} 추가
  */
  .directive("item", function() {
  return {
    restrict: 'E',
    scope: {}, //있을때와 없을때의 차이점 비교
    link: function(scope, element, attrs) {
      scope.name = attrs.name;
    },
    template: '<div><strong>Name:</strong> {{name}} <strong>Select Amount:</strong> <select name="count" ng-model="count"><option value="1">1</option><option value="2">2</option></select> <strong>Selected Amount:</strong> {{count}}</div>'
  }
})

  /**
   * 4-1
   * @ 는 단방향 바인딩
   */
.directive("notification", function() {
  return {
    restrict: 'E',
    scope: {
      message: '@' //template에 들어가있는 message라는 변수는 부모 속성의 message에서 가져와라
    },
    template: '<div class="alert alert-primary">{{message}}</div>'
  }
})

/**
 * 4-2
 * =  양방향 바인딩
 */
    .directive("bookComment", function() {
  return {
    restrict: 'E',
    scope: {
      text: '=' //template에 text라는 변수는 부모 컨트롤의 text에서 가져와서 양방향 바인딩을 하라.
    },
    template: '<input type="text" ng-model="text"/>'
  }
})

/**
 * 4-3
 * 메서드
 */
  .directive("likeBook", function() {
    return {
      restrict: 'E',
      scope: {
        like: '&'
      },
      template: '<input type="text" ng-model="starCount" placeholder="Enter rate count here"/><br/>' +
      '<input type="button" ng-click="like({star: starCount})" value="Like"/>'
      /*template: '<input type="button" ng-click="like()" value="Like"/>'*/
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

.directive('accordion', function() {
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    template: '<div ng-transclude></div>',
    controller: function() {
      var expanders = [];

      this.gotOpened = function(selectedExpander) {
        angular.forEach(expanders, function(expander) {
          if (selectedExpander != expander) {
            expander.showMe = false;
          }
        });
      }

      this.addExpander = function(expander) {
        expanders.push(expander);
        console.log('expander:' + expander.title);
        console.log('expander:' + expander.text); //없음
      }
    }
  }
})
.directive('expander', function(){
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    require: '^?accordion',
    scope: { title:'=expanderTitle' },
    template: '<div>' +
    '<div class="title" ng-click="toggle()">{{title}}</div>' +
    '<div class="body" ng-show="showMe" ng-transclude></div>' +
    '</div>',
    link: function(scope, element, attrs, accordionController) {  //scope는 현재 범의의 모든 변수
      scope.showMe = false;
      accordionController.addExpander(scope);

      scope.toggle = function toggle() {
        scope.showMe = !scope.showMe;
        accordionController.gotOpened(scope);
      }
    }
  }
})

.directive('expanderOne', function(){
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    scope: { title:'=expanderTitle' },
    template: /*'<div>' +
    '<div class="title">{{title}}</div>' +
    '<div class="body closed" ng-transclude></div>' +
    '</div>',*/
      '<div>' +
      '<div class="title" ng-click="toggle()">{{title}}</div>' +
      '<div class="body" ng-show="showMe" ng-transclude></div>' +
      '</div>',
    link: function(scope, element, attrs) {
      scope.showMe = false;

      scope.toggle = function toggle() {
        scope.showMe = !scope.showMe;
      }
/*      var titleElement = element.children().eq(0);
      var bodyElement = element.children().eq(1);

      titleElement.bind('click', toggle);

      function toggle() {
        bodyElement.toggleClass('closed');
      }*/
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
});
