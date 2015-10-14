angular.module('easeApp').controller('MainController', ['$scope', '$mdSidenav', '$mdDialog', function($scope, $mdSidenav, $mdDialog){

  $(document).ready(function() {
    $('a[href*=#]:not([href=#])').click(function(e) {
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
      controller: 'LoginController',
      templateUrl: 'app/login/signup.html',
      clickOutsideToClose: true,
      targetEvent: e
    });
  };

  $scope.showLoginDialog = function(e) {
    $mdDialog.show({
      controller: 'LoginController',
      templateUrl: 'app/login/login.html',
      clickOutsideToClose: true,
      parent: angular.element(document.body),
      targetEvent: e
    });
  };

}]);
