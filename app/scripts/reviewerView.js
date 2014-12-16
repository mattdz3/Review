var ReviewerView = Parse.View.extend({
	
	className: 'review-contents',

	template: _.template($('.reviewer-view').text()),

	events: {
		'click .full-review' : 'renderFull',
	},

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

	renderFull: function() {
		$('.reviews-container').empty();
		var modelId = this.model.id;
		
		console.log(modelId);
		var fullReview = this.model;
		console.log(fullReview)

		new FullReviewView({
			model: fullReview
		});

		router.navigate('home/' + modelId, {trigger: true})
	}
});