(function() {
  'use strict';

  angular
    .module('easeApp')
    .config(config);

  /** @ngInject */
  function config($logProvider, $mdThemingProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
    $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('purple');

  };
})();
