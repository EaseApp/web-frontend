angular.module('easeApp').controller('DashboardController',
['$scope',
'$mdDialog',
'ClientService',
function($scope, $mdDialog, ClientService){

  $scope.user = ClientService.user;

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.showAddApp = function(e) {
    $mdDialog.show({
      controller: AddAppController,
      templateUrl: 'app/templates/addApp.html',
      clickOutsideToClose: true,
      targetEvent: e
    });
  };

  $scope.logout = function(){
     return ClientService.logout();
  };

  function AddAppController($scope, $mdDialog) {
    $scope.close = function() {
      $mdDialog.hide();
    };
  }

}]);
