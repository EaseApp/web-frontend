(function() {
  'use strict';

  describe('ClientService', function(){

    beforeEach(module('easeApp'));
	
	var service;
	
	 beforeEach(inject(function(_$service_, $ngMocks){
    // The injector unwraps the underscores (_) from around the parameter names when matching
      service = _$service_;
    }));
	
	describe('ClientServiceTests', function(){
		describe('Login tests', function(){
			// it('should ', assertion, timeout)
		});
	});

  });
})();
