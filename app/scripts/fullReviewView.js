var FullReviewView = Parse.View.extend({

	className: "full-review-container",

	events: {
		'click button' : 'secondReview',
	},

	template: _.template($('.full-review-view').text()),

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

	secondReview: function() {
		$('.reviews-container').empty();
		new SecondFullReviewView({model: this.model})
	},
});