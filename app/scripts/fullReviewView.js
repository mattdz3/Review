var FullReviewView = Parse.View.extend({

	className: "full-review-container",

	events: {
		'click .create-second-review' : 'secondReview',
	},

	template: _.template($('.full-review-view').text()),

	initialize: function() {
		$('.review-container').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model.attributes)
		this.$el.html(renderTemplate);

		var reviewSlider = slidr.create('slidr-id', {
		  breadcrumbs: true,
		  controls: 'corner',
		  direction: 'h',
		  fade: true,
		  keyboard: true,
		  overflow: false,
		  pause: false,
		  theme: '#222',
		  timing: { 'linear': '.4s ease-in' },
		  touch: true,
		  transition: 'linear'
		});

		reviewSlider.start();	

		return this;
	},

	secondReview: function() {
		$('.reviews-container').empty();
		new CreateSecondReviewView({model: this.model})
	},
});