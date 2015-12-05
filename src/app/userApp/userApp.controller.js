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
  var app = new Ease(user.name, $stateParams.name, $stateParams.token, true);
  var baseUrl = UrlService;
  $scope.data = [];
  $scope.initialLoad = true;


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
        app.delete("/", null, {});
    });
    $scope.data = [];
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
        $state.go('dashboard', {}, {reload: true});
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


  $scope.collapseAll = function () {
    $scope.$broadcast('collapseAll');
  };

  $scope.expandAll = function () {
    $scope.$broadcast('expandAll');
  };

  var parseResponse = function(data){
    var arr = [];
    for(var prop in data){
      var object  = {};
      object.title = prop;
      if(typeof data[prop] == 'object'){
        object.children = parseResponse(data[prop]);
      } else {
        object.content = data[prop];
      }
      arr.push(object);
    }
    return arr;
  };

  var getData = function(){
    app.read("/", function(err, response){
      if(Object.keys(response).length > 0 && err == undefined){
        $scope.data = parseResponse(response);
      }
    });
  };

  var init = function(){
    getData();

    app.subscribe($stateParams.name);
    app.conn.onmessage = function(event){
      var data = JSON.parse(event.data);
      if (data["action"] != null){
       getData();
      }
    };
    $scope.$watch('$scope.data', function(){
      if(!$scope.initialLoad) {
        getData();
      }
      $scope.initialLoad = false;
    },true);



  };
  init();

}])
.run((['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams){
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]));

})()
