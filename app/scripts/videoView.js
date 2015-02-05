var VideoView = Parse.View.extend({
	
	className: "video",

	template: _.template($('.video-view').text()),

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
