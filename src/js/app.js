/** @jsx React.DOM */
var React = require('react');
window.React = React;
var App = require('./components/app.jsx');

module.exports  = React.render(<App />, document.body);


