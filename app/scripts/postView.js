var PostView = Parse.View.extend({
	
	className: 'post-view',

	template: _.template($('.post-view').text()),

	initialize: function() {
		$('.posts').append(this.el);
		console.log(this.model)
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model)
		this.$el.html(renderTemplate);
		return this;
	},
});