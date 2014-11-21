var HomeView = Parse.View.extend({
	
	className: 'main-view',

	template: _.template($('.home-view').text()),

	initialize: function() {
		$('.views-container').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model)
		this.$el.html(renderTemplate);
		return this;
	},
});