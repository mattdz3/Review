var CreateTopicView = Parse.View.extend({
	
	className: 'create-topic-view',

	template: _.template($('.create-topic-view').text()),

	events: {
		'click .create-new-topic' : 'createTopic',
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

	createTopic: function() {
		var topic = new Forum();
		var title = $('.create-topic').val();

		topic.set('name', title);

		topic.save(null, {
			success: function() {
				$('.create-topic').val('');

				router.navigate('forums', {trigger: true})
			},
			error: function(){
				console.log("nope")
			}
		});
	}
});
