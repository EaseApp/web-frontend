(function() {
  'use strict';

  angular
    .module('easeApp')
    .config(config);

  /** @ngInject */
  function config($logProvider, $mdThemingProvider, $locationProvider) {
    // Enable log
    $locationProvider.html5Mode(true);
    $logProvider.debugEnabled(true);
    $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('purple');

  };
})();
