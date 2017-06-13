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
            templateUrl: basePath + '/reddit/reddit.html',
            controller: 'redditController as redditCtrl'
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
angular.module('reddit', [])
    .controller('redditController', ['$scope', 'reddit', function ($scope, reddit) {
            $scope.redditCtrl = this;
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
            templateUrl: 'src/app/reddit/reddit-posts.html'
        }
  })
;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1vdmllcy9tb3ZpZXMtbW9kdWxlLmpzIiwidG9kby90b2RvLW1vZHVsZS5qcyIsInJlZGRpdC9yZWRkaXQtbW9kdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCd0b2RvQXBwJywgW1xyXG4gICAgJ3VpLnJvdXRlcicsXHJcbiAgICAndG9kbycsIFxyXG4gICAgJ21vdmllcycsXHJcbiAgICAncmVkZGl0J1xyXG5dKVxyXG4uY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcclxuICAgIHZhciBiYXNlUGF0aCA9ICdzcmMvYXBwJztcclxuICAgIFxyXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xyXG4gICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAuc3RhdGUoJ3RvZG8nLCB7XHJcbiAgICAgICAgICAgIHVybDogJy8nLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogYmFzZVBhdGggKyAnL3RvZG8vdG9kby5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3RvZG9Db250cm9sbGVyIGFzIHRvZG9DdHJsJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdtb3ZpZXMnLHtcclxuICAgICAgICAgICAgdXJsOiAnL21vdmllcycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBiYXNlUGF0aCArICcvbW92aWVzL21vdmllcy5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ21vdmllc0NvbnRyb2xsZXIgYXMgbW92aWVzQ3RybCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgncmVkZGl0Jyx7XHJcbiAgICAgICAgICAgIHVybDogJy9yZWRkaXQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogYmFzZVBhdGggKyAnL3JlZGRpdC9yZWRkaXQuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyZWRkaXRDb250cm9sbGVyIGFzIHJlZGRpdEN0cmwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICA7XHJcblxyXG59KTsiLCJhbmd1bGFyLm1vZHVsZSgnbW92aWVzJywgW10pXHJcbiAgICAuY29udHJvbGxlcignbW92aWVzQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJ2ltZGInLCAndG9kb01vZGVsJywgZnVuY3Rpb24gKCRzY29wZSwgaW1kYiwgdG9kb01vZGVsKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5tb3ZpZUN0cmwgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gaW5qZWN0IHRoZSBJTURCIHNlcnZpY2VcclxuICAgICAgICAgICAgLy8gQHRvZG86IHNlYXJjaCBmb3IgYSBtb3ZpZVxyXG4gICAgICAgICAgICAvLyBAdG9kbzogZGlzcGxheSB0aGUgcmVzdWx0cyBvbiB0aGUgc2NyZWVuXHJcbiAgICAgICAgICAgIC8vIEB0b2RvOiBhZGQgdGhlIGFiaWxpdHkgdG8gYWRkIHRoZSBtb3ZpZSB0byB5b3VyIHRvZG8gbW9kdWxlICAgICAgICAgICBcclxuICBcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLm1vdmllKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1kYi5nZXQodGhpcy5tb3ZpZSwgZnVuY3Rpb24ocmVzdWx0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtb3ZpZSBpbmZvcm1hdGlvbiBpcyBvbiB0aGUgZGF0YSBwcm9wZXJ0eSBvZiByZXN1bHRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb3ZpZSA9IHJlc3VsdHMuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZpZVJlc3VsdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBtb3ZpZS5UaXRsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RlcjogbW92aWUuUG9zdGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0b3JzOiBtb3ZpZS5BY3RvcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWRiUmF0aW5nOiBtb3ZpZS5pbWRiUmF0aW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpOyAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSAgICBcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXIgPSBmdW5jdGlvbihldnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92aWUgPSAnJztcclxuICAgICAgICAgICAgICAgIHRoaXMubW92aWVSZXN1bHQgPSB7fTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XSlcclxuICAgIC5zZXJ2aWNlKCdpbWRiJywgWyckaHR0cCcsIGZ1bmN0aW9uKCRodHRwKXtcclxuXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9kb2NzLmFuZ3VsYXJqcy5vcmcvYXBpL25nL3NlcnZpY2UvJGh0dHBcclxuICAgICAgICBcclxuICAgICAgICAvL01hbmFnZSBJTURCIHNlcnZpY2VcclxuICAgICAgICAvL0B0b2RvOiB3cml0ZSBhbmQgZXhwb3NlIGEgZ2V0IG1ldGhvZFxyXG5cclxuXHJcbiAgICAgICAgdmFyIGdldE1vdmllc0J5VGl0bGUgPSBmdW5jdGlvbih0aXRsZSwgY2IpIHtcclxuICAgICAgICAgICAgJGh0dHAoe1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIHVybDogJ2h0dHA6Ly93d3cub21kYmFwaS5jb20vP3Q9JyArIHRpdGxlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKGNiKTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ2V0OiBnZXRNb3ZpZXNCeVRpdGxlXHJcbiAgICAgICAgfVxyXG4gICAgfV0pOyIsImFuZ3VsYXIubW9kdWxlKCd0b2RvJywgW10pXHJcbiAgICAuY29udHJvbGxlcigndG9kb0NvbnRyb2xsZXInLCBbJyRzY29wZScsICd0b2RvTW9kZWwnLCBmdW5jdGlvbiAoJHNjb3BlLCBtb2RlbCkge1xyXG4gICAgICAgICAgICAkc2NvcGUudG9kb0N0cmwgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gbWFrZSB0aGUgbW9kZWwgYXZhaWxhYmFsZSB0byB0aGUgdmlld1xyXG4gICAgICAgICAgICAvLyBAdG9kbzogZmluaXNoIGltcGxlbWVudGluZyB0aGUgc3VibWl0IGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIC8vIEB0b2RvOmFkZCBhbiBlZGl0IGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIC8vIEB0b2RvOiBhZGQgYSBkZWxldGUgZnVuY3Rpb24gXHJcblxyXG4gICAgICAgICAgICB0aGlzLnRvZG9zID0gbW9kZWwudG9kb3M7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdCA9IGZ1bmN0aW9uIG9uU3VibWl0KCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2Rvcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLm5ld1RvZG8sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdUb2RvID0gJyc7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVkaXQgPSBmdW5jdGlvbiBvbkVkaXQoaWR4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZG9zW2lkeF0uZWRpdCA9ICF0aGlzLnRvZG9zW2lkeF0uZWRpdDtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlID0gZnVuY3Rpb24gb25EZWxldGUoaWR4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZG9zLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgIH1dKVxyXG4gICAgLnNlcnZpY2UoJ3RvZG9Nb2RlbCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy9tYW5hZ2UgdG9kbyBzdGF0ZVxyXG4gICAgICAgIC8vQHRvZG86IGRlZmluZSB0aGUgbW9kZWwgYW5kIGV4cG9zZSBpdCB0byB0aGUgcmVzdCBvZiB0aGUgYXBwXHJcbiAgICAgICAgdmFyIHRvZG9zID0gW107XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvZG9zOiB0b2Rvc1xyXG4gICAgICAgIH1cclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCdyZWRkaXQnLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdyZWRkaXRDb250cm9sbGVyJywgWyckc2NvcGUnLCAncmVkZGl0JywgZnVuY3Rpb24gKCRzY29wZSwgcmVkZGl0KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5yZWRkaXRDdHJsID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5wb3N0cyA9IHJlZGRpdC5nZXRQb3N0cygpO1xyXG4gICAgICAgICAgICB0aGlzLm5ld1Bvc3QgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkUG9zdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmVkZGl0LmFkZFBvc3QodGhpcy5uZXdQb3N0LnRpdGxlLCB0aGlzLm5ld1Bvc3QudXNlciwgdGhpcy5uZXdQb3N0LmJvZHkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdQb3N0ID0ge31cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVQb3N0ID0gIGZ1bmN0aW9uKHBvc3QpIHtcclxuICAgICAgICAgICAgICAgIHJlZGRpdC5yZW1vdmVQb3N0KHBvc3QpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZENvbW1lbnQgPSBmdW5jdGlvbihwb3N0KSB7XHJcbiAgICAgICAgICAgICAgICByZWRkaXQuYWRkQ29tbWVudChwb3N0LCB0aGlzLnVzZXJOYW1lLCB0aGlzLm5ld0NvbW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyTmFtZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdDb21tZW50ID0gJyc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5jcmVtZW50UG9zdCA9IGZ1bmN0aW9uKHBvc3QpIHtcclxuICAgICAgICAgICAgICAgIHBvc3QuY291bnQrKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWNyZW1lbnRQb3N0ID0gIGZ1bmN0aW9uKHBvc3QpIHtcclxuICAgICAgICAgICAgICAgIHBvc3QuY291bnQtLTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIH1dKVxyXG4gICAgLnNlcnZpY2UoJ3JlZGRpdCcsIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIHZhciBwb3N0cyA9IFtdXHJcblxyXG4gICAgICAgIHZhciBhZGRQb3N0PSBmdW5jdGlvbih0aXRsZSwgdXNlciwgYm9keSl7XHJcbiAgICAgICAgICAgIHBvc3RzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgdXNlcjogdXNlcixcclxuICAgICAgICAgICAgICAgIGRhdGU6IG1vbWVudCgpLmZvcm1hdCgnTU1NTSBEbyBZWVlZLCBoOm1tOnNzIGEnKSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IGJvZHksXHJcbiAgICAgICAgICAgICAgICBjb21tZW50czogW10sXHJcbiAgICAgICAgICAgICAgICBzaG93Q29tbWVudDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHJlbW92ZVBvc3QgPSBmdW5jdGlvbihwb3N0KSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHBvc3RzLmluZGV4T2YocG9zdCk7XHJcbiAgICAgICAgICAgIHBvc3RzLnNsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBnZXRQb3N0cyA9ICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBvc3RzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGNyZWF0ZUNvbW1lbnQgPSBmdW5jdGlvbih1c2VyLCBjb250ZW50KXtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdXNlcjp1c2VyLCBjb250ZW50OiBjb250ZW50IH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgYWRkQ29tbWVudCA9IGZ1bmN0aW9uKHBvc3QsIHVzZXIsIGNvbnRlbnQpIHtcclxuICAgICAgICAgICAgdmFyIGNvbW1lbnQgPSBjcmVhdGVDb21tZW50KHVzZXIsIGNvbnRlbnQpO1xyXG4gICAgICAgICAgICBwb3N0LmNvbW1lbnRzLnB1c2goY29tbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwb3N0cy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAnRmlyc3QgUG9zdCcsXHJcbiAgICAgICAgICAgICAgICB1c2VyOiAnSm9lJyxcclxuICAgICAgICAgICAgICAgIGRhdGU6IG1vbWVudCgpLmZvcm1hdCgnTU1NTSBEbyBZWVlZLCBoOm1tOnNzIGEnKSxcclxuICAgICAgICAgICAgICAgIGJvZHk6ICdUaGUgZmlyc3QgUmVkZGl0IHBvc3QsIGV2ZXIhJyxcclxuICAgICAgICAgICAgICAgIGNvbW1lbnRzOiBbIGNyZWF0ZUNvbW1lbnQoJ0pvZScsICdEdW1teSBDb250ZW50JykgXSxcclxuICAgICAgICAgICAgICAgIHNob3dDb21tZW50OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNvdW50OiAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWRkUG9zdDogYWRkUG9zdCxcclxuICAgICAgICAgICAgcmVtb3ZlUG9zdDogcmVtb3ZlUG9zdCxcclxuICAgICAgICAgICAgZ2V0UG9zdHM6IGdldFBvc3RzLFxyXG4gICAgICAgICAgICBhZGRDb21tZW50OiBhZGRDb21tZW50XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pXHJcbiAgICAuZGlyZWN0aXZlKCdyZWRkaXRQb3N0cycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdzcmMvYXBwL3JlZGRpdC9yZWRkaXQtcG9zdHMuaHRtbCdcclxuICAgICAgICB9XHJcbiAgfSlcclxuOyJdfQ==
