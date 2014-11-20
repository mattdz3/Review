"use strict";

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

	review: function() {
		$('.reviews-container').empty();
		// new HomeView({model: Parse.User.current().attributes})
		var query = new Parse.Query(ReviewCollection);
		console.log(query)
		query.equalTo("objectId", id);
		query.find({
			success: function(reviews) {
				reviews.forEach(function(review) {
					new FullReviewView({
						model: review
					})
				})					
			},

			error: function() {
				console.log("no worky");
			}
		})
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


