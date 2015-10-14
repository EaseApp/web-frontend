/* global inject */
(function() {
  'use strict';

  describe('controllers', function(){
    
    var $controller;
    beforeEach(module('easeApp'));
    
    beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
      $controller = _$controller_;
    }));

    it('login() should return apiToken on sucess', function() {
      var $scope = {};
      var controller = $controller('LoginController', { $scope: $scope });
      expect($scope).toBeDefined("Controller should be defined");
      // expect($scope.ClientService.user.token).toEqual("12345678901234567", "$scope.login() should return string");
    });
    
    it('should return the correct token', function(){
      var $scope = {};
      $controller('LoginController', { $scope: $scope });
      
      
    });
      

  });
})();
