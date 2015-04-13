define(function(require){
	var Backbone = require('backbone');
	
	var App = Backbone.View.extend({
		el: document.body,
		render: function(){
			this.$el.html("<div>Hello world!</div>");
			return this;
		}
	});

	return App;
});	