var SlidrView = Parse.View.extend({
	
	className: 'slidr-container',

	template: _.template($('.slidr-view').text()),

	initialize: function() {
		$('.main-slidr').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model)
		this.$el.html(renderTemplate);

		var mainSlider = slidr.create('slidr-img', {
			breadcrumbs: false,
			controls: 'none',
			direction: 'h',
			fade: true,
			keyboard: true,
			overflow: false,
			pause: false,
			theme: '#222',
			timing: { 'linear': '.2s ease-in' },
			touch: true,
			transition: 'linear'
		});

		mainSlider.add('h', ['one', 'two', 'three', 'one'])

		mainSlider.auto();
		return this;
	},
});

