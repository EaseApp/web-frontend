angular.module('easeApp').controller('DashboardController',
['$scope',
'$mdDialog',
'$state',
'AuthService',
'AUTH_EVENTS',
'BASE_URL',
'$http',
function($scope,$state, $mdDialog, AuthService, AUTH_EVENTS, BASE_URL, $http){

  $scope.user = AuthService.user();
  
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event){
    AuthService.logout();
    $state.go('main');
    var alertPopup = alert('Session Lost! Please login again');
  });

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
  
  $scope.getApplications = function(){
    // $http.get(BASE_URL.localhost).success(function(response){
    //   console.log(response);
    //   });
      
      return [1,2,3,4,5];
  };

  $scope.logout = function(){
     return AuthService.logout();
  };

  function AddAppController($scope, $mdDialog) {
    $scope.close = function() {
      $mdDialog.hide();
    };
  }

}]);
