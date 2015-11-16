angular.module('easeApp').controller('DocsController', ['$scope', '$mdSidenav', '$mdDialog', 'AuthService', function($scope, $mdSidenav, $mdDialog, AuthService) {

  $scope.user = AuthService.user();

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.showSignupDialog = function(e) {
    $mdDialog.show({
      controller: 'LoginController',
      templateUrl: 'app/login/signup.html',
      clickOutsideToClose: true,
      parent: angular.element(document.body),
      targetEvent: e
    });
  };

  $scope.showLoginDialog = function(e) {
    $mdDialog.show({
      controller: 'LoginController',
      templateUrl: 'app/login/login.html',
      clickOutsideToClose: true,
      parent: angular.element(document.body),
      targetEvent: e
    });
  };

  $scope.logout = function(){
     return AuthService.logout();
  };
}]);
