var CreatePostView = Parse.View.extend({
	
	className: 'create-post-view',

	template: _.template($('.create-post-view').text()),

	events: {
		'click button' : 'createTopic',
	},

	initialize: function() {
		console.log(this.model)
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
		var content = $('.create-post').val();
		
		comment.set('post', content);
		comment.set('parent', topic);

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
		
		// router.navigate('#forums', {trigger: true})		
	},
});

