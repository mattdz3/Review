var NewsView = Parse.View.extend({
	
	className: "review-contents",

	template: _.template($('.news-view').text()),

	initialize: function() {
		$('.reviews-container').append(this.el);
		this.render();
		console.log(this.model)
	},

	render: function() {
		var renderTemplate = this.template(this.model.attributes)
		this.$el.html(renderTemplate);
		return this;
	},
});
