var pic;

var UserView = Parse.View.extend({
	
	className: 'user-view',

	template: _.template($('.user-view').text()),

	events: {
		'click .edit' : 'edit',
		'click .save'  : 'save'
	},

	initialize: function() {
		$('.views-container').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model.attributes)
		this.$el.html(renderTemplate);
		return this;
	},

	edit: function() {
		filepicker.pick(function(InkBlobs){
			pic = InkBlobs.url
		});	
	},

	save: function() {
		if (pic == undefined) {
			alert("Set a picture first!")
		} else {
			var user = Parse.User.current();
			user.set('userPic', pic);
			user.save();
		}
	}
});