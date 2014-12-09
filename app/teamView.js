var TeamView = Parse.View.extend({

	template: _.template($('.team-view').text()),

	initialize: function() {
		$('.team-container').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model)
		this.$el.html(renderTemplate);

		var mainSlider = slidr.create('img-slidr', {
			// after: function(e) { console.log('in: ' + e.in.slidr); },
			// before: function(e) { console.log('out: ' + e.out.slidr); },
			breadcrumbs: true,
			controls: 'border',
			direction: 'h',
			fade: true,
			keyboard: true,
			overflow: false,
			pause: true,
			theme: '#222',
			timing: { 'linear': '.4s ease-in' },
			touch: true,
			transition: 'linear'
		});

		// mainSlider.add('h', ['one', 'two', 'three', 'one'])

		mainSlider.auto();

		return this;
	},
});