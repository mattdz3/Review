"use strict";

var Router = Parse.Router.extend({
	
	routes: {
		''         : 'home',
		'home'     : 'home',
		'home/:id' : 'review',
		'join'     : 'join',
		'login'    : 'login',
		'create'   : 'create',
		'edit'     : 'edit',
	},

	initialize: function(options) {
		this.currentView = null;
	},

	home: function() {
		$('.views-container').empty();
		var view = new HomeView({
			model: Parse.User.current().attributes
		});

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

	review: function(id) {
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
		})	
	},

	edit: function() {
		$('.views-container').empty();
		var view = new EditView();
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


