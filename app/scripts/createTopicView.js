var CreateTopicView = Parse.View.extend({
	
	className: 'create-topic-view',

	template: _.template($('.create-topic-view').text()),

	events: {
		'click button' : 'createTopic',
	},

	initialize: function() {
		$('.views-container').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model)
		this.$el.html(renderTemplate);
		return this;
	},

	createTopic: function() {
		var topic = new Forum();
		var comment = new Comment();
		var user = Parse.User.current();
		var title = $('.create-topic').val();
		var post = $('.create-post').val();

		if (title == "" || post == "" || user == null) {
			alert("Did you write something or do you need to login?")
		} else {
			var pic = user.attributes.userPic;
			var username = user.attributes.username;

			topic.set('name', title);
			topic.set('username', username);
			topic.set('userPhoto', pic);
			topic.save(null, {
				success: function() {
					$('.create-topic').val('');

					router.navigate('forums', {trigger: true})
				},
				error: function(){
					console.log("nope")
				}
			}).then(function() {
				comment.set('post', post);
				comment.set('parent', topic);
				comment.set('username', username);
				comment.set('userPhoto', pic);

				comment.save().then(function() {
					var relation = topic.relation("comments");
					relation.add(comment);
					topic.save();
				});
			})
		}
	}
});
