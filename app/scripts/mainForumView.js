var MainForumView = Parse.View.extend({
	
	className: 'forum-view',

	template: _.template($('.forum-view').text()),

	events: {
		'click button' : 'newTopic',
	},

	initialize: function() {
		console.log(this.model)
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
