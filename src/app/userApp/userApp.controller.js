(function(){
'use strict';

angular.module('easeApp').controller('UserAppController',
['$scope',
'$mdDialog',
'$stateParams',
'AuthService',
'$http',
'$state',
'UrlService',
function($scope, $mdDialog, $stateParams, AuthService, $http, $state, UrlService){
  $scope.app =  $stateParams;
  var user = AuthService.user();
  var app = new Ease(user.name, $stateParams.name, $stateParams.token);
  var baseUrl = UrlService;
  $scope.data = [];

  $scope.showConfirmClear = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Are you sure you want to clear this app\'s data?')
          .content('All data will be deleted.')
          .ariaLabel('Clear App')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('Cancel')
          .clickOutsideToClose(true);
    $mdDialog.show(confirm).then(function() {
        // Clear application (Call delete on root path to clear the application)
        app.delete("/", null);
    });
  };

  $scope.showConfirmDelete = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete this app?')
          .content('Everything will be deleted.')
          .ariaLabel('Delete App')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('Cancel')
          .clickOutsideToClose(true);
    $mdDialog.show(confirm).then(function() {
      $http.defaults.headers.common['Authorization'] = AuthService.user().token;
      $http.delete(baseUrl+'/users/applications/'+$stateParams.name).success(function(response){
        $state.go('dashboard');
      });
    });
  };

  $scope.remove = function (scope) {
    scope.remove();
  };

  $scope.toggle = function (scope) {
    scope.toggle();
  };

  $scope.moveLastToTheBeginning = function () {
    var a = $scope.data.pop();
    $scope.data.splice(0, 0, a);
  };

  $scope.newSubItem = function (scope) {
    var nodeData = scope.$modelValue;
    nodeData.nodes.push({
      id: nodeData.id * 10 + nodeData.nodes.length,
      title: nodeData.title + '.' + (nodeData.nodes.length + 1),
      nodes: []
    });
  };

  $scope.collapseAll = function () {
    $scope.$broadcast('collapseAll');
  };

  $scope.expandAll = function () {
    $scope.$broadcast('expandAll');
  };

  var init = function(){
    app.read("/", function(err,response){
      console.log(err);
      console.log(response);
      $scope.data.push(response);
    });

  };
  init();

}])
.run((['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams){
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]));

})()
