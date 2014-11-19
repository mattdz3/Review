var Router = Parse.Router.extend({
	
	routes: {
		''         : 'home',
		'home'     : 'home',
		'home/:id' : 'review',
		'join'     : 'join',
		'login'    : 'login',
		'create'   : 'create',
	},

	initialize: function(options) {
		this.currentView = null;

		var query = new Parse.Query(Review);

		query.find({
			success: function(reviews) {
				reviews.forEach(function(review) {
					new ReviewView({
						model: review
					})
				})
			}
		})
	},

	home: function() {
		$('.views-container').empty();
		var view = new HomeView({
			model: Parse.User.current().attributes
		});
	},

	join: function() {
		$('.views-container').empty();
		var view = new JoinView();
		this.swap(view);
	},

	login: function() {
		$('.views-container').empty();
		var view = new LoginView();
		this.swap(view);
	},

	create: function() {
		$('.views-container').empty();
		var view = new CreateReviewView();
		this.swap(view);
	},

	// review: function() {
	// 	$('.reviews-container').empty();
	// 	var query = Parse.Query(Review);
	// 	console.log(query)
	// 	query.equalTo("objectId", id);
	// 	query.find({
	// 		success: function(results) {
	// 			var reviewQuery = results[0].query();
	// 			reviewQuery.include('parent');
	// 			reviewQuery.find().done(function(allReviews) {
	// 				$('.reviews-container').html('');
	// 				allReviews.forEach(function(reviews) {
					
	// 					new ReviewView({
	// 						model: reviews,
	// 					})
	// 				})
	// 			})						
	// 		},
	// 	})
	// 	this.swap(view);
	// },

	swap: function(view) {
		if (this.currentView) this.currentView.remove();
		this.currentView = view;
		this.currentView.render();
	},
});

var router = new Router();
Parse.history.start();


