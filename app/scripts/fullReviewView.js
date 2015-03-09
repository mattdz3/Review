var FullReviewView = Parse.View.extend({

	className: "full-review-container",

	events: {
		'click .next-button'          : 'top',
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

		return this;
	},

	top: function() {
		$('body').animate({
        	scrollTop: $('.full-review-header-img').offset().top
    	}, 0);
		$('.first-review').fadeToggle();
    	$('.second-review').fadeToggle();
	},



	load: function() {
		$('.comment-container').slideDown();
		$('.comments-container').empty();
		$('.newsPost').hide();
		$('.reviewPost').hide();
		$('.reviewerPost').hide();

		var modelId = this.model.id;

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
		var user = Parse.User.current();
		
		var that = this;

		if (content == ""){
			alert("You didn't write anything!");
		} else if (user == null) {
			alert("Login to leave a comment!");
		} else {
			var pic = user.attributes.userPic;
			var username = user.attributes.username;

			comment.set('post', content);
			comment.set('parent', topic);
			comment.set('username', username);
			comment.set('userPhoto', pic);

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
	},

	newsPost: function() {
		var topic = this.model;
		var comment = new NewsComment();
		var content = $('.comment').val();
		var user = Parse.User.current();
		
		var that = this;

		if (content == "") {
			alert("You didn't write anything!");
		} else if (user == null) {
			alert("Login to leave a comment!");
		} else {
			var pic = user.attributes.userPic;
			var username = user.attributes.username;

			comment.set('post', content);
			comment.set('parent', topic);
			comment.set('username', username);
			comment.set('userPhoto', pic);

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
	},

	reviewerPost: function() {
		var topic = this.model;
		var comment = new ReviewerComment();
		var content = $('.comment').val();
		var user = Parse.User.current();
		
		var that = this;

		if (content == "") {
			alert("You didn't write anything!");
		} else if (user == null) {
			alert("Login to leave a comment!");
		} else {
			var pic = user.attributes.userPic;
			var username = user.attributes.username;
			
			comment.set('post', content);
			comment.set('parent', topic);
			comment.set('username', username);
			comment.set('userPhoto', pic);

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
	}
});



