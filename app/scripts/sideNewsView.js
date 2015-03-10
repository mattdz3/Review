var SideNewsView = Parse.View.extend({
	
	className: 'side-game',

	events: {
		'click div' : 'renderReview',
	},

	template: _.template($('.side-view').text()),

	initialize: function() {
		$('.news-sidebar').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model.attributes)
		this.$el.html(renderTemplate);
		return this;
	},

	renderReview: function() {
		$('.reviews-container').empty();
		var modelId = this.model.id;
		
		var fullReview = this.model;

		new FullReviewView({
			model: fullReview
		});

		$('body').animate({
        	scrollTop: $('.header').offset().top
    	}, 0);

		router.navigate('home/' + modelId, {trigger: true})
	}
});