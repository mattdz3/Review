"use strict";

var Router = Parse.Router.extend({
	
	routes: {
		''                 : 'home',
		'home'             : 'home',
		'home/:id'         : 'review',
		'team'             : 'team',
		'join'             : 'join',
		'login'            : 'login',
		'review'           : 'game',
		'news'             : 'news',
		'video'            : 'video',
		'article'          : 'reviewer',
		'forums'           : 'forums',
		'forums/:id'       : 'topic',
		'createTopic'      : 'createTopic',
		'user'             : 'user',
	},

	initialize: function(options) {
		this.currentView = null;
		var user = Parse.User.current();
	
		new SearchView();
		$('.display-search').hide();

		var user = Parse.User.current();
		if (user == null) {
			$('.logout').hide();
			$('.profile-button').hide();
			$('.join-button').show();
			$('.login-button').show();
		} else {
			$('.logout').show();
			$('.profile-button').show();
			$('.join-button').hide();
			$('.login-button').hide();
		}			
	},

	home: function() {
		var user = Parse.User.current();

		var user = Parse.User.current();
		if (user == null) {
			$('.logout').hide();
			$('.profile-button').hide();
			$('.join-button').show();
			$('.login-button').show();
		} else {
			$('.logout').show();
			$('.profile-button').show();
			$('.join-button').hide();
			$('.login-button').hide();
		}	
		
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
		$('.views-container').empty();
		$('.main-slidr').empty();
		$('.searchbar').show();
		var view = new HomeView();

		var gameQuery = new Parse.Query(Review);
		gameQuery.find({
			success: function(reviews) {
				reviews.forEach(function(review) {
					if (review.id === id) {
						new FullReviewView({
							model: review
						});
					}
				})
			}
		});

		var artQuery = new Parse.Query(Reviewer);
		artQuery.find({
			success: function(articles) {
				articles.forEach(function(article) {
					if (article.id === id) {
						new FullReviewView({
							model: article
						});
					}
				})
			}
		});

		var newsQuery = new Parse.Query(News);
		newsQuery.find({
			success: function(allNews) {
				allNews.forEach(function(news) {
					if (news.id === id) {
						new FullReviewView({
							model: news
						});
					}
				})
			}
		});
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

	user: function() {
		if (Parse.User.current() == undefined) {
			router.navigate('login', {trigger: true});
		} else {
			$('.views-container').empty();
			$('.main-slidr').empty();
			var user = Parse.User.current();
			var name = user.attributes.username;
			var view = new UserView({
				model: user
			});

			var gameQuery = new Parse.Query(ReviewComment);
			gameQuery.find({
				success: function(reviews) {
					reviews.forEach(function(review) {
						if (review.attributes.username == name) {
							new UserCommentView({
								model: review
							})
						}
					})
				}
			}).done(function() {
				var reviewerQuery = new Parse.Query(ReviewerComment);
				reviewerQuery.find({
					success: function(reviewers) {
						reviewers.forEach(function(reviewer) {
							if (reviewer.attributes.username == name) {
								new UserCommentView({
									model: reviewer
								})
							}
						})
					}
				});
			}).done(function() {
				var newsQuery = new Parse.Query(NewsComment);
				newsQuery.find({
					success: function(allNews) {
						allNews.forEach(function(news) {
							if (news.attributes.username == name) {
								new UserCommentView({
									model: news
								})
							}
						})
					}
				});
			}).done(function() {
				var query = new Parse.Query(Comment);
				query.find({
					success: function(forums) {
						forums.forEach(function(forum) {
							if (forum.attributes.username == name) {
								new UserCommentView({
									model: forum
								})
							}
						})
					},
				})
			})

			this.swap(view);
		}
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
		});
	},

	topic: function(id) {
		$('.forum-view').empty();
		var view = new MainForumView();
		var query = new Parse.Query(Forum);
		query.find({
			success: function(forums) {
				forums.forEach(function(forum) {
					if (forum.id === id) {
						new TopicView({
							model: forum
						});
					}
				})
			},
		});
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


