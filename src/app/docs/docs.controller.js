angular.module('easeApp').controller('DocsController', ['$scope', 'AuthService', function($scope, AuthService) {
  $scope.user = AuthService.user();

  $scope.logout = function(){
     return AuthService.logout();
  };
}]);
