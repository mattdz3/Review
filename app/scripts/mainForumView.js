var MainForumView = Parse.View.extend({
	
	className: 'forum-view',

	template: _.template($('.forum-view').text()),

	events: {
		'click .create-new-topic' : 'newTopic',
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

	newTopic: function() {
		router.navigate('createTopic', {trigger: 'true'})
	}
});
