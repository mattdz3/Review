var FullReviewView = Parse.View.extend({

	template: _.template($('.full-review-view').text()),

	

	initialize: function() {
		$('.reviews-container').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model.attributes)
		this.$el.html(renderTemplate);
		return this;
	},


});