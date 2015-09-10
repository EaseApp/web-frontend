
var app = angular.module('easeApp', []);

app.controller('HomePage',function(){
  $scope.hello = function(){
    alert('Hello World');
  };
});
