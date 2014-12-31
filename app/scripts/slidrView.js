var SlidrView = Parse.View.extend({
	
	className: 'slidr-container',

	template: _.template($('.slidr-view').text()),

	initialize: function() {
		$('.main-slidr').empty();
		$('.main-slidr').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model)
		this.$el.html(renderTemplate);

		
		return this;
	},

});

