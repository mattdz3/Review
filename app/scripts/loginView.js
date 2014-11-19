var LoginView = Parse.View.extend({
	
	template: _.template($('.login-view').text()),

	events: {
		'click .login' : "userLogin"
	},

	initialize: function() {
		$('.views-container').append(this.el);
		this.render();
	},

	render: function() {
		var renderTemplate = this.template(this.model)
		this.$el.html(renderTemplate);
		return this;
	},

	userLogin: function() {
		var user = new Parse.User();

		Parse.User.logIn($('.username').val(), $('.password').val(), {
			success: function(user) {

				currentUser = Parse.User.current();
				router.navigate('home', {trigger: true});
			},

			error: function(user, error) {
				alert("Error" + error.code + " " + error.message)
			}
		})	
	},
});