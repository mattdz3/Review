var MainSideView = Parse.View.extend({
	
	className: 'side-slidr-container',

	template: _.template($('.main-side-view').text()),

	events: {
		'click' : 'renderFull',
		'mouseenter' : 'hover',
		'mouseleave' : 'out',
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

		$('body').animate({
        	scrollTop: $('.header').offset().top
    	}, 0);

		router.navigate('home/' + modelId, {trigger: true})
	},

	hover: function() {
		$('.overlay-name').css('display', 'block')
	},

	out: function() {
		$('.overlay-name').css('display', 'none')
	}
});