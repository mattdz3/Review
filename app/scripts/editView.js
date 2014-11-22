var EditView = Parse.View.extend({
	
	className: 'edit-view',

	template: _.template($('.edit-view').text()),

	events: {
		'click button' : 'finishedEdit'
	},

	initialize: function() {
		$('.views-container').append(this.el);
		this.render();
		console.log(this.model)
	},

	render: function() {
		var renderTemplate = this.template(this.model)
		this.$el.html(renderTemplate);
		return this;
	},

	finishedEdit: function() {
		console.log(this.model)
		var user = Parse.User.current().attributes.username;
		var model = this.model;
		var review = new Review();

		var secondReview = $('.second-review').val();
		var secondScore = $('.second-score').val();

		model.set('secondReviewer', user);
		model.set('secondReview', secondReview);
		model.set('secondScore', secondScore);
		console.log('cool')

		model.save(null, {
			success: function(){
				// user.relation("reviews").add(Review);

				$('.secondReview').val('');
				$('.secondScore').val('');
			},

			error: function(){
				console.log("nope")
			}
		})
	},
});