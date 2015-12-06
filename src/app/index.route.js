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
      }).state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardController',
        authenticate: true
      }).state('dashboard.userApp', {
        url: '/app?name&token',
        templateUrl: 'app/userApp/userApp.html',
        controller: 'UserAppController',
        authenticate: true
      });

    $urlRouterProvider.otherwise('/');
  }

})();
