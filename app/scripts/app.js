'use strict';

/**
 * @ngdoc overview
 * @name homeApp
 * @description
 * # homeApp
 *
 * Main module of the application.
 */
angular
  .module('homeApp', [
    'ngAnimate',
    'ui.router',
    'ngFileUpload'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        data: {
          requireLogin: false
        }
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about',
        data: {
          requireLogin: true
        }
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact',
        data: {
          requireLogin: true
        }
      })
      .state('upload', {
        url: '/upload',
        templateUrl: 'views/upload.html',
        controller: 'UploadCtrl',
        controllerAs: 'upload',
        data: {
          requireLogin: false
       }});

    $urlRouterProvider.otherwise('/');
  })
  .constant('HOST', 'http://localhost:8080')

  .service('HttpSvc', function($http, HOST) {
    this.getBoardList = function () {
      return $http({
        url: HOST + '/api/board',
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      });
    };
  });
