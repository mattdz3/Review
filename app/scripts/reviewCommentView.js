var ReviewCommentView = Parse.View.extend({
	
	className: 'create-review-comment',

	template: _.template($('.review-comment-view').text()),

	events: {
		'click button' : 'createTopic',
	},

	initialize: function() {
		console.log(this.model)
		$('.create-comments').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model)
		this.$el.html(renderTemplate);
		return this;
	},

	createTopic: function() {
		var topic = this.model;
		console.log(topic)
		var id = topic.id;
		var comment = new Comment();
		var content = $('.comment').val();
		
		comment.set('post', content);
		comment.set('parent', topic);
		console.log(comment)

		comment.save().then(function() {
			var relation = topic.relation("comments");
			relation.add(comment);
			topic.save();
		});
	},
});