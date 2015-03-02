var CreatePostView = Parse.View.extend({
	
	className: 'create-post-view',

	template: _.template($('.create-post-view').text()),

	events: {
		'click button' : 'createTopic',
	},

	initialize: function() {
		$('.create-new-post').hide();
		$('.views-container').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model)
		this.$el.html(renderTemplate);
		return this;
	},

	createTopic: function() {
		var topic = this.model;
		var id = topic.id;
		var comment = new Comment();
		var user = Parse.User.current();
		var content = $('.create-post').val();

		if (content == "" || user == undefined) {
			alert("You need to write something or login!")
		} else {
			var pic = user.attributes.userPic;
			var username = user.attributes.username;

			comment.set('post', content);
			comment.set('parent', topic);
			comment.set('username', username);
			comment.set('userPhoto', pic);

			comment.save().then(function() {
				var relation = topic.relation("comments");
				relation.add(comment);
				topic.save();
			}).done(function() {
				$('.posts').empty();
				var query = new Parse.Query(Comment)
				query.find({
					success: function(comments){
						comments.forEach(function(comment) {
							var parentId = comment.attributes.parent.id
							if (parentId === id) {
								new PostView({model: comment})
							}
						});
					}
				});
			})

			$('.create-post-view').hide();
		}		
	},
});

