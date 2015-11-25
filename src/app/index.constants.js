/* global malarkey:false, toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('easeApp')
   .constant('AUTH_EVENTS', {
      notAuthenticated: 'auth-not-authenticated',
      notAuthorized: 'auth-not-authorized'
    })
    .constant('BASE_URL', {
      localhost: 'http://localhost:3001',
      prod: 'http://ease-62q56ueo.cloudapp.net:3001',
      prodLocal: 'http://localhost:3001'
    });

})();
