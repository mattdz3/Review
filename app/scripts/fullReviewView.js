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

		var reviewSlider = slidr.create('slidr-id', {
		  // after: function(e) { console.log('in: ' + e.in.slidr); },
		  // before: function(e) { console.log('out: ' + e.out.slidr); },
		  breadcrumbs: true,
		  controls: 'border',
		  direction: 'h',
		  fade: true,
		  keyboard: true,
		  overflow: false,
		  pause: false,
		  theme: '#222',
		  timing: { 'cube': '0.5s ease-in' },
		  touch: true,
		  transition: 'linear'
		});

		

		reviewSlider.start();	

		return this;
	},

	secondReview: function() {
		$('.reviews-container').empty();
		new SecondFullReviewView({model: this.model})
	},
});