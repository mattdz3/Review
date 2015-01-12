var DisplaySearchView = Parse.View.extend({

	tagName: 'li',
	
	className: 'search-view',

	events: {
		'click span' : 'display',
	},

	template: _.template($('.display-search-view').text()),

	initialize: function() {
		$('.display-search').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model)
		this.$el.html(renderTemplate);
		return this;
	},

	display: function() {
		$('.display-search').hide();
		$('.search').val('')
		$('.reviews-container').empty();

		var modelId = this.model.id;
		var fullReview = this.model;

		new FullReviewView({
			model: fullReview
		});

		router.navigate('home/' + modelId, {trigger: true})
	}
});