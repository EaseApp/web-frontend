'use strict';

describe('AuthService', function() {
    var httpBackend, service, urlService, http;

    beforeEach(function() {
      module('easeApp');

      inject(function(AuthService, $httpBackend, UrlService, $http) {
        service = AuthService;
        httpBackend = $httpBackend;
        urlService = UrlService;
        http = $http;
      });

      window.localStorage.removeItem('EaseApp');

    });

    it('sets Authorization header on login', inject(function() {
        var mockResponse = {username: "testuser1", api_token: "12345asdf7890", emailHash: "1234567890wertyuiasdad"};
        httpBackend.expectPOST(urlService+'/users/sign_in', {username: "testuser1", password: "12345678"}).respond(200, mockResponse);
        service.login({username: "testuser1", password: "12345678"});
        httpBackend.flush();
        expect(http.defaults.headers.common['Authorization']).toBe('12345asdf7890');

    }));

});
