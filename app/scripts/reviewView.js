var ReviewView = Parse.View.extend({

	className: "review-contents",
	
	template: _.template($('.review-view').text()),

	events: {
		'click .full-review' : 'renderFull',
	},

	initialize: function() {
		$('.reviews-container').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model.attributes)
		this.$el.html(renderTemplate);
		return this;
	},

	renderFull: function() {
		var modelId = this.model.id;

		$('body').animate({
        	scrollTop: $('.header').offset().top
    	}, 0);

		router.navigate('home/' + modelId, {trigger: true})
	}
});