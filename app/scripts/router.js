"use strict";

var Router = Parse.Router.extend({
	
	routes: {
		''                 : 'home',
		'home'             : 'home',
		'home/:id'         : 'review',
		'team'             : 'team',
		'join'             : 'join',
		'login'            : 'login',
		'game'             : 'game',
		'news'             : 'news',
		'reviewer'         : 'reviewer',
		'createReview'     : 'createReview',
		'createSecond'     : 'createSecond',
	},

	initialize: function(options) {
		this.currentView = null;
		if (Parse.User.current() == null) {
			$('.reviewer-button').hide();
		};
		$('.main-slidr').hide();
	},

	home: function() {
		$('.views-container').empty();
		$('.main-slidr').show();
		var view = new HomeView();

		var gameQuery = new Parse.Query(Review);

		gameQuery.find({
			success: function(reviews) {
				reviews.forEach(function(review) {
					new ReviewView({
						model: review
					})
				})
			}
		}).done(function() {
			var reviewerQuery = new Parse.Query(Reviewer);
			reviewerQuery.find({
				success: function(reviewers) {
					reviewers.forEach(function(reviewer) {
						new ReviewerView({
							model: reviewer
						})
					})
				}
			});
		}).done(function() {
			var newsQuery = new Parse.Query(News);

			newsQuery.find({
				success: function(allNews) {
					allNews.forEach(function(news) {
						new NewsView({
							model: news
						})
					})
				}
			});
		});

		

		
	},

	game: function() {
		$('.views-container').empty();
		var view = new HomeView();

		var gameQuery = new Parse.Query(Review);

		gameQuery.find({
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

	news: function() {
		$('.views-container').empty();
		var view = new HomeView();		

		var query = new Parse.Query(News);

		query.find({
			success: function(allNews) {
				allNews.forEach(function(news) {
					new NewsView({
						model: news
					})
				})
			}
		});
	},

	reviewer: function(){
		$('.views-container').empty();
		var view = new HomeView();

		var query = new Parse.Query(Reviewer);

		query.find({
			success: function(reviewers) {
				reviewers.forEach(function(reviewer) {
					new ReviewerView({
						model: reviewer
					})
				})
			}
		});
	},

	team: function() {

		$('.views-container').empty();
		var view = new TeamView();
		this.swap(view);
	},

	swap: function(view) {
		$('.main-slidr').hide();
		if (this.currentView) this.currentView.remove();
		this.currentView = view;
		this.currentView.render();
	},
});

var router = new Router();
Parse.history.start();


