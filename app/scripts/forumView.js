var ForumsView = Parse.View.extend({
	
	className: 'forums-view',

	template: _.template($('.forums-view').text()),

	events: {
		"click .topic-title" : "fullView",
	},

	initialize: function() {
		$('.create-new-topic').show();
		$('.create-new-post').hide();
		$('.main-forum').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model.attributes)
		this.$el.html(renderTemplate);
		return this;
	},

	fullView: function() {
		console.log(this.model)
		var modelId = this.model.id;

		new TopicView({
			model: this.model
		});

		router.navigate('forums/' + modelId, {trigger: true})
	},
});
