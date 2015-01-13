var FullReviewView = Parse.View.extend({

	className: "full-review-container",

	events: {
		'click .create-second-review' : 'secondReview',
		'click .slidr-control'        : 'top',
		'click .load-comments'        : 'load',
		'click .post-comment'         : 'showCreate',
		'click .hide-comments'        : 'hide',
		'click .create'               : 'create',
	},

	template: _.template($('.full-review-view').text()),

	initialize: function() {
		$('.sidebar').hide();
		$('.review-container').append(this.el);
		console.log(this.model)
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model.attributes)
		this.$el.html(renderTemplate);

		var reviewSlider = slidr.create('slidr-id', {
		  breadcrumbs: true,
		  controls: 'corner',
		  direction: 'h',
		  fade: true,
		  keyboard: true,
		  overflow: false,
		  pause: false,
		  theme: '#222',
		  timing: { 'linear': '.8s ease-in' },
		  touch: true,
		  transition: 'linear'
		});

		reviewSlider.start();	

		return this;
	},

	top: function() {
		$('body').animate({
        	scrollTop: $('.full-review-header-img').offset().top
    	}, 0);
	},

	secondReview: function() {
		$('.reviews-container').empty();
		new CreateSecondReviewView({model: this.model})
	},

	load: function() {
		$('.comment-container').slideDown();
	},

	hide: function() {
		$('.comment-container').slideUp();
	},

	showCreate: function() {
		$('.create-comment').slideDown();
	},

	create: function() {
		var topic = this.model;
		var id = topic.id;

		var comment = new Comment();
		var content = $('.comment').val();
		console.log(comment)
		
		comment.set('post', content);
		comment.set('parent', topic);

		comment.save().then(function() {
			var relation = topic.relation("comments");
			relation.add(comment);
			topic.save();
		});

		$('.create-comment').slideUp();
	}
});



