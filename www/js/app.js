// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services' , 'ngCordova', 'angularNumberPicker', 'ionic-toast'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }).
  config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('app', {
      url: "/app",

      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    }).
      state('map', {
        url: "/map",

        templateUrl: "templates/map.html",
        controller: 'mapCtrl'
      }).
      state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }).
      state('profile', {
        url: '/profile',
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }).
      state('ping', {
        url: '/ping',
        templateUrl: 'templates/ping.html',
        controller: 'PingCtrl'
      }).
      state('contact', {
        url: '/contact',
        templateUrl: 'templates/contact.html',
        controller: 'ContactCtrl'
      }).
      state('hospital', {
        url: '/hospital',
        templateUrl: 'templates/hospital.html',
        controller: 'HospitalCtrl'
      }).
      state('hospitalList', {
        url: '/hospitalList',
        templateUrl: 'templates/hospitalList.html',
        controller: 'HospitalListCtrl'
      });

    $urlRouterProvider.otherwise('/home');




  });
