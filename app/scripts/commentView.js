var CommentView = Parse.View.extend({
	
	className: 'comment-view',

	template: _.template($('.comment-view').text()),

	initialize: function() {
		console.log(this.model)
		$('.comments-container').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model)
		this.$el.html(renderTemplate);
		return this;
	},
});