/// <reference path="../typings/jasmine/jasmine.d.ts"/>
/// <reference path="../bower_components/react/react.js" />

'use strict';

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var container = document.createElement("div");

describe('App tests', function(){
	var instance;
	var App = require('../src/js/components/App.jsx')
	
	beforeEach(function(){
		
	});
	
	it('should display the title passed in', function(){
		var title = "A new value";
		instance = TestUtils.renderIntoDocument(<App title={title} />);
		var heading = TestUtils.findRenderedDOMComponentWithTag(instance, 'h1');
		expect(heading.getDOMNode().textContent).toEqual(title);	
	} )
});