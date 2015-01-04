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
		'forums'           : 'forums',
		'forums/:id'       : 'topic',
		'createTopic'      : 'createTopic',
	},

	initialize: function(options) {
		this.currentView = null;
		if (Parse.User.current() == null) {
			$('.reviewer-button').hide();
		};
	},

	home: function() {
		$('.views-container').empty();
		$('.main-slidr').empty();

		var view = new HomeView();

		var gameQuery = new Parse.Query(Review);

		gameQuery.find({
			success: function(reviews) {
				reviews.forEach(function(review) {
					new ReviewView({
						model: review
					});
					new SideGameView({
						model: review
					});
					new SlidrView({
						model: review
					});
				})
			}
		}).done(function() {
			var reviewerQuery = new Parse.Query(Reviewer);
			reviewerQuery.find({
				success: function(reviewers) {
					reviewers.forEach(function(reviewer) {
						new ReviewerView({
							model: reviewer
						});
						new SideReviewerView({
							model: reviewer
						});
						
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
						});
						new SideNewsView({
							model: news
						});
					});
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
					new SideGameView({
						model: review
					})
				})
			}
		}).done(function() {
			var newsQuery = new Parse.Query(News);

			newsQuery.find({
				success: function(allNews) {
					allNews.forEach(function(news) {
						new SideNewsView({
							model: news
						});
					});
				}
			});
		}).done(function() {
			var reviewerQuery = new Parse.Query(Reviewer);
			reviewerQuery.find({
				success: function(reviewers) {
					reviewers.forEach(function(reviewer) {
						new SideReviewerView({
							model: reviewer
						})
					})
				}
			});
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
				console.log('no error')
				reviews.forEach(function(review) {
					console.log(review);
					var view = new FullReviewView({
						model: review
					})
				})
				this.swap(view);
			},
			error: function() {
				console.log('error')
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

		var gameQuery = new Parse.Query(Review);
		gameQuery.find({
			success: function(reviews) {
				reviews.forEach(function(review) {
					new SideGameView({
						model: review
					})
				})
			}
		}).done(function() {
			var newsQuery = new Parse.Query(News);

			newsQuery.find({
				success: function(allNews) {
					allNews.forEach(function(news) {
						new NewsView({
							model: news
						});
						new SideNewsView({
							model: news
						});
					});
				}
			});
		}).done(function() {
			var reviewerQuery = new Parse.Query(Reviewer);
			reviewerQuery.find({
				success: function(reviewers) {
					reviewers.forEach(function(reviewer) {
						new SideReviewerView({
							model: reviewer
						})
					})
				}
			});
		});	
	},

	reviewer: function(){
		$('.views-container').empty();
		var view = new HomeView();

		var gameQuery = new Parse.Query(Review);
		gameQuery.find({
			success: function(reviews) {
				reviews.forEach(function(review) {
					new SideGameView({
						model: review
					})
				})
			}
		}).done(function() {
			var newsQuery = new Parse.Query(News);

			newsQuery.find({
				success: function(allNews) {
					allNews.forEach(function(news) {
						new SideNewsView({
							model: news
						});
					});
				}
			});
		}).done(function() {
			var reviewerQuery = new Parse.Query(Reviewer);
			reviewerQuery.find({
				success: function(reviewers) {
					reviewers.forEach(function(reviewer) {
						new ReviewerView({
							model: reviewer
						});
						new SideReviewerView({
							model: reviewer
						});
					})
				}
			});
		});
	},

	team: function() {
		$('.views-container').empty();
		var view = new TeamView();
		this.swap(view);
	},

	forums: function() {
		$('.main-slidr').empty();
		$('.views-container').empty();

		var view = new MainForumView();
		this.swap(view);

		var query = new Parse.Query(Forum);
		query.find({
			success: function(forums) {
				forums.forEach(function(forum) {
					new ForumsView({
						model: forum
					});
				})
			},
			error: function() {
				console.log('error')
			}
		})
	},

	// topic: function(id) {
	// 	$('.forum-view').empty();

	// 	new Parse.Query('Forum').get(id, {
	// 		success: function(topics) {
	// 			topics.forEach(function(topic) {
	// 				var view = new TopicView({
	// 					model: topic
	// 				});
	// 			});
	// 			this.swap(view);
	// 		},
	// 		error: function() {
	// 			console.log('error')
	// 		}
	// 	});
	// },

	createTopic: function() {
		$('.views-container').empty();
		var view = new CreateTopicView();
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


