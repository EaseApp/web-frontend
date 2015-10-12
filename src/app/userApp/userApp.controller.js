angular.module('easeApp').controller('UserAppController',
['$scope',
'$mdDialog',
'$stateParams',
function($scope, $mdDialog,$stateParams){
  $scope.app =  {
    name : $stateParams.app
  };

}]);
