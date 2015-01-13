var Review = Parse.Object.extend('review');
var User = Parse.Object.extend('User');
var News = Parse.Object.extend('News');
var Reviewer = Parse.Object.extend('Reviewer');
var Forum = Parse.Object.extend('Forum');
var Comment = Parse.Object.extend('Comment');
var ReviewComment = Parse.Object.extend('ReviewComment');
var NewsComment = Parse.Object.extend('NewsComment');
var ReviewerComment = Parse.Object.extend('ReviewerComment');

var ReviewCollection = Parse.Collection.extend({
	model: Review
});

var UserCollection = Parse.Collection.extend({
	model: User
});

var NewsCollection = Parse.Collection.extend({
	model: News
});

var ReviewerCollection = Parse.Collection.extend({
	model: Reviewer
});

var ForumCollection = Parse.Collection.extend({
	model: Forum
});

var CommentCollection = Parse.Collection.extend({
	model: Comment
});

var ReviewCommentCollection = Parse.Collection.extend({
	model: ReviewComment
});