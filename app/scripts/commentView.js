var CommentView = Parse.View.extend({
	
	className: 'comment-view',

	template: _.template($('.comment-view').text()),

	initialize: function() {
		$('.comments-container').append(this.el);
		this.render();
		console.log(this.model)
	},

	render: function() {
		var renderTemplate = this.template(this.model)
		this.$el.html(renderTemplate);
		return this;
	},
});