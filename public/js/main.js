require.config({
	paths: {
		backbone: "../lib/backbone-amd/backbone",
		underscore: "../lib/underscore-amd/underscore",
		jquery: "../lib/jquery/dist/jquery",
		react: "../lib/react/react-with-addons"
	},
	shim: {
		backbone: {
			exports: "Backbone",
			deps: ["jquery"]
		},
		underscore: {
			exports: "_",
			deps : ["jquery"]
		},
		react: {
			exports: "React"
		}
	}
});

require(['app'], function(App){
	var app = new App();
	app.render();
});

