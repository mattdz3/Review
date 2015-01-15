var MainSideView = Parse.View.extend({
	
	className: 'side-slidr-container',

	template: _.template($('.main-side-view').text()),

	events: {
		'click' : 'renderFull'
	},

	initialize: function() {
		$('.main-side-container').append(this.el);
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