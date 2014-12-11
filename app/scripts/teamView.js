var TeamView = Parse.View.extend({
	
	className: 'team-view',

	template: _.template($('.team-view').text()),

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
