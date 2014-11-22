var FullReviewView = Parse.View.extend({

	className: "full-review-container",

	events: {
		'click button' : 'toEdit',
	},

	template: _.template($('.full-review-view').text()),

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

	toEdit: function() {
		// router.navigate('edit', {trigger: true})
		new EditView({model: this.model})
	},
});