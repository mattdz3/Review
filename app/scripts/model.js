var Review = Parse.Object.extend('review');
var User = Parse.Object.extend('User');

var ReviewCollection = Parse.Collection.extend({
	model: Review
});

var UserCollection = Parse.Collection.extend({
	model: User
});

