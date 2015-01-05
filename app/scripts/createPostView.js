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
		var comment = new Comment();
		var content = $('.create-post').val();
		var commentObj = comment.attributes;
		
		comment.set('parent', topic);
		comment.set('comment', content);

		comment.save().then(function() {
			var relation = topic.relation("comments");
			relation.add(comment);
			topic.save();
		});
	},
});

