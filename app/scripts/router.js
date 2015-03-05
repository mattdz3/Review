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
		'video'            : 'video',
		'reviewer'         : 'reviewer',
		'forums'           : 'forums',
		'forums/:id'       : 'topic',
		'createTopic'      : 'createTopic',
	},

	initialize: function(options) {
		this.currentView = null;
		var user = Parse.User.current();
	
		new SearchView();
		$('.display-search').hide();				
	},

	home: function() {
		var user = Parse.User.current();
		
		$('.views-container').empty();
		$('.main-slidr').empty();
		$('.searchbar').show();

		var view = new HomeView();
		var view = new SlidrView();

		var gameQuery = new Parse.Query(Review);
		gameQuery.find({
			success: function(reviews) {
				var inOrder = _.sortBy(reviews, 'createdAt')
				var reverseReviews = inOrder.reverse();
				new MainSideView({
					model: reverseReviews[0]
				});
				new SideGameView({
					model: reverseReviews[0]
				});
				new SideGameView({
					model: reverseReviews[1]
				});
				reverseReviews.forEach(function(review) {
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
					var inOrder = _.sortBy(reviewers, 'createdAt')
					var reverseReviewers = inOrder.reverse();
					new MainSideView({
						model: reviewers[length - 1]
					});
					new SideReviewerView({
						model: reviewers[length - 1]
					});
					new SideReviewerView({
						model: reviewers[length - 2]
					});
					reverseReviewers.forEach(function(reviewer) {
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
					var inOrder = _.sortBy(allNews, 'createdAt')
					console.log(inOrder)
					var reverseNews = inOrder.reverse();

					new SideNewsView({
						model: reverseNews[0]
					});
					new SideNewsView({
						model: reverseNews[1]
					});
					reverseNews.forEach(function(news) {
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
				var inOrder = _.sortBy(reviews, 'createdAt')
				var reverseReviews = inOrder.reverse();
				reverseReviews.forEach(function(review) {
					new ReviewView({
						model: review
					});	
				});
			}
		}).done(function() {
			var reviewerQuery = new Parse.Query(Reviewer);
			reviewerQuery.find({
				success: function(reviewers) {

					var inOrder = _.sortBy(reviewers, 'createdAt')
					var reverseReviewers = inOrder.reverse();
					var length = reviewers.length;

					new SideReviewerView({
						model: reverseReviewers[0]
					});
					new SideReviewerView({
						model: reverseReviewers[1]
					});
				}
			});
		}).done(function() {
			var newsQuery = new Parse.Query(News);
			newsQuery.find({
				success: function(allNews) {
					var length = allNews.length;
					var inOrder = _.sortBy(allNews, 'createdAt')
					var reverseNews = inOrder.reverse();

					new SideNewsView({
						model: reverseNews[0]
					});
					new SideNewsView({
						model: reverseNews[1]
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
				var inOrder = _.sortBy(reviews, 'createdAt')
				var reverseReviews = inOrder.reverse();
				new SideGameView({
					model: reverseReviews[0]
				});
				new SideGameView({
					model: reverseReviews[1]
				});
			}
		});
		var reviewerQuery = new Parse.Query(Reviewer);
		reviewerQuery.find({
			success: function(reviewers) {
				var inOrder = _.sortBy(reviewers, 'createdAt')
				var reverseReviewers = inOrder.reverse();
				
				new SideReviewerView({
					model: reverseReviewers[0]
				});
				new SideReviewerView({
					model: reverseReviewers[1]
				});
			}
		});
		var newsQuery = new Parse.Query(News);
		newsQuery.find({
			success: function(allNews) {
				var inOrder = _.sortBy(allNews, 'createdAt')
				var reverseNews = inOrder.reverse();
				reverseNews.forEach(function(news) {
					new NewsView({
						model: news
					});	
				});
			}
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
				var inOrder = _.sortBy(reviews, 'createdAt')
				var reverseReview = inOrder.reverse();
				new SideGameView({
					model: reverseReview[0]
				});
				new SideGameView({
					model: reverseReview[1]
				});
			}
		}).done(function() {
			var reviewerQuery = new Parse.Query(Reviewer);
			reviewerQuery.find({
				success: function(reviewers) {
					var inOrder = _.sortBy(reviewers, 'createdAt')
					var reverseReviewers = inOrder.reverse();
					reverseReviewers.forEach(function(reviewer) {
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
					var inOrder = _.sortBy(allNews, 'createdAt')
					var reverseNews = inOrder.reverse();
					new SideNewsView({
						model: reverseNews[0]
					});
					new SideNewsView({
						model: reverseNews[1]
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

	video: function() {
		$('.views-container').empty();
		$('.searchbar').hide();
		$('.main-slidr').empty();
		var view = new VideoView();
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
				var reverse = forums.reverse();
				reverse.forEach(function(forum) {
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

	// topic: function() {
	// 	console.log(this.model)
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


