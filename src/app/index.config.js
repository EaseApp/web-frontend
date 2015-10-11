(function() {
  'use strict';

  angular
    .module('easeApp')
    .config(config);

  /** @ngInject */
  function config($logProvider, $mdThemingProvider, $locationProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
    $locationProvider.html5Mode(true);
    $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('purple');

  };
})();
