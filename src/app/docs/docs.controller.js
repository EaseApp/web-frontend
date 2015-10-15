angular.module('easeApp').controller('DocsController', ['$scope', 'ClientService', function($scope, ClientService) {
  $scope.user = ClientService.user;

  $scope.logout = function(){
     return ClientService.logout();
  };
}]);
