var SearchView = Parse.View.extend({

	tagName: 'span',
	
	className: 'search-view',

	events: {
		'keyup input' : 'search',
	},

	template: _.template($('.search-view').text()),

	initialize: function() {
		$('.searchbar').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model)
		this.$el.html(renderTemplate);
		return this;
	},

	search: function() {
		if ($('.search').val() == '') {
			$('.display-search').hide();
		} else {
			$('.display-search').show();
			$('.display-search').empty();
			$('.review-container').empty();
			var search = $('.search').val();

			var gameQuery = new Parse.Query(Review);
			gameQuery.find({
				success: function(reviews) {
					reviews.forEach(function(review) {
						var reviewName = review.attributes.name;
						var searchTerm = reviewName.toLowerCase();

						if (searchTerm.search(search) != -1) {
							new DisplaySearchView({
								model: review
							});
						} else {
							$('.display-search').html('No Results');
						}
					})
				}
			}).done(function() {
				var reviewerQuery = new Parse.Query(Reviewer);
				reviewerQuery.find({
					success: function(reviewers) {
						reviewers.forEach(function(reviewer) {
							var reviewerName = reviewer.attributes.name;
							var searchTerm = reviewerName.toLowerCase();
							if (searchTerm.search(search) != -1) {
								new DisplaySearchView({
									model: reviewer
								});
							} else {
								$('.display-search').html('No Results');
							}
						})
					}
				});
			}).done(function() {
				var newsQuery = new Parse.Query(News);
				newsQuery.find({
					success: function(allNews) {
						allNews.forEach(function(news) {
							var newsName = news.attributes.name;
							var searchTerm = newsName.toLowerCase();
							if (searchTerm.search(search) != -1) {
								new DisplaySearchView({
									model: news
								});
							} else {
								$('.display-search').html('No Results');
							}
						});
					}
				});
			});
		}
	}
});