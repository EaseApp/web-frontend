(function() {
  'use strict';

  angular
    .module('easeApp')
    .config(['$urlMatcherFactoryProvider', '$logProvider', '$mdThemingProvider', '$locationProvider', config]);

  /** @ngInject */
  function config($urlMatcherFactory, $logProvider, $mdThemingProvider, $locationProvider, $urlRouterProvider) {
    // Enable log
    $locationProvider.html5Mode(true);
    $logProvider.debugEnabled(true);
    $locationProvider.html5Mode(true);
    $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('purple');
    
    $urlMatcherFactory.type('AppParam',
    {
      name : 'AppParam',
      decode: function(val)  { return typeof(val) ==="string" ? JSON.parse(val) : val;},
      encode: function(val)  { return JSON.stringify(val); },
      equals: function(a, b) { return this.is(a) && this.is(b) && a.name === b.name && a.id === b.id; },
      is: function(val)      { return angular.isObject(val) && "status" in val && "type" in val; },
    });
  };
})();
