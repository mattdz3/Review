var HomeView = Parse.View.extend({
	
	className: 'main-view',

	template: _.template($('.home-view').text()),

	events: {
		'click .review-contents' : 'thisReview',
	},

	initialize: function() {
		$('.views-container').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model.attributes)
		this.$el.html(renderTemplate);
		return this;
	},

	thisReview: function() {
		router.navigate('home/:id', {trigger: true});
		console.log("cool")
	},
});