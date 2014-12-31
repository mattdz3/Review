Parse.initialize("qStdqzNUq7WnxxK5mu1VHFHVjU3JXo4frzcxeRmH", "s6f6SjFKLmGVlA7oqHfecJCE7u1K0Am9Yzb9hE6t");

filepicker.setKey("AFLbZroQeC5fnjZH5RpUAz");


$('.title').click(function(){
	router.navigate('home', {trigger: true})
});

$('.logout').click(function() {
	Parse.User.logOut();
	router.navigate("home", {trigger: true})
	alert('user has logged out!')
});



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

		mainSlider.add('h', ['one', 'two', 'one'])

		mainSlider.auto();