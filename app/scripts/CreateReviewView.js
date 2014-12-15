var mainImage;
var imageOne;
var imageTwo;
var imageThree;

var CreateReviewView = Parse.View.extend({

	className: "create-review",
	
	template: _.template($('.create-review-view').text()),

	events: {
		"click .create"      : "createReview",
		"click .add-pic"     : "addPic",
		"click .image-one"   : "addImageOne",
		"click .image-two"   : "addImageTwo",
		"click .image-three" : "addImageThree",
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

	addPic: function() {
		filepicker.pick(
  		function(InkBlobs){
    		mainImage = InkBlobs.url
		});
	},

	addImageOne: function() {
		filepicker.pick(
  		function(InkBlobs){
    		imageOne = InkBlobs.url
		});
	},

	addImageTwo: function() {
		filepicker.pick(
  		function(InkBlobs){
    		imageTwo = InkBlobs.url
		});
	},

	addImageThree: function() {
		filepicker.pick(
  		function(InkBlobs){
    		imageThree = InkBlobs.url
		});
	},

	createReview: function(){

		if ($("input[name='game']").is(":checked")) {
			var user = Parse.User.current();
			var username = user.attributes.username;
			var review = new Review();
			var title = $('.game-title').val();
			var gameReviewOne = $('.review-content').val();
			var gameReviewTwo = $('.second-review-content').val();
			var gameReviewThree = $('.thrid-review-content').val();
			var gameReviewFour = $('.fourth-review-content').val();
			var quickReview = $('.quick-review').val();
			var developer = $('.developer').val();
			var publisher = $('.publisher').val();
			var score = $('.score').val();
			var captionOne = $('.image-one-caption').val();
			var captionTwo = $('.image-two-caption').val();
			var captionThree = $('.image-three-caption').val();

			review.set('reviewerObject', user);
			review.set('reviewer', username);
			review.set('name', title);
			review.set('score', score);
			review.set('image', mainImage);
			review.set('imageOne', imageOne);
			review.set('imageTwo', imageTwo);
			review.set('imageThree', imageThree);
			review.set('reviewOne', gameReviewOne);
			review.set('reviewTwo', gameReviewTwo);
			review.set('reviewThree', gameReviewThree);
			review.set('reviewFour', gameReviewFour);
			review.set('quickReview', quickReview);
			review.set('developer', developer);
			review.set('publisher', publisher);
			review.set('captionOne', captionOne);
			review.set('captionTwo', captionTwo);
			review.set('captionThree', captionThree);

			review.save(null, {
				success: function(){
					$('.game-title').val('');
					$('.game-image').val('');
					$('.review-content').val('');
					$('.quick-review').val('');
					$('.score').val('');
					$('.developer').val('');
					$('.publisher').val('');
					$('.second-review-content').val('');
					$('.thrid-review-content').val('');
					$('.fourth-review-content').val('');
					$('.image-one-caption').val('');
					$('.image-two-caption').val('');
					$('.image-three-caption').val('');
				},

				error: function(){
					console.log("nope")
				}
			}).done(function() {
				user.relation("reviews").add(review);

				user.save(null, {
					success: function() {
						console.log("cool");
					},

					error: function() {
						console.log("error");
					}
				})
			});

		} else if ($("input[name='reviewer']").is(":checked")) {
			var user = Parse.User.current();
			var username = user.attributes.username;
			var reviewer = new Reviewer();
			var title = $('.game-title').val();
			var gameReviewOne = $('.review-content').val();
			var gameReviewTwo = $('.second-review-content').val();
			var gameReviewThree = $('.thrid-review-content').val();
			var gameReviewFour = $('.fourth-review-content').val();
			var quickReview = $('.quick-review').val();
			var developer = $('.developer').val();
			var publisher = $('.publisher').val();
			var score = $('.score').val();
			var captionOne = $('.image-one-caption').val();
			var captionTwo = $('.image-two-caption').val();
			var captionThree = $('.image-three-caption').val();

			reviewer.set('reviewerObject', user);
			reviewer.set('reviewer', username);
			reviewer.set('name', title);
			reviewer.set('score', score);
			reviewer.set('image', mainImage);
			reviewer.set('imageOne', imageOne);
			reviewer.set('imageTwo', imageTwo);
			reviewer.set('imageThree', imageThree);
			reviewer.set('reviewOne', gameReviewOne);
			reviewer.set('reviewTwo', gameReviewTwo);
			reviewer.set('reviewThree', gameReviewThree);
			reviewer.set('reviewFour', gameReviewFour);
			reviewer.set('quickReview', quickReview);
			reviewer.set('developer', developer);
			reviewer.set('publisher', publisher);
			reviewer.set('captionOne', captionOne);
			reviewer.set('captionTwo', captionTwo);
			reviewer.set('captionThree', captionThree);

			reviewer.save(null, {
				success: function(){
					$('.game-title').val('');
					$('.game-image').val('');
					$('.review-content').val('');
					$('.quick-review').val('');
					$('.score').val('');
					$('.developer').val('');
					$('.publisher').val('');
					$('.second-review-content').val('');
					$('.thrid-review-content').val('');
					$('.fourth-review-content').val('');
					$('.image-one-caption').val('');
					$('.image-two-caption').val('');
					$('.image-three-caption').val('');
					console.log("saved")
				},

				error: function(){
					console.log("nope")
				}
			}).done(function() {
				
				user.relation("reviewers").add(reviewer);
				console.log("user")

				user.save(null, {
					success: function() {
						console.log("cool");
					},

					error: function() {
						console.log("error");
					}
				})
			});


		} else if ($("input[name='news']").is(":checked")){
			var user = Parse.User.current();
			var username = user.attributes.username;
			var news = new News();
			var title = $('.game-title').val();
			var gameReviewOne = $('.review-content').val();
			var gameReviewTwo = $('.second-review-content').val();
			var gameReviewThree = $('.thrid-review-content').val();
			var gameReviewFour = $('.fourth-review-content').val();
			var quickReview = $('.quick-review').val();
			var developer = $('.developer').val();
			var publisher = $('.publisher').val();
			var score = $('.score').val();
			var captionOne = $('.image-one-caption').val();
			var captionTwo = $('.image-two-caption').val();
			var captionThree = $('.image-three-caption').val();

			news.set('reviewerObject', user);
			news.set('reviewer', username);
			news.set('name', title);
			news.set('score', score);
			news.set('image', mainImage);
			news.set('imageOne', imageOne);
			news.set('imageTwo', imageTwo);
			news.set('imageThree', imageThree);
			news.set('reviewOne', gameReviewOne);
			news.set('reviewTwo', gameReviewTwo);
			news.set('reviewThree', gameReviewThree);
			news.set('reviewFour', gameReviewFour);
			news.set('quickReview', quickReview);
			news.set('developer', developer);
			news.set('publisher', publisher);
			news.set('captionOne', captionOne);
			news.set('captionTwo', captionTwo);
			news.set('captionThree', captionThree);

			news.save(null, {
				success: function(){
					$('.game-title').val('');
					$('.game-image').val('');
					$('.review-content').val('');
					$('.quick-review').val('');
					$('.score').val('');
					$('.developer').val('');
					$('.publisher').val('');
					$('.second-review-content').val('');
					$('.thrid-review-content').val('');
					$('.fourth-review-content').val('');
					$('.image-one-caption').val('');
					$('.image-two-caption').val('');
					$('.image-three-caption').val('');
				},

				error: function(){
					console.log("nope")
				}
			}).done(function() {
				user.relation("news").add(news);

				user.save(null, {
					success: function() {
						console.log("cool");
					},

					error: function() {
						console.log("error");
					}
				})
			});
		}
	},
});




