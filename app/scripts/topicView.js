var TopicView = Parse.View.extend({
	
	className: 'topic-view',

	template: _.template($('.topic-view').text()),

	events: {
		'click .create-new-post' : 'newPost',
	},

	initialize: function() {
		console.log(this.model)
		$('.main-forum').empty();
		$('.create-new-topic').hide();
		$('.main-forum').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model.attributes)
		this.$el.html(renderTemplate);
		return this;
	},

	newPost: function(){
		console.log("cool")
		new CreatePostView({
			model: this.model
		});
	},
});