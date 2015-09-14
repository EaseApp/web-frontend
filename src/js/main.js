var angular = require('angular');
var app = angular.module('easeApp', []);

// app.config(function($routeProvider){
//   $routeProvider
//     .when('/', {
//       templateUrl: 'home.html',
//       controller: 'HomeController'
//     });
// });

app.controller('HomeController',function($scope){
  $scope.hello = function(){
    alert('Hello World');
  };
});
