var CreateReviewView = Parse.View.extend({
	
	template: _.template($('.create-review-view').text()),

	events: {
		"click .create" : "createReview",
	},

	initialize: function() {
		$('.views-container').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model)
		this.$el.html(renderTemplate);
		return this;
	},

	createReview: function(){
		var user = Parse.User.current();
		var username = user.attributes.username;
		var review = new Review();
		var gameTitle = $('.game-title').val();
		var gameImage = $('.game-image').val();
		var gameReview = $('.review-content').val();
		var quickReview = $('.quick-review').val();
		var score = $('.score').val();

		review.set('reviewerObject', user);
		review.set('reviewer', username);
		review.set('name', gameTitle);
		review.set('score', score);
		review.set('image', gameImage);
		review.set('review', gameReview);
		review.set('quickReview', quickReview);

		review.save(null, {
			success: function(){
				user.relation("reviews").add(Review);

				$('.game-title').val('');
				$('.game-image').val('');
				$('.review-content').val('');
				$('.quick-review').val('');
				$('.score').val('');
			},

			error: function(){
				console.log("nope")
			}
		})
	},
});