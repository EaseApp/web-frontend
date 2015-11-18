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
  $scope.loading = true;
  $scope.applications = [];
  var initalLoad = true;

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
    }).then(function(){
      $scope.loading = false;
      if(initalLoad) {
        $scope.$watch('$scope.applications', function(){
          if(!initalLoad) {
            getApplications();
          }
          initalLoad = false;
        },true);
      }
    });
  };

  $scope.logout = function(){
     return AuthService.logout();
  };

  var addApplication = function(application){
    $scope.applications.push(application);
  };

  function AddAppController($scope, $mdDialog, $mdToast, $http, $state) {
    $scope.loading = false;
    $scope.close = function() {
      $mdDialog.hide();
    };

     $scope.createApplication = function(){
       $scope.loading = true;
       var createApplicationsUrl = UrlService+'/users/applications/'+$scope.appName;
       $http.post(createApplicationsUrl, {}).success(function(response){
         $mdToast.show($mdToast.simple().content($scope.appName + ' created!'));
         $scope.close();
         addApplication(response);
         $state.transitionTo('dashboard.userApp', {name: response.name, token: response.app_token}, {reload: true, inherit: false, notify: true});
       });
    };
  }

  var init = function(){
    getApplications();
  };
  init();

}]);
