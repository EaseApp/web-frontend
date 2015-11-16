angular.module('easeApp').controller('DashboardController',
['$scope',
'$state',
'$mdSidenav',
'$mdDialog',
'AuthService',
'AUTH_EVENTS',
'UrlService',
'$http',
function($scope, $state, $mdSidenav, $mdDialog, AuthService, AUTH_EVENTS, UrlService, $http){
  
  $scope.user = AuthService.user();
  $scope.applications = [];
  $scope.$watch('$scope.applications', function(){
    getApplications();
  });
  
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event, $mdToast){
    AuthService.logout();
    $state.go('main');
    $mdToast.show($mdToast.simple().content('Session Lost! Please login again'));
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
    var applicationsListUrl = UrlService+'/users/applications';
    $http.get(applicationsListUrl).success(function(response){
      $scope.applications = response;
    });
  };

  $scope.logout = function(){
     return AuthService.logout();
  };

  function AddAppController($scope, $mdDialog, $mdToast, $http, $state) {
    $scope.close = function() {
      $mdDialog.hide();
    };
    
     $scope.createApplication = function(){
       var createApplicationsUrl = UrlService+'/users/applications/'+$scope.appName;
       $http.post(createApplicationsUrl, {}).success(function(response){
         $mdToast.show($mdToast.simple().content($scope.appName + ' created!'));
         $scope.close();
         console.log(response);
         $state.go('dashboard.userApp', {name: response.name, token: response.app_token});
       });
       
    };
  }
  
  var init = function(){
    getApplications();
  };
  init();

}]);
