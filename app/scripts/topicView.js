var TopicView = Parse.View.extend({
	
	className: 'topic-view',

	template: _.template($('.topic-view').text()),

	events: {
		'click .create-new-post' : 'newPost',
	},

	initialize: function() {
		$('.main-forum').empty();
		$('.create-new-topic').hide();
		$('.main-forum').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model.attributes)
		this.$el.html(renderTemplate);

		var modelId = this.model.id;
		console.log(modelId)

		var query = new Parse.Query(Comment)
		query.find({
			success: function(comments){
				comments.forEach(function(comment) {
					var parentId = comment.attributes.parent.id
					if (parentId === modelId) {
						new PostView({model: comment})
					}
				});
			}
		});
		return this;
	},

	newPost: function(){
		console.log("cool")
		new CreatePostView({
			model: this.model
		});
	},
});