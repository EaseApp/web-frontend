/// <reference path="../../../typings/react/react.d.ts" />
/// <reference path="../../../typings/react/react-addons-global.d.ts" />



var React = require('react');

var App = React.createClass({
	render: function(){
		return (
			<h1>{this.props.title}</h1>
		);
	}
});

module.exports = App;