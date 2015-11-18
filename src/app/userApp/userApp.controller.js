angular.module('easeApp').controller('UserAppController',
['$scope',
'$mdDialog',
'$stateParams',
'AuthService',
'$http',
function($scope, $mdDialog, $stateParams, AuthService, $http){
  $scope.app =  $stateParams;
  var user = AuthService.user();
  var app = new Ease(user.name, $stateParams.name, $stateParams.token);

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
      // $http
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
  
  $scope.data = function(){
    var response = app.read("/users");
    return [JSON.parse(response)];
  };

  // $scope.data = [{
  //   'id': 1,
  //   'title': 'node1',
  //   'nodes': [
  //     {
  //       'id': 11,
  //       'title': 'node1.1',
  //       'nodes': [
  //         {
  //           'id': 111,
  //           'title': 'node1.1.1',
  //           'nodes': []
  //         }
  //       ]
  //     },
  //     {
  //       'id': 12,
  //       'title': 'node1.2',
  //       'nodes': []
  //     }
  //   ]
  // }, {
  //   'id': 2,
  //   'title': 'node2',
  //   'nodrop': true, // An arbitrary property to check in custom template for nodrop-enabled
  //   'nodes': [
  //     {
  //       'id': 21,
  //       'title': 'node2.1',
  //       'nodes': []
  //     },
  //     {
  //       'id': 22,
  //       'title': 'node2.2',
  //       'nodes': []
  //     }
  //   ]
  // }, {
  //   'id': 3,
  //   'title': 'node3',
  //   'nodes': [
  //     {
  //       'id': 31,
  //       'title': 'node3.1',
  //       'nodes': []
  //     }
  //   ]
  // }];

}])
.run((['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams){
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]));
