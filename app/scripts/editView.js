var EditView = Parse.View.extend({
	
	className: 'edit-view',

	template: _.template($('.edit-view').text()),

	initialize: function() {
		$('.views-container').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model)
		this.$el.html(renderTemplate);
		return this;
	},
});