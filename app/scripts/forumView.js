var ForumsView = Parse.View.extend({
	
	className: 'forums-view',

	template: _.template($('.forum-view').text()),

	initialize: function() {
		console.log(this.model)
		$('.views-container').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model.attributes)
		this.$el.html(renderTemplate);
		return this;
	},
});
