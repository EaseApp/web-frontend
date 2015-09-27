angular.module('easeApp').controller('MainController', ['$scope', '$mdSidenav', '$mdDialog', function($scope, $mdSidenav, $mdDialog){

  $(document).ready(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if($mdSidenav('left').isOpen()) {
        $mdSidenav('left').toggle();
      }
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          var position = target.position().top + $("md-content").scrollTop();
          $('#outer-wrapper').animate({
            scrollTop: position
          }, 1000);

          return false;
        }
      }
    });
  });

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.showSignupDialog = function(e) {
    $mdDialog.show({
      controller: SignUpController,
      templateUrl: 'app/templates/signup.html',
      targetEvent: e
    });
  };

  $scope.showLoginDialog = function(e) {
    $mdDialog.show({
      controller: LoginController,
      templateUrl: 'app/templates/login.html',
      parent: angular.element(document.body),
      targetEvent: e
    });
  };

  function SignUpController($scope, $mdDialog) {
    /*$scope.signup = {
      email: "dlar@g.com",
      password: ""
    };*/

    $scope.close = function() {
      $mdDialog.hide();
    };
  }

  function LoginController($scope, $mdDialog) {
    $scope.close = function() {
      $mdDialog.hide();
    };
  }
}]);
