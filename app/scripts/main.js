Parse.initialize("qStdqzNUq7WnxxK5mu1VHFHVjU3JXo4frzcxeRmH", "s6f6SjFKLmGVlA7oqHfecJCE7u1K0Am9Yzb9hE6t");

$('.title').click(function(){
	router.navigate('home', {trigger: true})
});

$('.logout').click(function() {
	Parse.User.logOut();
	router.navigate("", {trigger: true})
	console.log(Parse.User.current());
});

