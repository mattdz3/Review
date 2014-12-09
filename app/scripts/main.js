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

mainSlider.add('h', ['one', 'two', 'three', 'one'])

mainSlider.auto();
