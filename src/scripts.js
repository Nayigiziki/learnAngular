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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInJlZGRpdC9yZWRkaXQtbW9kdWxlLmpzIiwibW92aWVzL21vdmllcy1tb2R1bGUuanMiLCJ0b2RvL3RvZG8tbW9kdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgndG9kb0FwcCcsIFtcclxuICAgICd1aS5yb3V0ZXInLFxyXG4gICAgJ3RvZG8nLCBcclxuICAgICdtb3ZpZXMnLFxyXG4gICAgJ3JlZGRpdCdcclxuXSlcclxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XHJcbiAgICB2YXIgYmFzZVBhdGggPSAnc3JjL2FwcCc7XHJcbiAgICBcclxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcclxuICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgLnN0YXRlKCd0b2RvJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGJhc2VQYXRoICsgJy90b2RvL3RvZG8uaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd0b2RvQ29udHJvbGxlciBhcyB0b2RvQ3RybCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnbW92aWVzJyx7XHJcbiAgICAgICAgICAgIHVybDogJy9tb3ZpZXMnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogYmFzZVBhdGggKyAnL21vdmllcy9tb3ZpZXMuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtb3ZpZXNDb250cm9sbGVyIGFzIG1vdmllc0N0cmwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ3JlZGRpdCcse1xyXG4gICAgICAgICAgICB1cmw6ICcvcmVkZGl0JyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGJhc2VQYXRoICsgJy9yZWRkaXQvcmVkZGl0Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAncmVkZGl0Q29udHJvbGxlciBhcyByZWRkaXRDdHJsJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgO1xyXG5cclxufSk7IiwiYW5ndWxhci5tb2R1bGUoJ3JlZGRpdCcsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ3JlZGRpdENvbnRyb2xsZXInLCBbJyRzY29wZScsICdyZWRkaXQnLCBmdW5jdGlvbiAoJHNjb3BlLCByZWRkaXQpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnJlZGRpdEN0cmwgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLnBvc3RzID0gcmVkZGl0LmdldFBvc3RzKCk7XHJcbiAgICAgICAgICAgIHRoaXMubmV3UG9zdCA9IHt9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hZGRQb3N0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZWRkaXQuYWRkUG9zdCh0aGlzLm5ld1Bvc3QudGl0bGUsIHRoaXMubmV3UG9zdC51c2VyLCB0aGlzLm5ld1Bvc3QuYm9keSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ld1Bvc3QgPSB7fVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVBvc3QgPSAgZnVuY3Rpb24ocG9zdCkge1xyXG4gICAgICAgICAgICAgICAgcmVkZGl0LnJlbW92ZVBvc3QocG9zdCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ29tbWVudCA9IGZ1bmN0aW9uKHBvc3QpIHtcclxuICAgICAgICAgICAgICAgIHJlZGRpdC5hZGRDb21tZW50KHBvc3QsIHRoaXMudXNlck5hbWUsIHRoaXMubmV3Q29tbWVudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJOYW1lID0gJyc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ld0NvbW1lbnQgPSAnJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5pbmNyZW1lbnRQb3N0ID0gZnVuY3Rpb24ocG9zdCkge1xyXG4gICAgICAgICAgICAgICAgcG9zdC5jb3VudCsrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlY3JlbWVudFBvc3QgPSAgZnVuY3Rpb24ocG9zdCkge1xyXG4gICAgICAgICAgICAgICAgcG9zdC5jb3VudC0tO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgfV0pXHJcbiAgICAuc2VydmljZSgncmVkZGl0JywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgdmFyIHBvc3RzID0gW11cclxuXHJcbiAgICAgICAgdmFyIGFkZFBvc3Q9IGZ1bmN0aW9uKHRpdGxlLCB1c2VyLCBib2R5KXtcclxuICAgICAgICAgICAgcG9zdHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgICAgICB1c2VyOiB1c2VyLFxyXG4gICAgICAgICAgICAgICAgZGF0ZTogbW9tZW50KCkuZm9ybWF0KCdNTU1NIERvIFlZWVksIGg6bW06c3MgYScpLFxyXG4gICAgICAgICAgICAgICAgYm9keTogYm9keSxcclxuICAgICAgICAgICAgICAgIGNvbW1lbnRzOiBbXSxcclxuICAgICAgICAgICAgICAgIHNob3dDb21tZW50OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNvdW50OiAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcmVtb3ZlUG9zdCA9IGZ1bmN0aW9uKHBvc3QpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gcG9zdHMuaW5kZXhPZihwb3N0KTtcclxuICAgICAgICAgICAgcG9zdHMuc2xpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGdldFBvc3RzID0gIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcG9zdHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgY3JlYXRlQ29tbWVudCA9IGZ1bmN0aW9uKHVzZXIsIGNvbnRlbnQpe1xyXG4gICAgICAgICAgICByZXR1cm4geyB1c2VyOnVzZXIsIGNvbnRlbnQ6IGNvbnRlbnQgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBhZGRDb21tZW50ID0gZnVuY3Rpb24ocG9zdCwgdXNlciwgY29udGVudCkge1xyXG4gICAgICAgICAgICB2YXIgY29tbWVudCA9IGNyZWF0ZUNvbW1lbnQodXNlciwgY29udGVudCk7XHJcbiAgICAgICAgICAgIHBvc3QuY29tbWVudHMucHVzaChjb21tZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHBvc3RzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdGaXJzdCBQb3N0JyxcclxuICAgICAgICAgICAgICAgIHVzZXI6ICdKb2UnLFxyXG4gICAgICAgICAgICAgICAgZGF0ZTogbW9tZW50KCkuZm9ybWF0KCdNTU1NIERvIFlZWVksIGg6bW06c3MgYScpLFxyXG4gICAgICAgICAgICAgICAgYm9keTogJ1RoZSBmaXJzdCBSZWRkaXQgcG9zdCwgZXZlciEnLFxyXG4gICAgICAgICAgICAgICAgY29tbWVudHM6IFsgY3JlYXRlQ29tbWVudCgnSm9lJywgJ0R1bW15IENvbnRlbnQnKSBdLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NvbW1lbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhZGRQb3N0OiBhZGRQb3N0LFxyXG4gICAgICAgICAgICByZW1vdmVQb3N0OiByZW1vdmVQb3N0LFxyXG4gICAgICAgICAgICBnZXRQb3N0czogZ2V0UG9zdHMsXHJcbiAgICAgICAgICAgIGFkZENvbW1lbnQ6IGFkZENvbW1lbnRcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ21vdmllcycsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ21vdmllc0NvbnRyb2xsZXInLCBbJyRzY29wZScsICdpbWRiJywgJ3RvZG9Nb2RlbCcsIGZ1bmN0aW9uICgkc2NvcGUsIGltZGIsIHRvZG9Nb2RlbCkge1xyXG4gICAgICAgICAgICAkc2NvcGUubW92aWVDdHJsID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIGluamVjdCB0aGUgSU1EQiBzZXJ2aWNlXHJcbiAgICAgICAgICAgIC8vIEB0b2RvOiBzZWFyY2ggZm9yIGEgbW92aWVcclxuICAgICAgICAgICAgLy8gQHRvZG86IGRpc3BsYXkgdGhlIHJlc3VsdHMgb24gdGhlIHNjcmVlblxyXG4gICAgICAgICAgICAvLyBAdG9kbzogYWRkIHRoZSBhYmlsaXR5IHRvIGFkZCB0aGUgbW92aWUgdG8geW91ciB0b2RvIG1vZHVsZSAgICAgICAgICAgXHJcbiAgXHJcblxyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5tb3ZpZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGltZGIuZ2V0KHRoaXMubW92aWUsIGZ1bmN0aW9uKHJlc3VsdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbW92aWUgaW5mb3JtYXRpb24gaXMgb24gdGhlIGRhdGEgcHJvcGVydHkgb2YgcmVzdWx0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW92aWUgPSByZXN1bHRzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92aWVSZXN1bHQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogbW92aWUuVGl0bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3N0ZXI6IG1vdmllLlBvc3RlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdG9yczogbW92aWUuQWN0b3JzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1kYlJhdGluZzogbW92aWUuaW1kYlJhdGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTsgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0gICAgXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNsZWFyID0gZnVuY3Rpb24oZXZ0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmllID0gJyc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmllUmVzdWx0ID0ge307XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgfV0pXHJcbiAgICAuc2VydmljZSgnaW1kYicsIFsnJGh0dHAnLCBmdW5jdGlvbigkaHR0cCl7XHJcblxyXG4gICAgICAgIC8vIGh0dHBzOi8vZG9jcy5hbmd1bGFyanMub3JnL2FwaS9uZy9zZXJ2aWNlLyRodHRwXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9NYW5hZ2UgSU1EQiBzZXJ2aWNlXHJcbiAgICAgICAgLy9AdG9kbzogd3JpdGUgYW5kIGV4cG9zZSBhIGdldCBtZXRob2RcclxuXHJcblxyXG4gICAgICAgIHZhciBnZXRNb3ZpZXNCeVRpdGxlID0gZnVuY3Rpb24odGl0bGUsIGNiKSB7XHJcbiAgICAgICAgICAgICRodHRwKHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICB1cmw6ICdodHRwOi8vd3d3Lm9tZGJhcGkuY29tLz90PScgKyB0aXRsZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihjYik7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdldDogZ2V0TW92aWVzQnlUaXRsZVxyXG4gICAgICAgIH1cclxuICAgIH1dKTsiLCJhbmd1bGFyLm1vZHVsZSgndG9kbycsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ3RvZG9Db250cm9sbGVyJywgWyckc2NvcGUnLCAndG9kb01vZGVsJywgZnVuY3Rpb24gKCRzY29wZSwgbW9kZWwpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnRvZG9DdHJsID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIG1ha2UgdGhlIG1vZGVsIGF2YWlsYWJhbGUgdG8gdGhlIHZpZXdcclxuICAgICAgICAgICAgLy8gQHRvZG86IGZpbmlzaCBpbXBsZW1lbnRpbmcgdGhlIHN1Ym1pdCBmdW5jdGlvblxyXG4gICAgICAgICAgICAvLyBAdG9kbzphZGQgYW4gZWRpdCBmdW5jdGlvblxyXG4gICAgICAgICAgICAvLyBAdG9kbzogYWRkIGEgZGVsZXRlIGZ1bmN0aW9uIFxyXG5cclxuICAgICAgICAgICAgdGhpcy50b2RvcyA9IG1vZGVsLnRvZG9zO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdWJtaXQgPSBmdW5jdGlvbiBvblN1Ym1pdCgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9kb3MucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdGhpcy5uZXdUb2RvLFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMubmV3VG9kbyA9ICcnO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lZGl0ID0gZnVuY3Rpb24gb25FZGl0KGlkeCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2Rvc1tpZHhdLmVkaXQgPSAhdGhpcy50b2Rvc1tpZHhdLmVkaXQ7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZSA9IGZ1bmN0aW9uIG9uRGVsZXRlKGlkeCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2Rvcy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICB9XSlcclxuICAgIC5zZXJ2aWNlKCd0b2RvTW9kZWwnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vbWFuYWdlIHRvZG8gc3RhdGVcclxuICAgICAgICAvL0B0b2RvOiBkZWZpbmUgdGhlIG1vZGVsIGFuZCBleHBvc2UgaXQgdG8gdGhlIHJlc3Qgb2YgdGhlIGFwcFxyXG4gICAgICAgIHZhciB0b2RvcyA9IFtdO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b2RvczogdG9kb3NcclxuICAgICAgICB9XHJcbiAgICB9KTsiXX0=
