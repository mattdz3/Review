var FullReviewView = Parse.View.extend({

	className: "full-review-container",

	events: {
		'click .create-second-review' : 'secondReview',
		'click .slidr-control'        : 'top',
		'click .load-comments'        : 'load',
		'click .hide-comments'        : 'hide',
		'click .reviewPost'           : 'reviewPost',
		'click .newsPost'             : 'newsPost',
		'click .reviewerPost'         : 'reviewerPost',
	},

	template: _.template($('.full-review-view').text()),

	initialize: function() {
		$('.sidebar').hide();
		$('.create-second-review').hide();
		$('.review-container').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model.attributes)
		this.$el.html(renderTemplate);

		var reviewSlider = slidr.create('slidr-id', {
		  breadcrumbs: true,
		  controls: 'corner',
		  direction: 'h',
		  fade: true,
		  keyboard: true,
		  overflow: false,
		  pause: false,
		  theme: '#222',
		  timing: { 'linear': '.8s ease-in' },
		  touch: true,
		  transition: 'linear'
		});

		reviewSlider.start();	

		return this;
	},

	top: function() {
		$('body').animate({
        	scrollTop: $('.full-review-header-img').offset().top
    	}, 0);
	},

	secondReview: function() {
		$('.reviews-container').empty();
		new CreateSecondReviewView({model: this.model})
	},

	load: function() {
		$('.comment-container').slideDown();
		$('.comments-container').empty();
		$('.newsPost').hide();
		$('.reviewPost').hide();
		$('.reviewerPost').hide();

		var modelId = this.model.id;
		console.log(modelId)

		var query = new Parse.Query(ReviewComment)
		query.find({
			success: function(comments){
				comments.forEach(function(comment) {
					var parentId = comment.attributes.parent.id
					if (parentId === modelId) {
						$('.reviewPost').show();
						new CommentView({model: comment})
					}
				});
			}
		});

		var query = new Parse.Query(NewsComment)
		query.find({
			success: function(comments){
				comments.forEach(function(comment) {
					var parentId = comment.attributes.parent.id
					if (parentId === modelId) {
						$('.newsPost').show();
						new CommentView({model: comment})
					}
				});
			}
		});

		var query = new Parse.Query(ReviewerComment)
		$('.newsPost').hide();
		$('.reviewPost').hide();
		query.find({
			success: function(comments){
				comments.forEach(function(comment) {
					var parentId = comment.attributes.parent.id
					if (parentId === modelId) {
						$('.reviewerPost').show();
						new CommentView({model: comment})
					}
				});
			}
		});
	},

	hide: function() {
		$('.comment-container').slideUp();
	},

	reviewPost: function() {
		var topic = this.model;
		var comment = new ReviewComment();
		var content = $('.comment').val();
		var that = this;
		comment.set('post', content);
		comment.set('parent', topic);

		comment.save({
			success: function(comment) {
				var relation = topic.relation("comments");
				relation.add(comment);
				topic.save();
				that.load();
			},
			error: function(comment, error) {
                console.log(error.code+"::"+error.message);
            }
		});
		$('.comment').val('');
	},

	newsPost: function() {
		var topic = this.model;
		var comment = new NewsComment();
		var content = $('.comment').val();
		var that = this;
		comment.set('post', content);
		comment.set('parent', topic);

		comment.save({
			success: function(comment) {
				var relation = topic.relation("comments");
				relation.add(comment);
				topic.save();
				that.load();
			},
			error: function(comment, error) {
                console.log(error.code+"::"+error.message);
            }
		});
		$('.comment').val('');
	},

	reviewerPost: function() {
		var topic = this.model;
		var comment = new ReviewerComment();
		var content = $('.comment').val();
		var that = this;
		comment.set('post', content);
		comment.set('parent', topic);

		comment.save({
			success: function(comment) {
				var relation = topic.relation("comments");
				relation.add(comment);
				topic.save();
				that.load();
			},
			error: function(comment, error) {
                console.log(error.code+"::"+error.message);
            }
		});
		$('.comment').val('');
	}
});



