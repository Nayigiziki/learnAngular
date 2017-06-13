angular.module('todoApp', [
    'ui.router',
    'todo', 
    'movies',
    'reddit'
])
.config(function($stateProvider, $urlRouterProvider) {
    var basePath = 'src/app';
    
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('todo', {
            url: '/',
            templateUrl: basePath + '/todo/todo.html',
            controller: 'todoController as todoCtrl'
        })
        .state('movies',{
            url: '/movies',
            templateUrl: basePath + '/movies/movies.html',
            controller: 'moviesController as moviesCtrl'
        })
        .state('reddit',{
            url: '/reddit',
            templateUrl: basePath + '/reddit/reddit.html'
        })
        ;

});
angular.module('movies', [])
    .controller('moviesController', ['$scope', 'imdb', 'todoModel', function ($scope, imdb, todoModel) {
            $scope.movieCtrl = this;

            // inject the IMDB service
            // @todo: search for a movie
            // @todo: display the results on the screen
            // @todo: add the ability to add the movie to your todo module           
  

            this.search = function() {
                if(this.movie) {
                    imdb.get(this.movie, function(results) {
                        // movie information is on the data property of results
                        var movie = results.data;
                        this.movieResult = {
                            title: movie.Title,
                            poster: movie.Poster,
                            actors: movie.Actors,
                            imdbRating: movie.imdbRating
                        }
                    }.bind(this));                  
                }    

            }

            this.clear = function(evt) {
                this.movie = '';
                this.movieResult = {};
            }


    }])
    .service('imdb', ['$http', function($http){

        // https://docs.angularjs.org/api/ng/service/$http
        
        //Manage IMDB service
        //@todo: write and expose a get method


        var getMoviesByTitle = function(title, cb) {
            $http({
                method: 'GET',
                url: 'http://www.omdbapi.com/?t=' + title
            })
            .then(cb);
        };


        return {
            get: getMoviesByTitle
        }
    }]);
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
            this.post = $scope.post;
            this.removePost =  function() {
                reddit.removePost(this.post);
            }

            this.incrementPost = function() {
                this.post.count++;
            }

            this.decrementPost =  function() {
                this.post.count--;
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
angular.module('todo', [])
    .controller('todoController', ['$scope', 'todoModel', function ($scope, model) {
            $scope.todoCtrl = this;

            // make the model availabale to the view
            // @todo: finish implementing the submit function
            // @todo:add an edit function
            // @todo: add a delete function 

            this.todos = model.todos;

            this.submit = function onSubmit() {
                this.todos.push({
                    text: this.newTodo,
                    edit: false
                })

                this.newTodo = '';
            };

            this.edit = function onEdit(idx) {
                this.todos[idx].edit = !this.todos[idx].edit;
            };

            this.delete = function onDelete(idx) {
                this.todos.splice(idx, 1);
            };

    }])
    .service('todoModel', function(){
        //manage todo state
        //@todo: define the model and expose it to the rest of the app
        var todos = [];

        return {
            todos: todos
        }
    });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1vdmllcy9tb3ZpZXMtbW9kdWxlLmpzIiwicmVkZGl0L3JlZGRpdC1tb2R1bGUuanMiLCJ0b2RvL3RvZG8tbW9kdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCd0b2RvQXBwJywgW1xyXG4gICAgJ3VpLnJvdXRlcicsXHJcbiAgICAndG9kbycsIFxyXG4gICAgJ21vdmllcycsXHJcbiAgICAncmVkZGl0J1xyXG5dKVxyXG4uY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcclxuICAgIHZhciBiYXNlUGF0aCA9ICdzcmMvYXBwJztcclxuICAgIFxyXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xyXG4gICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAuc3RhdGUoJ3RvZG8nLCB7XHJcbiAgICAgICAgICAgIHVybDogJy8nLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogYmFzZVBhdGggKyAnL3RvZG8vdG9kby5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3RvZG9Db250cm9sbGVyIGFzIHRvZG9DdHJsJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdtb3ZpZXMnLHtcclxuICAgICAgICAgICAgdXJsOiAnL21vdmllcycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBiYXNlUGF0aCArICcvbW92aWVzL21vdmllcy5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ21vdmllc0NvbnRyb2xsZXIgYXMgbW92aWVzQ3RybCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgncmVkZGl0Jyx7XHJcbiAgICAgICAgICAgIHVybDogJy9yZWRkaXQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogYmFzZVBhdGggKyAnL3JlZGRpdC9yZWRkaXQuaHRtbCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIDtcclxuXHJcbn0pOyIsImFuZ3VsYXIubW9kdWxlKCdtb3ZpZXMnLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdtb3ZpZXNDb250cm9sbGVyJywgWyckc2NvcGUnLCAnaW1kYicsICd0b2RvTW9kZWwnLCBmdW5jdGlvbiAoJHNjb3BlLCBpbWRiLCB0b2RvTW9kZWwpIHtcclxuICAgICAgICAgICAgJHNjb3BlLm1vdmllQ3RybCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBpbmplY3QgdGhlIElNREIgc2VydmljZVxyXG4gICAgICAgICAgICAvLyBAdG9kbzogc2VhcmNoIGZvciBhIG1vdmllXHJcbiAgICAgICAgICAgIC8vIEB0b2RvOiBkaXNwbGF5IHRoZSByZXN1bHRzIG9uIHRoZSBzY3JlZW5cclxuICAgICAgICAgICAgLy8gQHRvZG86IGFkZCB0aGUgYWJpbGl0eSB0byBhZGQgdGhlIG1vdmllIHRvIHlvdXIgdG9kbyBtb2R1bGUgICAgICAgICAgIFxyXG4gIFxyXG5cclxuICAgICAgICAgICAgdGhpcy5zZWFyY2ggPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubW92aWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWRiLmdldCh0aGlzLm1vdmllLCBmdW5jdGlvbihyZXN1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1vdmllIGluZm9ybWF0aW9uIGlzIG9uIHRoZSBkYXRhIHByb3BlcnR5IG9mIHJlc3VsdHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vdmllID0gcmVzdWx0cy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmllUmVzdWx0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG1vdmllLlRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGVyOiBtb3ZpZS5Qb3N0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RvcnM6IG1vdmllLkFjdG9ycyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZGJSYXRpbmc6IG1vdmllLmltZGJSYXRpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7ICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9ICAgIFxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uKGV2dCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZpZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZpZVJlc3VsdCA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgIH1dKVxyXG4gICAgLnNlcnZpY2UoJ2ltZGInLCBbJyRodHRwJywgZnVuY3Rpb24oJGh0dHApe1xyXG5cclxuICAgICAgICAvLyBodHRwczovL2RvY3MuYW5ndWxhcmpzLm9yZy9hcGkvbmcvc2VydmljZS8kaHR0cFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vTWFuYWdlIElNREIgc2VydmljZVxyXG4gICAgICAgIC8vQHRvZG86IHdyaXRlIGFuZCBleHBvc2UgYSBnZXQgbWV0aG9kXHJcblxyXG5cclxuICAgICAgICB2YXIgZ2V0TW92aWVzQnlUaXRsZSA9IGZ1bmN0aW9uKHRpdGxlLCBjYikge1xyXG4gICAgICAgICAgICAkaHR0cCh7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgdXJsOiAnaHR0cDovL3d3dy5vbWRiYXBpLmNvbS8/dD0nICsgdGl0bGVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oY2IpO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBnZXQ6IGdldE1vdmllc0J5VGl0bGVcclxuICAgICAgICB9XHJcbiAgICB9XSk7IiwiYW5ndWxhci5tb2R1bGUoJ3JlZGRpdCcsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ3JlZGRpdENvbnRyb2xsZXInLCBbJyRzY29wZScsICdyZWRkaXQnLCBmdW5jdGlvbiAoJHNjb3BlLCByZWRkaXQpIHtcclxuICAgICAgICAgICAgdGhpcy5wb3N0cyA9IHJlZGRpdC5nZXRQb3N0cygpO1xyXG4gICAgICAgICAgICB0aGlzLm5ld1Bvc3QgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkUG9zdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmVkZGl0LmFkZFBvc3QodGhpcy5uZXdQb3N0LnRpdGxlLCB0aGlzLm5ld1Bvc3QudXNlciwgdGhpcy5uZXdQb3N0LmJvZHkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdQb3N0ID0ge31cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVQb3N0ID0gIGZ1bmN0aW9uKHBvc3QpIHtcclxuICAgICAgICAgICAgICAgIHJlZGRpdC5yZW1vdmVQb3N0KHBvc3QpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZENvbW1lbnQgPSBmdW5jdGlvbihwb3N0KSB7XHJcbiAgICAgICAgICAgICAgICByZWRkaXQuYWRkQ29tbWVudChwb3N0LCB0aGlzLnVzZXJOYW1lLCB0aGlzLm5ld0NvbW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyTmFtZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdDb21tZW50ID0gJyc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5jcmVtZW50UG9zdCA9IGZ1bmN0aW9uKHBvc3QpIHtcclxuICAgICAgICAgICAgICAgIHBvc3QuY291bnQrKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWNyZW1lbnRQb3N0ID0gIGZ1bmN0aW9uKHBvc3QpIHtcclxuICAgICAgICAgICAgICAgIHBvc3QuY291bnQtLTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgIH1dKVxyXG4gICAgLmNvbnRyb2xsZXIoJ3JlZGRpdFBvc3RDb250cm9sbGVyJywgWyckc2NvcGUnLCAncmVkZGl0JywgZnVuY3Rpb24gKCRzY29wZSwgcmVkZGl0KSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9zdCA9ICRzY29wZS5wb3N0O1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVBvc3QgPSAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZWRkaXQucmVtb3ZlUG9zdCh0aGlzLnBvc3QpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluY3JlbWVudFBvc3QgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zdC5jb3VudCsrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlY3JlbWVudFBvc3QgPSAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc3QuY291bnQtLTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgIH1dKVxyXG4gICAgLnNlcnZpY2UoJ3JlZGRpdCcsIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIHZhciBwb3N0cyA9IFtdXHJcblxyXG4gICAgICAgIHZhciBhZGRQb3N0PSBmdW5jdGlvbih0aXRsZSwgdXNlciwgYm9keSl7XHJcbiAgICAgICAgICAgIHBvc3RzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgdXNlcjogdXNlcixcclxuICAgICAgICAgICAgICAgIGRhdGU6IG1vbWVudCgpLmZvcm1hdCgnTU1NTSBEbyBZWVlZLCBoOm1tOnNzIGEnKSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IGJvZHksXHJcbiAgICAgICAgICAgICAgICBjb21tZW50czogW10sXHJcbiAgICAgICAgICAgICAgICBzaG93Q29tbWVudDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHJlbW92ZVBvc3QgPSBmdW5jdGlvbihwb3N0KSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHBvc3RzLmluZGV4T2YocG9zdCk7XHJcbiAgICAgICAgICAgIHBvc3RzLnNsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBnZXRQb3N0cyA9ICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBvc3RzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGNyZWF0ZUNvbW1lbnQgPSBmdW5jdGlvbih1c2VyLCBjb250ZW50KXtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdXNlcjp1c2VyLCBjb250ZW50OiBjb250ZW50IH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgYWRkQ29tbWVudCA9IGZ1bmN0aW9uKHBvc3QsIHVzZXIsIGNvbnRlbnQpIHtcclxuICAgICAgICAgICAgdmFyIGNvbW1lbnQgPSBjcmVhdGVDb21tZW50KHVzZXIsIGNvbnRlbnQpO1xyXG4gICAgICAgICAgICBwb3N0LmNvbW1lbnRzLnB1c2goY29tbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwb3N0cy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAnRmlyc3QgUG9zdCcsXHJcbiAgICAgICAgICAgICAgICB1c2VyOiAnSm9lJyxcclxuICAgICAgICAgICAgICAgIGRhdGU6IG1vbWVudCgpLmZvcm1hdCgnTU1NTSBEbyBZWVlZLCBoOm1tOnNzIGEnKSxcclxuICAgICAgICAgICAgICAgIGJvZHk6ICdUaGUgZmlyc3QgUmVkZGl0IHBvc3QsIGV2ZXIhJyxcclxuICAgICAgICAgICAgICAgIGNvbW1lbnRzOiBbIGNyZWF0ZUNvbW1lbnQoJ0pvZScsICdEdW1teSBDb250ZW50JykgXSxcclxuICAgICAgICAgICAgICAgIHNob3dDb21tZW50OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNvdW50OiAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWRkUG9zdDogYWRkUG9zdCxcclxuICAgICAgICAgICAgcmVtb3ZlUG9zdDogcmVtb3ZlUG9zdCxcclxuICAgICAgICAgICAgZ2V0UG9zdHM6IGdldFBvc3RzLFxyXG4gICAgICAgICAgICBhZGRDb21tZW50OiBhZGRDb21tZW50XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pXHJcbiAgICAuZGlyZWN0aXZlKCdyZWRkaXRQb3N0cycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdzcmMvYXBwL3JlZGRpdC9yZWRkaXQtcG9zdHMuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyZWRkaXRDb250cm9sbGVyIGFzIHJlZGRpdEN0cmwnXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIC5kaXJlY3RpdmUoJ3JlZGRpdFBvc3QnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc3JjL2FwcC9yZWRkaXQvcmVkZGl0LXBvc3QuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyZWRkaXRQb3N0Q29udHJvbGxlciBhcyBwb3N0Q3RybCcsXHJcbiAgICAgICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHtcclxuICAgICAgICAgICAgICAgIHBvc3Q6ICc9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIC5kaXJlY3RpdmUoJ3JlZGRpdENvbW1lbnQnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc3JjL2FwcC9yZWRkaXQvcmVkZGl0LWNvbW1lbnQuaHRtbCdcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgLmRpcmVjdGl2ZSgncmVkZGl0UG9zdEZvcm0nLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc3JjL2FwcC9yZWRkaXQvcmVkZGl0LXBvc3QtZm9ybS5odG1sJ1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbjsiLCJhbmd1bGFyLm1vZHVsZSgndG9kbycsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ3RvZG9Db250cm9sbGVyJywgWyckc2NvcGUnLCAndG9kb01vZGVsJywgZnVuY3Rpb24gKCRzY29wZSwgbW9kZWwpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnRvZG9DdHJsID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIG1ha2UgdGhlIG1vZGVsIGF2YWlsYWJhbGUgdG8gdGhlIHZpZXdcclxuICAgICAgICAgICAgLy8gQHRvZG86IGZpbmlzaCBpbXBsZW1lbnRpbmcgdGhlIHN1Ym1pdCBmdW5jdGlvblxyXG4gICAgICAgICAgICAvLyBAdG9kbzphZGQgYW4gZWRpdCBmdW5jdGlvblxyXG4gICAgICAgICAgICAvLyBAdG9kbzogYWRkIGEgZGVsZXRlIGZ1bmN0aW9uIFxyXG5cclxuICAgICAgICAgICAgdGhpcy50b2RvcyA9IG1vZGVsLnRvZG9zO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdWJtaXQgPSBmdW5jdGlvbiBvblN1Ym1pdCgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9kb3MucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdGhpcy5uZXdUb2RvLFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMubmV3VG9kbyA9ICcnO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lZGl0ID0gZnVuY3Rpb24gb25FZGl0KGlkeCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2Rvc1tpZHhdLmVkaXQgPSAhdGhpcy50b2Rvc1tpZHhdLmVkaXQ7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZSA9IGZ1bmN0aW9uIG9uRGVsZXRlKGlkeCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2Rvcy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICB9XSlcclxuICAgIC5zZXJ2aWNlKCd0b2RvTW9kZWwnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vbWFuYWdlIHRvZG8gc3RhdGVcclxuICAgICAgICAvL0B0b2RvOiBkZWZpbmUgdGhlIG1vZGVsIGFuZCBleHBvc2UgaXQgdG8gdGhlIHJlc3Qgb2YgdGhlIGFwcFxyXG4gICAgICAgIHZhciB0b2RvcyA9IFtdO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b2RvczogdG9kb3NcclxuICAgICAgICB9XHJcbiAgICB9KTsiXX0=
