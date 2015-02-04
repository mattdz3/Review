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
		var title = $('.create-topic').val();
		var post = $('.create-post').val();


		topic.set('name', title);

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

			comment.save().then(function() {
				var relation = topic.relation("comments");
				relation.add(comment);
				topic.save();
			});
		})
	}
});
