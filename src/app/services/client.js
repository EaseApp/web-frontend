angular.module('easeApp').factory('ClientService', function($http, $location, $mdDialog){
	var service = { user: {} };
	var baseUrl = 'http://localhost:3000';
	
	service.login = function(data){
		var loginUrl = baseUrl + "/users/sign_in";
		return $http.post(loginUrl, data)
			.success(function(response){
				makeUser(response);
				$mdDialog.hide();
				$location.url('/dashboard');
			})
			.error(function(response){
				console.log(response.error);
			});	
	};
	
	service.register = function(data){
		var registerUrl = baseUrl + "/users/sign_up";
		return $http.post(registerUrl, data)
			.success(function(response){
				makeUser(response);
			})
			.error(function(response){
				console.log(response.error);
			});
	};
	
	service.logout = function(){
		destroyUser();
		$location.url('/');
	};
	
	function makeUser(data){
		service.user.name = data.username;
		service.user.token = data.api_token;
	}
	
	function destroyUser(){
		service.user = {};
	}
	
	return service;
});