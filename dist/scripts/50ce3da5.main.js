Parse.initialize("qStdqzNUq7WnxxK5mu1VHFHVjU3JXo4frzcxeRmH","s6f6SjFKLmGVlA7oqHfecJCE7u1K0Am9Yzb9hE6t"),filepicker.setKey("AFLbZroQeC5fnjZH5RpUAz"),$(".title").click(function(){router.navigate("home",{trigger:!0})}),$(".logout").click(function(){Parse.User.logOut(),router.navigate("home",{trigger:!0}),alert("user has logged out!")}),$(".hb-menu").click(function(){$(".top-nav-two").slideToggle(),$("li").click(function(){$(".top-nav-two").slideUp()}),$(".views-container").click(function(){$(".top-nav-two").slideUp()})}),$(".about-us-footer").click(function(){$("body").animate({scrollTop:$(".header").offset().top},0)});var Review=Parse.Object.extend("review"),User=Parse.Object.extend("User"),News=Parse.Object.extend("News"),Reviewer=Parse.Object.extend("Reviewer"),Forum=Parse.Object.extend("Forum"),Comment=Parse.Object.extend("Comment"),ReviewComment=Parse.Object.extend("ReviewComment"),NewsComment=Parse.Object.extend("NewsComment"),ReviewerComment=Parse.Object.extend("ReviewerComment"),ReviewCollection=Parse.Collection.extend({model:Review}),UserCollection=Parse.Collection.extend({model:User}),NewsCollection=Parse.Collection.extend({model:News}),ReviewerCollection=Parse.Collection.extend({model:Reviewer}),ForumCollection=Parse.Collection.extend({model:Forum}),CommentCollection=Parse.Collection.extend({model:Comment}),ReviewCommentCollection=Parse.Collection.extend({model:ReviewComment}),HomeView=Parse.View.extend({className:"main-view",template:_.template($(".home-view").text()),initialize:function(){$(".views-container").append(this.el),this.render()},render:function(){var a=this.template(this.model);return this.$el.html(a),this}}),SideGameView=Parse.View.extend({className:"side-game",events:{"click div":"renderReview"},template:_.template($(".side-view").text()),initialize:function(){$(".game-sidebar").append(this.el),this.render()},render:function(){var a=this.template(this.model.attributes);return this.$el.html(a),this},renderReview:function(){var a=this.model.id;$("body").animate({scrollTop:$(".header").offset().top},0),router.navigate("home/"+a,{trigger:!0})}}),SideNewsView=Parse.View.extend({className:"side-game",events:{"click div":"renderReview"},template:_.template($(".side-view").text()),initialize:function(){$(".news-sidebar").append(this.el),this.render()},render:function(){var a=this.template(this.model.attributes);return this.$el.html(a),this},renderReview:function(){var a=this.model.id;$("body").animate({scrollTop:$(".header").offset().top},0),router.navigate("home/"+a,{trigger:!0})}}),SideReviewerView=Parse.View.extend({className:"side-game",events:{"click div":"renderReview"},template:_.template($(".side-view").text()),initialize:function(){$(".reviewer-sidebar").append(this.el),this.render()},render:function(){var a=this.template(this.model.attributes);return this.$el.html(a),this},renderReview:function(){var a=this.model.id;$("body").animate({scrollTop:$(".header").offset().top},0),router.navigate("home/"+a,{trigger:!0})}}),MainSideView=Parse.View.extend({className:"side-slidr-container",template:_.template($(".main-side-view").text()),events:{click:"renderFull",mouseenter:"hover",mouseleave:"out"},initialize:function(){$(".main-side-container").append(this.el),this.render()},render:function(){var a=this.template(this.model.attributes);return this.$el.html(a),this},renderFull:function(){var a=this.model.id;$("body").animate({scrollTop:$(".header").offset().top},0),router.navigate("home/"+a,{trigger:!0})},hover:function(){$(".overlay-name").css("display","block")},out:function(){$(".overlay-name").css("display","none")}}),SlidrView=Parse.View.extend({className:"slidr-container",template:_.template($(".slidr-view").text()),initialize:function(){$(".main-slidr").append(this.el),this.render()},render:function(){var a=this.template(this.model);this.$el.html(a);var b=slidr.create("slidr-img",{breadcrumbs:!1,controls:"none",direction:"h",fade:!0,keyboard:!0,overflow:!1,pause:!1,theme:"#222",timing:{linear:".2s ease-in"},touch:!0,transition:"linear"});return b.add("h",["one","two","one"]),b.auto(),this}}),LoginView=Parse.View.extend({className:"user-container",template:_.template($(".login-view").text()),events:{"click .login":"userLogin"},initialize:function(){$(".views-container").append(this.el),this.render()},render:function(){var a=this.template(this.model);return this.$el.html(a),this},userLogin:function(){new Parse.User;Parse.User.logIn($(".username").val(),$(".password").val(),{success:function(){currentUser=Parse.User.current(),router.navigate("home",{trigger:!0})},error:function(a,b){alert("Error"+b.code+" "+b.message)}})}}),pic,JoinView=Parse.View.extend({className:"user-container",template:_.template($(".join-view").text()),events:{"click .create":"createUser","click .user-pic":"addPic"},initialize:function(){$(".views-container").append(this.el),this.render()},render:function(){var a=this.template(this.model);return this.$el.html(a),this},addPic:function(){filepicker.pick(function(a){pic=a.url})},createUser:function(){var a=new Parse.User;a.set("username",$(".username").val()),a.set("password",$(".password").val()),a.set("userPic",pic),a.signUp(null,{success:function(){var a=Parse.User.current();a?router.navigate("home",{trigger:!0}):console.log("current user not set")},error:function(a,b){alert(b.message+". Sorry try again!")}})}}),ReviewView=Parse.View.extend({className:"review-contents",template:_.template($(".review-view").text()),events:{"click .full-review":"renderFull"},initialize:function(){$(".reviews-container").append(this.el),this.render()},render:function(){var a=this.template(this.model.attributes);return this.$el.html(a),this},renderFull:function(){var a=this.model.id;$("body").animate({scrollTop:$(".header").offset().top},0),router.navigate("home/"+a,{trigger:!0})}}),FullReviewView=Parse.View.extend({className:"full-review-container",events:{"click .next-button":"top","click .load-comments":"load","click .hide-comments":"hide","click .reviewPost":"reviewPost","click .newsPost":"newsPost","click .reviewerPost":"reviewerPost"},template:_.template($(".full-review-view").text()),initialize:function(){$(".review-container").append(this.el),this.render()},render:function(){var a=this.template(this.model.attributes);return this.$el.html(a),$(".sidebar").hide(),$(".reviews-container").empty(),$(".second-review").hide(),$(".main-slidr").empty(),$(".comment-container").hide(),$(".review-container").show(),this},top:function(){$("body").animate({scrollTop:$(".full-review-header-img").offset().top},0),$(".first-review").fadeToggle(),$(".second-review").fadeToggle()},load:function(){$(".comment-container").slideDown(),$(".comments-container").empty(),$(".newsPost").hide(),$(".reviewPost").hide(),$(".reviewerPost").hide();var a=this.model.id,b=new Parse.Query(ReviewComment);b.find({success:function(b){b.forEach(function(b){var c=b.attributes.parent.id;c===a&&($(".reviewPost").show(),new CommentView({model:b}))})}});var b=new Parse.Query(NewsComment);b.find({success:function(b){b.forEach(function(b){var c=b.attributes.parent.id;c===a&&($(".newsPost").show(),new CommentView({model:b}))})}});var b=new Parse.Query(ReviewerComment);$(".newsPost").hide(),$(".reviewPost").hide(),b.find({success:function(b){b.forEach(function(b){var c=b.attributes.parent.id;c===a&&($(".reviewerPost").show(),new CommentView({model:b}))})}})},hide:function(){$(".comment-container").slideUp()},reviewPost:function(){var a=this.model,b=new ReviewComment,c=$(".comment").val(),d=Parse.User.current(),e=this;if(""==c)alert("You didn't write anything!");else if(null==d)alert("Login to leave a comment!");else{var f=d.attributes.userPic,g=d.attributes.username;b.set("post",c),b.set("parent",a),b.set("username",g),b.set("userPhoto",f),b.save({success:function(b){var c=a.relation("comments");c.add(b),a.save(),e.load()},error:function(a,b){console.log(b.code+"::"+b.message)}}),$(".comment").val("")}},newsPost:function(){var a=this.model,b=new NewsComment,c=$(".comment").val(),d=Parse.User.current(),e=this;if(""==c)alert("You didn't write anything!");else if(null==d)alert("Login to leave a comment!");else{var f=d.attributes.userPic,g=d.attributes.username;b.set("post",c),b.set("parent",a),b.set("username",g),b.set("userPhoto",f),b.save({success:function(b){var c=a.relation("comments");c.add(b),a.save(),e.load()},error:function(a,b){console.log(b.code+"::"+b.message)}}),$(".comment").val("")}},reviewerPost:function(){var a=this.model,b=new ReviewerComment,c=$(".comment").val(),d=Parse.User.current(),e=this;if(""==c)alert("You didn't write anything!");else if(null==d)alert("Login to leave a comment!");else{var f=d.attributes.userPic,g=d.attributes.username;b.set("post",c),b.set("parent",a),b.set("username",g),b.set("userPhoto",f),b.save({success:function(b){var c=a.relation("comments");c.add(b),a.save(),e.load()},error:function(a,b){console.log(b.code+"::"+b.message)}}),$(".comment").val("")}}}),NewsView=Parse.View.extend({className:"review-contents",template:_.template($(".news-view").text()),events:{"click .full-review":"renderFull"},initialize:function(){$(".reviews-container").append(this.el),this.render()},render:function(){var a=this.template(this.model.attributes);return this.$el.html(a),this},renderFull:function(){var a=this.model.id;$("body").animate({scrollTop:$(".header").offset().top},0),router.navigate("home/"+a,{trigger:!0})}}),ReviewerView=Parse.View.extend({className:"review-contents",template:_.template($(".reviewer-view").text()),events:{"click .full-review":"renderFull"},initialize:function(){$(".reviews-container").append(this.el),this.render()},render:function(){var a=this.template(this.model.attributes);return this.$el.html(a),this},renderFull:function(){var a=this.model.id;$("body").animate({scrollTop:$(".header").offset().top},0),router.navigate("home/"+a,{trigger:!0})}}),VideoView=Parse.View.extend({className:"video",template:_.template($(".video-view").text()),initialize:function(){$(".views-container").append(this.el),this.render()},render:function(){var a=this.template(this.model);return this.$el.html(a),this}}),MainForumView=Parse.View.extend({className:"forum-view",template:_.template($(".forum-view").text()),events:{"click .create-new-topic":"newTopic"},initialize:function(){$(".views-container").append(this.el),this.render()},render:function(){var a=this.template(this.model);return this.$el.html(a),this},newTopic:function(){router.navigate("createTopic",{trigger:"true"})}}),ForumsView=Parse.View.extend({className:"forums-view",template:_.template($(".forums-view").text()),events:{"click .topic-container":"fullView"},initialize:function(){$(".main-forum").append(this.el),this.render()},render:function(){var a=this.template(this.model.attributes);return this.$el.html(a),this},fullView:function(){var a=this.model.id;router.navigate("forums/"+a,{trigger:!0})}}),TeamView=Parse.View.extend({className:"team-view",template:_.template($(".team-view").text()),initialize:function(){$(".views-container").append(this.el),this.render()},render:function(){var a=this.template(this.model);return this.$el.html(a),this}}),TopicView=Parse.View.extend({className:"topic-view",template:_.template($(".topic-view").text()),events:{"click .create-new-post":"newPost"},initialize:function(){$(".main-forum").empty(),$(".create-new-topic").hide(),$(".main-forum").append(this.el),this.render()},render:function(){var a=this.template(this.model.attributes);this.$el.html(a);var b=this.model.id,c=new Parse.Query(Comment);return c.find({success:function(a){a.forEach(function(a){var c=a.attributes.parent.id;c===b&&new PostView({model:a})})}}),this},newPost:function(){new CreatePostView({model:this.model})}}),CreateTopicView=Parse.View.extend({className:"create-topic-view",template:_.template($(".create-topic-view").text()),events:{"click button":"createTopic"},initialize:function(){$(".views-container").append(this.el),this.render()},render:function(){var a=this.template(this.model);return this.$el.html(a),this},createTopic:function(){var a=new Forum,b=new Comment,c=Parse.User.current(),d=$(".create-topic").val(),e=$(".create-post").val();if(""==d||""==e||null==c)alert("Did you write something or do you need to login?");else{var f=c.attributes.userPic,g=c.attributes.username;a.set("name",d),a.set("username",g),a.set("userPhoto",f),a.save(null,{success:function(){$(".create-topic").val(""),router.navigate("forums",{trigger:!0})},error:function(){console.log("nope")}}).then(function(){b.set("post",e),b.set("parent",a),b.set("username",g),b.set("userPhoto",f),b.save().then(function(){var c=a.relation("comments");c.add(b),a.save()})})}}}),CreatePostView=Parse.View.extend({className:"create-post-view",template:_.template($(".create-post-view").text()),events:{"click button":"createTopic"},initialize:function(){$(".create-new-post").hide(),$(".views-container").append(this.el),this.render()},render:function(){var a=this.template(this.model);return this.$el.html(a),this},createTopic:function(){var a=this.model,b=a.id,c=new Comment,d=Parse.User.current(),e=$(".create-post").val();if(""==e||void 0==d)alert("You need to write something or login!");else{var f=d.attributes.userPic,g=d.attributes.username;c.set("post",e),c.set("parent",a),c.set("username",g),c.set("userPhoto",f),c.save().then(function(){var b=a.relation("comments");b.add(c),a.save()}).done(function(){$(".posts").empty();var a=new Parse.Query(Comment);a.find({success:function(a){a.forEach(function(a){var c=a.attributes.parent.id;c===b&&new PostView({model:a})})}})}),$(".create-post-view").hide()}}}),pic,UserView=Parse.View.extend({className:"user-view",template:_.template($(".user-view").text()),events:{"click .edit":"edit","click .save":"save"},initialize:function(){$(".views-container").append(this.el),this.render()},render:function(){var a=this.template(this.model.attributes);return this.$el.html(a),this},edit:function(){filepicker.pick(function(a){pic=a.url})},save:function(){if(void 0==pic)alert("Set a picture first!");else{var a=Parse.User.current();a.set("userPic",pic),a.save()}}}),UserCommentView=Parse.View.extend({className:"user-comment-view",template:_.template($(".user-comment-view").text()),initialize:function(){$(".user-posts").append(this.el),this.render()},render:function(){var a=this.template(this.model.attributes);return this.$el.html(a),this}}),CommentView=Parse.View.extend({className:"comment-view",template:_.template($(".comment-view").text()),initialize:function(){$(".comments-container").append(this.el),this.render()},render:function(){var a=this.template(this.model);return this.$el.html(a),this}}),PostView=Parse.View.extend({className:"post-view",template:_.template($(".post-view").text()),initialize:function(){$(".posts").append(this.el),this.render()},render:function(){var a=this.template(this.model);return this.$el.html(a),this}}),SearchView=Parse.View.extend({tagName:"span",className:"search-view",events:{"keyup input":"search"},template:_.template($(".search-view").text()),initialize:function(){$(".searchbar").append(this.el),this.render()},render:function(){var a=this.template(this.model);return this.$el.html(a),this},search:function(){if(""==$(".search").val())$(".display-search").hide();else{$(".display-search").show(),$(".display-search").empty(),$(".review-container").empty();var a=$(".search").val(),b=new Parse.Query(Review);b.find({success:function(b){b.forEach(function(b){var c=b.attributes.name,d=c.toLowerCase();-1!=d.search(a)&&new DisplaySearchView({model:b})})}}).done(function(){var b=new Parse.Query(Reviewer);b.find({success:function(b){b.forEach(function(b){var c=b.attributes.name,d=c.toLowerCase();-1!=d.search(a)&&new DisplaySearchView({model:b})})}})}).done(function(){var b=new Parse.Query(News);b.find({success:function(b){b.forEach(function(b){var c=b.attributes.name,d=c.toLowerCase();-1!=d.search(a)&&new DisplaySearchView({model:b})})}})})}}}),DisplaySearchView=Parse.View.extend({tagName:"li",className:"search-view",events:{"click span":"display"},template:_.template($(".display-search-view").text()),initialize:function(){$(".display-search").append(this.el),this.render()},render:function(){var a=this.template(this.model);return this.$el.html(a),this},display:function(){$(".display-search").hide(),$(".search").val(""),$(".reviews-container").empty();var a=this.model.id,b=this.model;new FullReviewView({model:b}),router.navigate("home/"+a,{trigger:!0})}}),Router=Parse.Router.extend({routes:{"":"home",home:"home","home/:id":"review",team:"team",join:"join",login:"login",review:"game",news:"news",video:"video",article:"reviewer",forums:"forums","forums/:id":"topic",createTopic:"createTopic",user:"user"},initialize:function(){this.currentView=null;Parse.User.current();new SearchView,$(".display-search").hide()},home:function(){var a=Parse.User.current(),a=Parse.User.current();null==a?($(".logout").hide(),$(".profile-button").hide(),$(".join-button").show(),$(".login-button").show()):($(".logout").show(),$(".profile-button").show(),$(".join-button").hide(),$(".login-button").hide()),$(".views-container").empty(),$(".main-slidr").empty(),$(".searchbar").show();var b=(new HomeView,new SlidrView,new Parse.Query(Review));b.find({success:function(a){var b=_.sortBy(a,"createdAt"),c=b.reverse();new MainSideView({model:c[0]}),new SideGameView({model:c[0]}),new SideGameView({model:c[1]}),c.forEach(function(a){new ReviewView({model:a})})}}).done(function(){var a=new Parse.Query(Reviewer);a.find({success:function(a){var b=a.length,c=_.sortBy(a,"createdAt"),d=c.reverse();new MainSideView({model:a[b-1]}),new SideReviewerView({model:a[b-1]}),new SideReviewerView({model:a[b-2]}),d.forEach(function(a){new ReviewerView({model:a})})}})}).done(function(){var a=new Parse.Query(News);a.find({success:function(a){var b=(a.length,_.sortBy(a,"createdAt")),c=b.reverse();new SideNewsView({model:c[0]}),new SideNewsView({model:c[1]}),c.forEach(function(a){new NewsView({model:a})})}})})},game:function(){$(".views-container").empty(),$(".main-slidr").empty(),$(".searchbar").show();var a=(new HomeView,new Parse.Query(Review));a.find({success:function(a){$(".hide-game").hide(),$(".hide-team").hide(),$(".team-sidebar").hide();var b=_.sortBy(a,"createdAt"),c=b.reverse();c.forEach(function(a){new ReviewView({model:a})})}}).done(function(){var a=new Parse.Query(Reviewer);a.find({success:function(a){{var b=_.sortBy(a,"createdAt"),c=b.reverse();a.length}new SideReviewerView({model:c[0]}),new SideReviewerView({model:c[1]})}})}).done(function(){var a=new Parse.Query(News);a.find({success:function(a){var b=(a.length,_.sortBy(a,"createdAt")),c=b.reverse();new SideNewsView({model:c[0]}),new SideNewsView({model:c[1]})}})})},join:function(){$(".views-container").empty(),$(".main-slidr").empty();var a=new JoinView;this.swap(a)},login:function(){$(".views-container").empty(),$(".main-slidr").empty();var a=new LoginView;this.swap(a)},review:function(a){$(".views-container").empty(),$(".main-slidr").empty(),$(".searchbar").show();var b=(new HomeView,new Parse.Query(Review));b.find({success:function(b){b.forEach(function(b){b.id===a&&new FullReviewView({model:b})})}});var c=new Parse.Query(Reviewer);c.find({success:function(b){b.forEach(function(b){b.id===a&&new FullReviewView({model:b})})}});var d=new Parse.Query(News);d.find({success:function(b){b.forEach(function(b){b.id===a&&new FullReviewView({model:b})})}})},news:function(){$(".views-container").empty(),$(".main-slidr").empty(),$(".searchbar").show();var a=(new HomeView,new Parse.Query(Review));a.find({success:function(a){$(".hide-news").hide(),$(".hide-team").hide(),$(".team-sidebar").hide();var b=_.sortBy(a,"createdAt"),c=b.reverse();new SideGameView({model:c[0]}),new SideGameView({model:c[1]})}});var b=new Parse.Query(Reviewer);b.find({success:function(a){var b=_.sortBy(a,"createdAt"),c=b.reverse();new SideReviewerView({model:c[0]}),new SideReviewerView({model:c[1]})}});var c=new Parse.Query(News);c.find({success:function(a){var b=_.sortBy(a,"createdAt"),c=b.reverse();c.forEach(function(a){new NewsView({model:a})})}})},reviewer:function(){$(".views-container").empty(),$(".main-slidr").empty(),$(".searchbar").show();var a=(new HomeView,new Parse.Query(Review));a.find({success:function(a){$(".hide-industry").hide(),$(".hide-team").hide(),$(".team-sidebar").hide();var b=_.sortBy(a,"createdAt"),c=b.reverse();new SideGameView({model:c[0]}),new SideGameView({model:c[1]})}}).done(function(){var a=new Parse.Query(Reviewer);a.find({success:function(a){var b=_.sortBy(a,"createdAt"),c=b.reverse();c.forEach(function(a){new ReviewerView({model:a})})}})}).done(function(){var a=new Parse.Query(News);a.find({success:function(a){var b=_.sortBy(a,"createdAt"),c=b.reverse();new SideNewsView({model:c[0]}),new SideNewsView({model:c[1]})}})})},team:function(){$(".views-container").empty(),$(".searchbar").hide(),$(".main-slidr").empty();var a=new TeamView;this.swap(a)},video:function(){$(".views-container").empty(),$(".searchbar").hide(),$(".main-slidr").empty();var a=new VideoView;this.swap(a)},user:function(){if(void 0==Parse.User.current())router.navigate("login",{trigger:!0});else{$(".views-container").empty(),$(".main-slidr").empty();var a=Parse.User.current(),b=a.attributes.username,c=new UserView({model:a}),d=new Parse.Query(ReviewComment);d.find({success:function(a){a.forEach(function(a){a.attributes.username==b&&(console.log(a),new UserCommentView({model:a}))})}}).done(function(){var a=new Parse.Query(ReviewerComment);a.find({success:function(a){a.forEach(function(a){a.attributes.username==b&&new UserCommentView({model:a})})}})}).done(function(){var a=new Parse.Query(NewsComment);a.find({success:function(a){a.forEach(function(a){a.attributes.username==b&&new UserCommentView({model:a})})}})}).done(function(){var a=new Parse.Query(Comment);a.find({success:function(a){a.forEach(function(a){a.attributes.username==b&&new UserCommentView({model:a})})}})}),this.swap(c)}},forums:function(){$(".main-slidr").empty(),$(".searchbar").hide(),$(".views-container").empty();var a=new MainForumView;this.swap(a);var b=new Parse.Query(Forum);b.find({success:function(a){var b=a.reverse();b.forEach(function(a){new ForumsView({model:a})})},error:function(){console.log("error")}})},topic:function(a){var b=(new MainForumView,new Parse.Query(Forum));b.find({success:function(b){b.forEach(function(b){b.id===a&&new TopicView({model:b})})}})},createTopic:function(){$(".views-container").empty();var a=new CreateTopicView;this.swap(a)},swap:function(a){this.currentView&&this.currentView.remove(),this.currentView=a,this.currentView.render()}}),router=new Router;Parse.history.start();