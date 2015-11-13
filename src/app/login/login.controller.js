angular.module('easeApp')
.controller('LoginController', function($scope, AuthService, $mdDialog, $location) {
  
  $scope.login = function(){
    var data = { username: $scope.login.email, password: $scope.login.password };
    AuthService.login(data);
    return true;
  };
  
  $scope.signup = function(){
    var data = { username: $scope.signup.email, password: $scope.signup.password };
    return AuthService.register(data);
  };
  
  $scope.close = function() {
      $mdDialog.hide();
    };
  
  
}).factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
});
