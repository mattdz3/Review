var FullReviewView = Parse.View.extend({

	className: "full-review-container",

	events: {
		'click .button' : 'secondReview',
	},

	template: _.template($('.full-review-view').text()),

	initialize: function() {
		$('.reviews-container').append(this.el);
		this.render();

	},

	render: function() {
		var renderTemplate = this.template(this.model.attributes)
		this.$el.html(renderTemplate);
		slidr.create('slidr-id').start();
		return this;
	},

	secondReview: function() {
		$('.reviews-container').empty();
		new SecondFullReviewView({model: this.model})
	},
});