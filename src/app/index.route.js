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
        controllerAs: 'main'
      }).state('docs', {
        url: '/docs',
        templateUrl: 'app/docs/docs.html',
        controller: 'DocsController'
      }).state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardController'
      }).state('dashboard.userApp', {
        url: '/:app',
        templateUrl: 'app/userApp/userApp.html',
        controller: 'UserAppController'
      }).state('login', {
        url: '/login',
        controller: 'LoginController'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
