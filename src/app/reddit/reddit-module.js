angular.module('reddit', [])
    .controller('redditController', ['$scope', 'reddit', function ($scope, reddit) {
            this.posts = reddit.getPosts();
            this.newPost = {};

            this.addPost = function() {
                reddit.addPost(this.newPost.title, this.newPost.user, this.newPost.body);
                this.newPost = {}
            }

            this.removePost =  function(post) {
                reddit.removePost(post);
            }

            this.addComment = function(post) {
                reddit.addComment(post, this.userName, this.newComment);
                this.userName = '';
                this.newComment = '';
            }

            this.incrementPost = function(post) {
                post.count++;
            }

            this.decrementPost =  function(post) {
                post.count--;
            }

    }])
    .controller('redditPostController', ['$scope', 'reddit', function ($scope, reddit) {
            // this.post = $scope.post;
            this.removePost =  function() {
                reddit.removePost(this.post);
            }

            this.incrementPost = function() {
                this.post.count++;
            }

            this.decrementPost =  function() {
                this.post.count--;
            }

            this.apiCall = function(post) {
                console.log('Api call', post)
            }

    }])
    .service('reddit', function(){

        var posts = []

        var addPost= function(title, user, body){
            posts.push({
                title: title,
                user: user,
                date: moment().format('MMMM Do YYYY, h:mm:ss a'),
                body: body,
                comments: [],
                showComment: false,
                count: 0
            })
        }

        var removePost = function(post) {
            var index = posts.indexOf(post);
            posts.slice(index, 1);
        }

        var getPosts =  function() {
            return posts;
        }

        var createComment = function(user, content){
            return { user:user, content: content };
        }

        var addComment = function(post, user, content) {
            var comment = createComment(user, content);
            post.comments.push(comment);
        }

        var init = function() {
            posts.push({
                title: 'First Post',
                user: 'Joe',
                date: moment().format('MMMM Do YYYY, h:mm:ss a'),
                body: 'The first Reddit post, ever!',
                comments: [ createComment('Joe', 'Dummy Content') ],
                showComment: false,
                count: 0
            });
        }


        init();

        return {
            addPost: addPost,
            removePost: removePost,
            getPosts: getPosts,
            addComment: addComment
        }

    })
    .directive('redditPosts', function(){
        return {
            restrict: 'E',
            templateUrl: 'src/app/reddit/reddit-posts.html',
            controller: 'redditController as redditCtrl'
        }
    })
    .directive('redditPost', function(){
        return {
            restrict: 'E',
            templateUrl: 'src/app/reddit/reddit-post.html',
            controller: 'redditPostController as postCtrl',
            bindToController: {
                post: '='
            },
            link: function(scope, element, attrs, ctrl) {
                element.on('click', function() {
                    alert('Hovering!');
                })
                var count = 0;
                scope.$watch(function watcher(){
                    return ctrl.post.count;
                }, function listener(newValue, oldValue){
                    if(newValue !== undefined) {
                        ctrl.apiCall(ctrl.post)
                    }
                })
            }
        }
    })
    .directive('redditComment', function(){
        return {
            restrict: 'E',
            templateUrl: 'src/app/reddit/reddit-comment.html'
        }
    })
    .directive('redditPostForm', function(){
        return {
            restrict: 'E',
            templateUrl: 'src/app/reddit/reddit-post-form.html'
        }
    })
;