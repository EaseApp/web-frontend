angular.module('easeApp')
.controller('LoginController', function($scope, $http) {
  $scope.login = function(){
    var data = { username: $scope.login.email, password: $scope.login.password };
    $http.post("http://localhost:3000/users/sign_in", data)
      .then(function(response){
        if (response.status == 200){
          console.log("Sucess");
        } else {
          console.log("Failed");
        }
      })
  }
});
