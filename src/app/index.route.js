(function() {
  'use strict';

  angular
    .module('easeApp')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      }).state('docs', {
        url: '/docs',
        templateUrl: 'docs/docs.html',
        controller: 'DocsController'
      }).state('dashboard', {
        url: '/dashboard',
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardController'

      }).state('login', {
        url: '/login',
        controller: 'LoginController'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
