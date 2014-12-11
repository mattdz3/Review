"use strict";

var Router = Parse.Router.extend({
	
	routes: {
		''                 : 'home',
		'home'             : 'home',
		'home/:id'         : 'review',
		'team'             : 'team',
		'join'             : 'join',
		'login'            : 'login',
		'news'             : 'news',
		'reviewer'         : 'reviewer',
		'createReview'     : 'createReview',
		'createSecond'     : 'createSecond',
		'createNews'       : 'createNews',
		'createReviewer'   : 'createReviewer',
	},

	initialize: function(options) {
		this.currentView = null;
		if (Parse.User.current() == null) {
			$('.reviewer-button').hide();
		};
	},

	home: function() {
		$('.views-container').empty();
		var view = new HomeView();

		var query = new Parse.Query(Review);

		query.find({
			success: function(reviews) {
				reviews.forEach(function(review) {
					new ReviewView({
						model: review
					})
				})
			}
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

	createReview: function() {
		if (Parse.User.current() != undefined ) {
			$('.views-container').empty();
		var view = new CreateReviewView();
		this.swap(view);
		} else {
			router.navigate('login', {trigger: true})
		}
	},

	review: function(id) {
		if (Parse.User.current() == null) {
			$('.create-second-review').hide();
		} else {
			console.log('no user');
		};

		new Parse.Query('Review').get(id, {
			success: function(reviews) {
				reviews.forEach(function(review) {
					console.log(review);
					var view = new FullReviewView({
						model: review
					})
				})
				this.swap(view);
			}
		});	
	},

	createSecond: function() {
		$('.views-container').empty();
		var view = new CreateSecondReviewView();
		this.swap(view);
	},

	createNews: function() {
		$('.views-container').empty();
		var views = new CreateNewsView();
		this.swap(view);
	},

	team: function() {
		$('.views-container').empty();
		var view = new TeamView();
		this.swap(view);
	},

	swap: function(view) {
		if (this.currentView) this.currentView.remove();
		this.currentView = view;
		this.currentView.render();
	},
});

var router = new Router();
Parse.history.start();


