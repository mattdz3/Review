var BottomNewsView = Parse.View.extend({
	
	className: 'bottom-news',

	template: _.template($('.bottom-news-view').text()),

	events: {
		'click' : 'renderFull'
	},

	initialize: function() {
		$('.bottom-news-container').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model.attributes)
		this.$el.html(renderTemplate);

		return this;
	},

	renderFull: function() {
		$('.reviews-container').empty();
		var modelId = this.model.id;
		
		var fullReview = this.model;

		new FullReviewView({
			model: fullReview
		});

		router.navigate('home/' + modelId, {trigger: true})
	}
});