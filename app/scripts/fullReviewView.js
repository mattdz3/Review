var FullReviewView = Parse.View.extend({

	className: "full-review-container",

	events: {
		'click .create-second-review' : 'secondReview',
		'click .slidr-control'        : 'top',
		'click .load-comments'        : 'load',
		'click .post-comment'         : 'showCreate',
		'click .hide-comments'        : 'hide',
		'click .reviewPost'           : 'reviewPost',
		'click .newsPost'             : 'newsPost',
		'click .reviewerPost'         : 'reviewerPost',
	},

	template: _.template($('.full-review-view').text()),

	initialize: function() {
		$('.sidebar').hide();
		$('.review-container').append(this.el);
		console.log(this.model)
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

		var modelId = this.model.id;
		console.log(modelId)

		var query = new Parse.Query(ReviewComment)
		
		query.find({
			success: function(comments){
				comments.forEach(function(comment) {
					console.log(comment)
					var parentId = comment.attributes.parent.id

					if (parentId === modelId) {
						$('.newsPost').hide();
						$('.reviewerPost').hide();
						new CommentView({model: comment})
					}
				});
			}
		});

		var query = new Parse.Query(NewsComment)
		
		query.find({
			success: function(comments){
				comments.forEach(function(comment) {
					console.log(comment)
					var parentId = comment.attributes.parent.id

					if (parentId === modelId) {
						$('.reviewPost').hide();
						$('.reviewerPost').hide();
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
					console.log(comment)
					var parentId = comment.attributes.parent.id

					if (parentId === modelId) {
						$('.newsPost').hide();
						$('.reviewPost').hide();
						new CommentView({model: comment})
					}
				});
			}
		});
	},

	hide: function() {
		$('.comment-container').slideUp();
	},

	showCreate: function() {
		$('.create-comment').slideDown();
	},

	reviewPost: function() {
		var topic = this.model;
		var comment = new ReviewComment();
		var content = $('.comment').val();

		comment.set('post', content);
		comment.set('parent', topic);

		comment.save({
			success: function(comment) {
				var relation = topic.relation("comments");
				relation.add(comment);
				topic.save();
			},
			error: function(comment, error) {
                console.log(error.code+"::"+error.message);
            }
		});
		
		$('.create-comment').slideUp();
	},

	newsPost: function() {
		var topic = this.model;
		var comment = new NewsComment();
		var content = $('.comment').val();

		comment.set('post', content);
		comment.set('parent', topic);

		comment.save({
			success: function(comment) {
				console.log(comment)
				var relation = topic.relation("comments");
				relation.add(comment);
				topic.save();
			},
			error: function(comment, error) {
                console.log(error.code+"::"+error.message);
            }
		});
		
		$('.create-comment').slideUp();
	},

	reviewerPost: function() {
		var topic = this.model;
		var comment = new ReviewerComment();
		var content = $('.comment').val();

		comment.set('post', content);
		comment.set('parent', topic);

		comment.save({
			success: function(comment) {
				console.log(comment)
				var relation = topic.relation("comments");
				relation.add(comment);
				topic.save();
			},
			error: function(comment, error) {
                console.log(error.code+"::"+error.message);
            }
		});
		
		$('.create-comment').slideUp();
	}
});



