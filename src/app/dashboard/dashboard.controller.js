angular.module('easeApp').controller('DashboardController',
['$scope',
'$state',
'$mdSidenav',
'$mdDialog',
'AuthService',
'AUTH_EVENTS',
'BASE_URL',
'$http',
function($scope, $state, $mdSidenav, $mdDialog, AuthService, AUTH_EVENTS, BASE_URL, $http){
  
  var baseUrl = BASE_URL.localhost;

  $scope.user = AuthService.user();
  
  $scope.applications = [];
  
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
  
  var getApplications = function(){
    var applicationsListUrl = baseUrl+'/users/applications';
    $http.get(applicationsListUrl).success(function(response){
      $scope.applications = response;
    });
  };

  $scope.logout = function(){
     return AuthService.logout();
  };

  function AddAppController($scope, $mdDialog, $http) {
    $scope.close = function() {
      $mdDialog.hide();
    };
    
     $scope.createApplication = function(){
       var createApplicationsUrl = baseUrl+'/users/applications/'+$scope.appName;
      //  $http.post(createApplicationsUrl)
       
    };
  }
  
  var init = function(){
    getApplications();
  };
  init();

}]);
