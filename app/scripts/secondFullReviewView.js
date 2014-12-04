var SecondFullReviewView = Parse.View.extend({

	className: "full-review-container",

	events: {
		'click .button' : 'firstReview',
	},

	template: _.template($('.second-full-review-view').text()),

	initialize: function() {
		$('.reviews-container').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model.attributes)
		this.$el.html(renderTemplate);
		return this;
	},

	firstReview: function() {
		$('.reviews-container').empty();
		new FullReviewView({model: this.model})
	},
});