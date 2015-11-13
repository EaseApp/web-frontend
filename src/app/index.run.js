(function() {
  'use strict';

  angular
    .module('easeApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $state, AuthService, AUTH_EVENTS, $log) {
    
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      AuthService.loadUserCredentials();
      if (!AuthService.isAuthenticated()) {
        console.log('Not authenticated');
        if (toState.name !== 'home') {
          event.preventDefault();
          $state.go('home');
        }
      }
    });

    $log.debug('runBlock end');
  }

})();
