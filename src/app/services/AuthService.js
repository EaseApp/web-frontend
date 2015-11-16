angular.module('easeApp').factory('AuthService', function($http, $location, $state, $mdDialog, $cookies, md5, UrlService, $mdToast ){
	var service = { user: {} };
	// var baseUrl = BASE_URL.localhost;

	var login = function(data){
		var loginUrl = UrlService + "/users/sign_in";
		$http.post(loginUrl, data)
			.success(function(response){
				var emailHash = md5.createHash(response.username || '');
				var user = {name: response.username, token: response.api_token, emailHash: emailHash};
				storeUserCredentials(user);
				$http.defaults.headers.common['Authorization'] = service.user.token;
				$mdDialog.hide();
				$location.url('/dashboard');
			})
			.error(function(response){
				$mdToast.show($mdToast.simple().content(response.error).action('Ok').highlightAction(false).position('bottom right'));
			});
	};

	var register = function(data){
		var registerUrl = UrlService + "/users/sign_up";
		return $http.post(registerUrl, data)
			.success(function(response){
				var emailHash = md5.createHash(response.username || '');
				var user = {name: response.username, token: response.api_token, emailHash: emailHash};
				storeUserCredentials(user);
				$http.defaults.headers.common['Authorization'] = service.user.token;
				$mdDialog.hide();
				$location.url('/dashboard');
			})
			.error(function(response){
				$mdToast.show($mdToast.simple().content(response.error).action('Ok').highlightAction(false).position('bottom right'));
			});
	};

	var logout = function(){
		destroyUserCredentials();
		if($location.path() == '/') {
			$state.go($state.$current, null, { reload: true });
		} else {
			$location.url('/');
		}
	};

	var LOCAL_TOKEN_KEY = 'EaseApp';
	var isAuthenticated = false;

	var loadUserCredentials = function() {
		var windowUser = window.localStorage.getItem(LOCAL_TOKEN_KEY);
		if (windowUser) {
			useCredentials(JSON.parse(windowUser));
		}
	};

	function storeUserCredentials(token) {
		console.log('stored',token);
		window.localStorage.setItem(LOCAL_TOKEN_KEY, JSON.stringify(token));
		useCredentials(token);
	}

	function useCredentials(user) {
		isAuthenticated = true;
		service.user.name = user.name;
		service.user.token = user.token;
		service.user.emailHash = user.emailHash;

		// Set the token as header for your requests!
		$http.defaults.headers.common['Authorization'] = user.token;
	}

	function destroyUserCredentials() {
		service.user = {};
		isAuthenticated = false;
		$http.defaults.headers.common['Authorization'] = '';
		window.localStorage.removeItem(LOCAL_TOKEN_KEY);
	}

	return {
		login: login,
		logout: logout,
		register: register,
		isAuthenticated: function(){return isAuthenticated;},
		loadUserCredentials: loadUserCredentials,
		user: function(){
			loadUserCredentials();
			return service.user;
		}
	};
});
