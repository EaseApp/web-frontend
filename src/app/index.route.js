(function() {
  'use strict';

  angular
    .module('easeApp')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        authenticate: true
      }).state('docs', {
        url: '/docs',
        templateUrl: 'app/docs/docs.html',
        controller: 'DocsController',
        authenticate: false
      }).state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardController',
        authenticate: true
      }).state('dashboard.userApp', {
        url: '/app',
        params: {name: null, token: null},
        templateUrl: 'app/userApp/userApp.html',
        controller: 'UserAppController',
        authenticate: true
      }).state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'app/login/login.html',
        authenticate: false
      });

    $urlRouterProvider.otherwise('/');
  }

})();
