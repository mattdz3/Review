var UserCommentView = Parse.View.extend({
	
	className: 'user-comment-view',

	template: _.template($('.user-comment-view').text()),

	initialize: function() {
		$('.user-posts').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model.attributes)
		this.$el.html(renderTemplate);
		return this;
	},
});