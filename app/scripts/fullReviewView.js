var FullReviewView = Parse.View.extend({

	className: "full-review-container",

	template: _.template($('.full-review-view').text()),

	initialize: function() {
		$('.reviews-container').append(this.el);
		this.render();
		console.log(this.model)
	},

	render: function() {
		var renderTemplate = this.template(this.model)
		this.$el.html(renderTemplate);
		return this;
	},
});