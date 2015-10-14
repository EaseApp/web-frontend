angular.module('easeApp')
.controller('LoginController', function($scope, ClientService, $mdDialog, $location) {
  $scope.login = function(){
    var data = { username: $scope.login.email, password: $scope.login.password };
    ClientService.login(data);
    return true;
  };
  
  $scope.signup = function(){
    var data = { username: $scope.signup.email, password: $scope.signup.password };
    return ClientService.register(data);
  };
  
  $scope.close = function() {
      $mdDialog.hide();
    };
  
  
});
