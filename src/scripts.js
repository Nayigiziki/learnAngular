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
                // element.on('mouseenter', function() {
                //     alert('Hovering!');
                // })
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1vdmllcy9tb3ZpZXMtbW9kdWxlLmpzIiwicmVkZGl0L3JlZGRpdC1tb2R1bGUuanMiLCJ0b2RvL3RvZG8tbW9kdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25KQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgndG9kb0FwcCcsIFtcclxuICAgICd1aS5yb3V0ZXInLFxyXG4gICAgJ3RvZG8nLCBcclxuICAgICdtb3ZpZXMnLFxyXG4gICAgJ3JlZGRpdCdcclxuXSlcclxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XHJcbiAgICB2YXIgYmFzZVBhdGggPSAnc3JjL2FwcCc7XHJcbiAgICBcclxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcclxuICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgLnN0YXRlKCd0b2RvJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGJhc2VQYXRoICsgJy90b2RvL3RvZG8uaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd0b2RvQ29udHJvbGxlciBhcyB0b2RvQ3RybCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnbW92aWVzJyx7XHJcbiAgICAgICAgICAgIHVybDogJy9tb3ZpZXMnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogYmFzZVBhdGggKyAnL21vdmllcy9tb3ZpZXMuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtb3ZpZXNDb250cm9sbGVyIGFzIG1vdmllc0N0cmwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ3JlZGRpdCcse1xyXG4gICAgICAgICAgICB1cmw6ICcvcmVkZGl0JyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGJhc2VQYXRoICsgJy9yZWRkaXQvcmVkZGl0Lmh0bWwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICA7XHJcblxyXG59KTsiLCJhbmd1bGFyLm1vZHVsZSgnbW92aWVzJywgW10pXHJcbiAgICAuY29udHJvbGxlcignbW92aWVzQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJ2ltZGInLCAndG9kb01vZGVsJywgZnVuY3Rpb24gKCRzY29wZSwgaW1kYiwgdG9kb01vZGVsKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5tb3ZpZUN0cmwgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gaW5qZWN0IHRoZSBJTURCIHNlcnZpY2VcclxuICAgICAgICAgICAgLy8gQHRvZG86IHNlYXJjaCBmb3IgYSBtb3ZpZVxyXG4gICAgICAgICAgICAvLyBAdG9kbzogZGlzcGxheSB0aGUgcmVzdWx0cyBvbiB0aGUgc2NyZWVuXHJcbiAgICAgICAgICAgIC8vIEB0b2RvOiBhZGQgdGhlIGFiaWxpdHkgdG8gYWRkIHRoZSBtb3ZpZSB0byB5b3VyIHRvZG8gbW9kdWxlICAgICAgICAgICBcclxuICBcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLm1vdmllKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1kYi5nZXQodGhpcy5tb3ZpZSwgZnVuY3Rpb24ocmVzdWx0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtb3ZpZSBpbmZvcm1hdGlvbiBpcyBvbiB0aGUgZGF0YSBwcm9wZXJ0eSBvZiByZXN1bHRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb3ZpZSA9IHJlc3VsdHMuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZpZVJlc3VsdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBtb3ZpZS5UaXRsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RlcjogbW92aWUuUG9zdGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0b3JzOiBtb3ZpZS5BY3RvcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWRiUmF0aW5nOiBtb3ZpZS5pbWRiUmF0aW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpOyAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSAgICBcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXIgPSBmdW5jdGlvbihldnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92aWUgPSAnJztcclxuICAgICAgICAgICAgICAgIHRoaXMubW92aWVSZXN1bHQgPSB7fTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XSlcclxuICAgIC5zZXJ2aWNlKCdpbWRiJywgWyckaHR0cCcsIGZ1bmN0aW9uKCRodHRwKXtcclxuXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9kb2NzLmFuZ3VsYXJqcy5vcmcvYXBpL25nL3NlcnZpY2UvJGh0dHBcclxuICAgICAgICBcclxuICAgICAgICAvL01hbmFnZSBJTURCIHNlcnZpY2VcclxuICAgICAgICAvL0B0b2RvOiB3cml0ZSBhbmQgZXhwb3NlIGEgZ2V0IG1ldGhvZFxyXG5cclxuXHJcbiAgICAgICAgdmFyIGdldE1vdmllc0J5VGl0bGUgPSBmdW5jdGlvbih0aXRsZSwgY2IpIHtcclxuICAgICAgICAgICAgJGh0dHAoe1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIHVybDogJ2h0dHA6Ly93d3cub21kYmFwaS5jb20vP3Q9JyArIHRpdGxlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKGNiKTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ2V0OiBnZXRNb3ZpZXNCeVRpdGxlXHJcbiAgICAgICAgfVxyXG4gICAgfV0pOyIsImFuZ3VsYXIubW9kdWxlKCdyZWRkaXQnLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdyZWRkaXRDb250cm9sbGVyJywgWyckc2NvcGUnLCAncmVkZGl0JywgZnVuY3Rpb24gKCRzY29wZSwgcmVkZGl0KSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9zdHMgPSByZWRkaXQuZ2V0UG9zdHMoKTtcclxuICAgICAgICAgICAgdGhpcy5uZXdQb3N0ID0ge307XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZFBvc3QgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJlZGRpdC5hZGRQb3N0KHRoaXMubmV3UG9zdC50aXRsZSwgdGhpcy5uZXdQb3N0LnVzZXIsIHRoaXMubmV3UG9zdC5ib2R5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV3UG9zdCA9IHt9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlUG9zdCA9ICBmdW5jdGlvbihwb3N0KSB7XHJcbiAgICAgICAgICAgICAgICByZWRkaXQucmVtb3ZlUG9zdChwb3N0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5hZGRDb21tZW50ID0gZnVuY3Rpb24ocG9zdCkge1xyXG4gICAgICAgICAgICAgICAgcmVkZGl0LmFkZENvbW1lbnQocG9zdCwgdGhpcy51c2VyTmFtZSwgdGhpcy5uZXdDb21tZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlck5hbWUgPSAnJztcclxuICAgICAgICAgICAgICAgIHRoaXMubmV3Q29tbWVudCA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluY3JlbWVudFBvc3QgPSBmdW5jdGlvbihwb3N0KSB7XHJcbiAgICAgICAgICAgICAgICBwb3N0LmNvdW50Kys7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVjcmVtZW50UG9zdCA9ICBmdW5jdGlvbihwb3N0KSB7XHJcbiAgICAgICAgICAgICAgICBwb3N0LmNvdW50LS07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICB9XSlcclxuICAgIC5jb250cm9sbGVyKCdyZWRkaXRQb3N0Q29udHJvbGxlcicsIFsnJHNjb3BlJywgJ3JlZGRpdCcsIGZ1bmN0aW9uICgkc2NvcGUsIHJlZGRpdCkge1xyXG4gICAgICAgICAgICAvLyB0aGlzLnBvc3QgPSAkc2NvcGUucG9zdDtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVQb3N0ID0gIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmVkZGl0LnJlbW92ZVBvc3QodGhpcy5wb3N0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5pbmNyZW1lbnRQb3N0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc3QuY291bnQrKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWNyZW1lbnRQb3N0ID0gIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3N0LmNvdW50LS07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYXBpQ2FsbCA9IGZ1bmN0aW9uKHBvc3QpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBcGkgY2FsbCcsIHBvc3QpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICB9XSlcclxuICAgIC5zZXJ2aWNlKCdyZWRkaXQnLCBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICB2YXIgcG9zdHMgPSBbXVxyXG5cclxuICAgICAgICB2YXIgYWRkUG9zdD0gZnVuY3Rpb24odGl0bGUsIHVzZXIsIGJvZHkpe1xyXG4gICAgICAgICAgICBwb3N0cy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgICAgIHVzZXI6IHVzZXIsXHJcbiAgICAgICAgICAgICAgICBkYXRlOiBtb21lbnQoKS5mb3JtYXQoJ01NTU0gRG8gWVlZWSwgaDptbTpzcyBhJyksXHJcbiAgICAgICAgICAgICAgICBib2R5OiBib2R5LFxyXG4gICAgICAgICAgICAgICAgY29tbWVudHM6IFtdLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NvbW1lbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IDBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciByZW1vdmVQb3N0ID0gZnVuY3Rpb24ocG9zdCkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBwb3N0cy5pbmRleE9mKHBvc3QpO1xyXG4gICAgICAgICAgICBwb3N0cy5zbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZ2V0UG9zdHMgPSAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwb3N0cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBjcmVhdGVDb21tZW50ID0gZnVuY3Rpb24odXNlciwgY29udGVudCl7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHVzZXI6dXNlciwgY29udGVudDogY29udGVudCB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGFkZENvbW1lbnQgPSBmdW5jdGlvbihwb3N0LCB1c2VyLCBjb250ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBjb21tZW50ID0gY3JlYXRlQ29tbWVudCh1c2VyLCBjb250ZW50KTtcclxuICAgICAgICAgICAgcG9zdC5jb21tZW50cy5wdXNoKGNvbW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcG9zdHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0ZpcnN0IFBvc3QnLFxyXG4gICAgICAgICAgICAgICAgdXNlcjogJ0pvZScsXHJcbiAgICAgICAgICAgICAgICBkYXRlOiBtb21lbnQoKS5mb3JtYXQoJ01NTU0gRG8gWVlZWSwgaDptbTpzcyBhJyksXHJcbiAgICAgICAgICAgICAgICBib2R5OiAnVGhlIGZpcnN0IFJlZGRpdCBwb3N0LCBldmVyIScsXHJcbiAgICAgICAgICAgICAgICBjb21tZW50czogWyBjcmVhdGVDb21tZW50KCdKb2UnLCAnRHVtbXkgQ29udGVudCcpIF0sXHJcbiAgICAgICAgICAgICAgICBzaG93Q29tbWVudDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFkZFBvc3Q6IGFkZFBvc3QsXHJcbiAgICAgICAgICAgIHJlbW92ZVBvc3Q6IHJlbW92ZVBvc3QsXHJcbiAgICAgICAgICAgIGdldFBvc3RzOiBnZXRQb3N0cyxcclxuICAgICAgICAgICAgYWRkQ29tbWVudDogYWRkQ29tbWVudFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KVxyXG4gICAgLmRpcmVjdGl2ZSgncmVkZGl0UG9zdHMnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc3JjL2FwcC9yZWRkaXQvcmVkZGl0LXBvc3RzLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAncmVkZGl0Q29udHJvbGxlciBhcyByZWRkaXRDdHJsJ1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICAuZGlyZWN0aXZlKCdyZWRkaXRQb3N0JywgZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3NyYy9hcHAvcmVkZGl0L3JlZGRpdC1wb3N0Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAncmVkZGl0UG9zdENvbnRyb2xsZXIgYXMgcG9zdEN0cmwnLFxyXG4gICAgICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB7XHJcbiAgICAgICAgICAgICAgICBwb3N0OiAnPSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjdHJsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBlbGVtZW50Lm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgYWxlcnQoJ0hvdmVyaW5nIScpO1xyXG4gICAgICAgICAgICAgICAgLy8gfSlcclxuICAgICAgICAgICAgICAgIHZhciBjb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kd2F0Y2goZnVuY3Rpb24gd2F0Y2hlcigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjdHJsLnBvc3QuY291bnQ7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiBsaXN0ZW5lcihuZXdWYWx1ZSwgb2xkVmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG5ld1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5hcGlDYWxsKGN0cmwucG9zdClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIC5kaXJlY3RpdmUoJ3JlZGRpdENvbW1lbnQnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc3JjL2FwcC9yZWRkaXQvcmVkZGl0LWNvbW1lbnQuaHRtbCdcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgLmRpcmVjdGl2ZSgncmVkZGl0UG9zdEZvcm0nLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc3JjL2FwcC9yZWRkaXQvcmVkZGl0LXBvc3QtZm9ybS5odG1sJ1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbjsiLCJhbmd1bGFyLm1vZHVsZSgndG9kbycsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ3RvZG9Db250cm9sbGVyJywgWyckc2NvcGUnLCAndG9kb01vZGVsJywgZnVuY3Rpb24gKCRzY29wZSwgbW9kZWwpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnRvZG9DdHJsID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIG1ha2UgdGhlIG1vZGVsIGF2YWlsYWJhbGUgdG8gdGhlIHZpZXdcclxuICAgICAgICAgICAgLy8gQHRvZG86IGZpbmlzaCBpbXBsZW1lbnRpbmcgdGhlIHN1Ym1pdCBmdW5jdGlvblxyXG4gICAgICAgICAgICAvLyBAdG9kbzphZGQgYW4gZWRpdCBmdW5jdGlvblxyXG4gICAgICAgICAgICAvLyBAdG9kbzogYWRkIGEgZGVsZXRlIGZ1bmN0aW9uIFxyXG5cclxuICAgICAgICAgICAgdGhpcy50b2RvcyA9IG1vZGVsLnRvZG9zO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdWJtaXQgPSBmdW5jdGlvbiBvblN1Ym1pdCgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9kb3MucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdGhpcy5uZXdUb2RvLFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMubmV3VG9kbyA9ICcnO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lZGl0ID0gZnVuY3Rpb24gb25FZGl0KGlkeCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2Rvc1tpZHhdLmVkaXQgPSAhdGhpcy50b2Rvc1tpZHhdLmVkaXQ7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZSA9IGZ1bmN0aW9uIG9uRGVsZXRlKGlkeCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2Rvcy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICB9XSlcclxuICAgIC5zZXJ2aWNlKCd0b2RvTW9kZWwnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vbWFuYWdlIHRvZG8gc3RhdGVcclxuICAgICAgICAvL0B0b2RvOiBkZWZpbmUgdGhlIG1vZGVsIGFuZCBleHBvc2UgaXQgdG8gdGhlIHJlc3Qgb2YgdGhlIGFwcFxyXG4gICAgICAgIHZhciB0b2RvcyA9IFtdO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b2RvczogdG9kb3NcclxuICAgICAgICB9XHJcbiAgICB9KTsiXX0=
