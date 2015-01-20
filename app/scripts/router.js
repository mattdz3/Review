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
		var user = Parse.User.current();

		if (user == null) {
			$('.reviewer-button').hide();
		};

		new SearchView();
		$('.display-search').hide();				
	},

	home: function() {
		$('.views-container').empty();
		$('.main-slidr').empty();
		$('.searchbar').show();

		var view = new HomeView();
		var view = new SlidrView();

		var gameQuery = new Parse.Query(Review);
		gameQuery.find({
			success: function(reviews) {
				
				new MainSideView({
					model: reviews[0]
				});
				new SideGameView({
					model: reviews[0]
				});
				new SideGameView({
					model: reviews[1]
				});
				reviews.forEach(function(review) {
					new ReviewView({
						model: review
					});	
				});
			}
		}).done(function() {
			var reviewerQuery = new Parse.Query(Reviewer);
			reviewerQuery.find({
				success: function(reviewers) {
					var length = reviewers.length;
					new MainSideView({
						model: reviewers[length - 1]
					});
					new SideReviewerView({
						model: reviewers[length - 1]
					});
					new SideReviewerView({
						model: reviewers[length - 2]
					});
					reviewers.forEach(function(reviewer) {
						new ReviewerView({
							model: reviewer
						});
					})
				}
			});
		}).done(function() {
			var newsQuery = new Parse.Query(News);

			newsQuery.find({
				success: function(allNews) {
					var length = allNews.length;
					new MainSideView({
						model: allNews[length - 1]
					});
					new SideNewsView({
						model: allNews[length - 1]
					});
					new SideNewsView({
						model: allNews[length - 2]
					});
					allNews.forEach(function(news) {
						new NewsView({
							model: news
						});
						
					});
				}
			});
		});		
	},

	game: function() {
		$('.views-container').empty();
		$('.main-slidr').empty();
		$('.searchbar').show();
		var view = new HomeView();
		var gameQuery = new Parse.Query(Review);
		gameQuery.find({
			success: function(reviews) {
				$('.hide-game').hide();
				$('.hide-team').hide();
				$('.team-sidebar').hide();
				reviews.forEach(function(review) {
					new ReviewView({
						model: review
					});	
				});
			}
		}).done(function() {
			var reviewerQuery = new Parse.Query(Reviewer);
			reviewerQuery.find({
				success: function(reviewers) {
					var length = reviewers.length;
					
					new SideReviewerView({
						model: reviewers[length - 1]
					});
					new SideReviewerView({
						model: reviewers[length - 2]
					});
				}
			});
		}).done(function() {
			var newsQuery = new Parse.Query(News);

			newsQuery.find({
				success: function(allNews) {
					var length = allNews.length;
					
					new SideNewsView({
						model: allNews[length - 1]
					});
					new SideNewsView({
						model: allNews[length - 2]
					});
				}
			});
		});
	},

	join: function() {
		$('.views-container').empty();
		$('.main-slidr').empty();
		var view = new JoinView();
		this.swap(view);
	},

	login: function() {
		$('.views-container').empty();
		$('.main-slidr').empty();
		var view = new LoginView();
		this.swap(view);
	},

	createReview: function() {
		$('.main-slidr').empty();
		if (Parse.User.current() != undefined ) {
			$('.views-container').empty();
		var view = new CreateReviewView();
		this.swap(view);
		} else {
			router.navigate('login', {trigger: true})
		}
	},

	review: function(id) {
		$('.main-slidr').empty();
		$('.comment-container').hide();
		$('.searchbar').show();
		if (Parse.User.current() == null) {
			$('.create-second-review').hide();
		};

		// new Parse.Query('Review').get(id, {
		// 	success: function(reviews) {
		// 		console.log('no error')
		// 		reviews.forEach(function(review) {
		// 			console.log(review);
		// 			var view = new FullReviewView({
		// 				model: review
		// 			})
		// 		})
		// 		this.swap(view);
		// 	},
		// 	error: function() {
		// 		console.log('error')
		// 	}
		// });
	},

	createSecond: function() {
		$('.views-container').empty();
		var view = new CreateSecondReviewView();
		this.swap(view);
	},

	news: function() {
		$('.views-container').empty();
		$('.main-slidr').empty();
		$('.searchbar').show();
		var view = new HomeView();

		var gameQuery = new Parse.Query(Review);
		gameQuery.find({
			success: function(reviews) {
				$('.hide-news').hide();
				$('.hide-team').hide();
				$('.team-sidebar').hide();
				new SideGameView({
					model: reviews[0]
				});
				new SideGameView({
					model: reviews[1]
				});
			}
		}).done(function() {
			var reviewerQuery = new Parse.Query(Reviewer);
			reviewerQuery.find({
				success: function(reviewers) {
					var length = reviewers.length;
					
					new SideReviewerView({
						model: reviewers[length - 1]
					});
					new SideReviewerView({
						model: reviewers[length - 2]
					});
				}
			});
		}).done(function() {
			var newsQuery = new Parse.Query(News);

			newsQuery.find({
				success: function(allNews) {
					var length = allNews.length;
					
					allNews.forEach(function(news) {
						new NewsView({
							model: news
						});	
					});
				}
			});
		});			
	},

	reviewer: function(){
		$('.views-container').empty();
		$('.main-slidr').empty();
		$('.searchbar').show();
		var view = new HomeView();

		var gameQuery = new Parse.Query(Review);
		gameQuery.find({
			success: function(reviews) {
				$('.hide-industry').hide();
				$('.hide-team').hide();
				$('.team-sidebar').hide();
				new SideGameView({
					model: reviews[0]
				});
				new SideGameView({
					model: reviews[1]
				});
			}
		}).done(function() {
			var reviewerQuery = new Parse.Query(Reviewer);
			reviewerQuery.find({
				success: function(reviewers) {
					reviewers.forEach(function(reviewer) {
						new ReviewerView({
							model: reviewer
						});
					})
				}
			});
		}).done(function() {
			var newsQuery = new Parse.Query(News);

			newsQuery.find({
				success: function(allNews) {
					var length = allNews.length;
					new SideNewsView({
						model: allNews[length - 1]
					});
					new SideNewsView({
						model: allNews[length - 2]
					});
				}
			});
		});
	},

	team: function() {
		$('.views-container').empty();
		$('.searchbar').hide();
		$('.main-slidr').empty();
		var view = new TeamView();
		this.swap(view);
	},

	forums: function() {
		$('.main-slidr').empty();
		$('.searchbar').hide();
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


