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
                reddit.addComment(post, this.postUser, this.comment);
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
            post.push(comment);
        }



        var init = function() {
            posts.push({
                title: 'First Post',
                user: 'Joe',
                date: moment().format('MMMM Do YYYY, h:mm:ss a'),
                body: 'The first Reddit post, ever!',
                comments: ['dummy comment'],
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInRvZG8vdG9kby1tb2R1bGUuanMiLCJtb3ZpZXMvbW92aWVzLW1vZHVsZS5qcyIsInJlZGRpdC9yZWRkaXQtbW9kdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ3RvZG9BcHAnLCBbXHJcbiAgICAndWkucm91dGVyJyxcclxuICAgICd0b2RvJywgXHJcbiAgICAnbW92aWVzJyxcclxuICAgICdyZWRkaXQnXHJcbl0pXHJcbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xyXG4gICAgdmFyIGJhc2VQYXRoID0gJ3NyYy9hcHAnO1xyXG4gICAgXHJcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XHJcbiAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgIC5zdGF0ZSgndG9kbycsIHtcclxuICAgICAgICAgICAgdXJsOiAnLycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBiYXNlUGF0aCArICcvdG9kby90b2RvLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAndG9kb0NvbnRyb2xsZXIgYXMgdG9kb0N0cmwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ21vdmllcycse1xyXG4gICAgICAgICAgICB1cmw6ICcvbW92aWVzJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGJhc2VQYXRoICsgJy9tb3ZpZXMvbW92aWVzLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnbW92aWVzQ29udHJvbGxlciBhcyBtb3ZpZXNDdHJsJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdyZWRkaXQnLHtcclxuICAgICAgICAgICAgdXJsOiAnL3JlZGRpdCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBiYXNlUGF0aCArICcvcmVkZGl0L3JlZGRpdC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3JlZGRpdENvbnRyb2xsZXIgYXMgcmVkZGl0Q3RybCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIDtcclxuXHJcbn0pOyIsImFuZ3VsYXIubW9kdWxlKCd0b2RvJywgW10pXHJcbiAgICAuY29udHJvbGxlcigndG9kb0NvbnRyb2xsZXInLCBbJyRzY29wZScsICd0b2RvTW9kZWwnLCBmdW5jdGlvbiAoJHNjb3BlLCBtb2RlbCkge1xyXG4gICAgICAgICAgICAkc2NvcGUudG9kb0N0cmwgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gbWFrZSB0aGUgbW9kZWwgYXZhaWxhYmFsZSB0byB0aGUgdmlld1xyXG4gICAgICAgICAgICAvLyBAdG9kbzogZmluaXNoIGltcGxlbWVudGluZyB0aGUgc3VibWl0IGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIC8vIEB0b2RvOmFkZCBhbiBlZGl0IGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIC8vIEB0b2RvOiBhZGQgYSBkZWxldGUgZnVuY3Rpb24gXHJcblxyXG4gICAgICAgICAgICB0aGlzLnRvZG9zID0gbW9kZWwudG9kb3M7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdCA9IGZ1bmN0aW9uIG9uU3VibWl0KCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2Rvcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLm5ld1RvZG8sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdUb2RvID0gJyc7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVkaXQgPSBmdW5jdGlvbiBvbkVkaXQoaWR4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZG9zW2lkeF0uZWRpdCA9ICF0aGlzLnRvZG9zW2lkeF0uZWRpdDtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlID0gZnVuY3Rpb24gb25EZWxldGUoaWR4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZG9zLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgIH1dKVxyXG4gICAgLnNlcnZpY2UoJ3RvZG9Nb2RlbCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy9tYW5hZ2UgdG9kbyBzdGF0ZVxyXG4gICAgICAgIC8vQHRvZG86IGRlZmluZSB0aGUgbW9kZWwgYW5kIGV4cG9zZSBpdCB0byB0aGUgcmVzdCBvZiB0aGUgYXBwXHJcbiAgICAgICAgdmFyIHRvZG9zID0gW107XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvZG9zOiB0b2Rvc1xyXG4gICAgICAgIH1cclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCdtb3ZpZXMnLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdtb3ZpZXNDb250cm9sbGVyJywgWyckc2NvcGUnLCAnaW1kYicsICd0b2RvTW9kZWwnLCBmdW5jdGlvbiAoJHNjb3BlLCBpbWRiLCB0b2RvTW9kZWwpIHtcclxuICAgICAgICAgICAgJHNjb3BlLm1vdmllQ3RybCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBpbmplY3QgdGhlIElNREIgc2VydmljZVxyXG4gICAgICAgICAgICAvLyBAdG9kbzogc2VhcmNoIGZvciBhIG1vdmllXHJcbiAgICAgICAgICAgIC8vIEB0b2RvOiBkaXNwbGF5IHRoZSByZXN1bHRzIG9uIHRoZSBzY3JlZW5cclxuICAgICAgICAgICAgLy8gQHRvZG86IGFkZCB0aGUgYWJpbGl0eSB0byBhZGQgdGhlIG1vdmllIHRvIHlvdXIgdG9kbyBtb2R1bGUgICAgICAgICAgIFxyXG4gIFxyXG5cclxuICAgICAgICAgICAgdGhpcy5zZWFyY2ggPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubW92aWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWRiLmdldCh0aGlzLm1vdmllLCBmdW5jdGlvbihyZXN1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1vdmllIGluZm9ybWF0aW9uIGlzIG9uIHRoZSBkYXRhIHByb3BlcnR5IG9mIHJlc3VsdHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vdmllID0gcmVzdWx0cy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmllUmVzdWx0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG1vdmllLlRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGVyOiBtb3ZpZS5Qb3N0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RvcnM6IG1vdmllLkFjdG9ycyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZGJSYXRpbmc6IG1vdmllLmltZGJSYXRpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7ICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9ICAgIFxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uKGV2dCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZpZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZpZVJlc3VsdCA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgIH1dKVxyXG4gICAgLnNlcnZpY2UoJ2ltZGInLCBbJyRodHRwJywgZnVuY3Rpb24oJGh0dHApe1xyXG5cclxuICAgICAgICAvLyBodHRwczovL2RvY3MuYW5ndWxhcmpzLm9yZy9hcGkvbmcvc2VydmljZS8kaHR0cFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vTWFuYWdlIElNREIgc2VydmljZVxyXG4gICAgICAgIC8vQHRvZG86IHdyaXRlIGFuZCBleHBvc2UgYSBnZXQgbWV0aG9kXHJcblxyXG5cclxuICAgICAgICB2YXIgZ2V0TW92aWVzQnlUaXRsZSA9IGZ1bmN0aW9uKHRpdGxlLCBjYikge1xyXG4gICAgICAgICAgICAkaHR0cCh7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgdXJsOiAnaHR0cDovL3d3dy5vbWRiYXBpLmNvbS8/dD0nICsgdGl0bGVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oY2IpO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBnZXQ6IGdldE1vdmllc0J5VGl0bGVcclxuICAgICAgICB9XHJcbiAgICB9XSk7IiwiYW5ndWxhci5tb2R1bGUoJ3JlZGRpdCcsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ3JlZGRpdENvbnRyb2xsZXInLCBbJyRzY29wZScsICdyZWRkaXQnLCBmdW5jdGlvbiAoJHNjb3BlLCByZWRkaXQpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnJlZGRpdEN0cmwgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLnBvc3RzID0gcmVkZGl0LmdldFBvc3RzKCk7XHJcbiAgICAgICAgICAgIHRoaXMubmV3UG9zdCA9IHt9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hZGRQb3N0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZWRkaXQuYWRkUG9zdCh0aGlzLm5ld1Bvc3QudGl0bGUsIHRoaXMubmV3UG9zdC51c2VyLCB0aGlzLm5ld1Bvc3QuYm9keSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ld1Bvc3QgPSB7fVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVBvc3QgPSAgZnVuY3Rpb24ocG9zdCkge1xyXG4gICAgICAgICAgICAgICAgcmVkZGl0LnJlbW92ZVBvc3QocG9zdCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ29tbWVudCA9IGZ1bmN0aW9uKHBvc3QpIHtcclxuICAgICAgICAgICAgICAgIHJlZGRpdC5hZGRDb21tZW50KHBvc3QsIHRoaXMucG9zdFVzZXIsIHRoaXMuY29tbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5jcmVtZW50UG9zdCA9IGZ1bmN0aW9uKHBvc3QpIHtcclxuICAgICAgICAgICAgICAgIHBvc3QuY291bnQrKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWNyZW1lbnRQb3N0ID0gIGZ1bmN0aW9uKHBvc3QpIHtcclxuICAgICAgICAgICAgICAgIHBvc3QuY291bnQtLTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgfV0pXHJcbiAgICAuc2VydmljZSgncmVkZGl0JywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgdmFyIHBvc3RzID0gW11cclxuXHJcbiAgICAgICAgdmFyIGFkZFBvc3Q9IGZ1bmN0aW9uKHRpdGxlLCB1c2VyLCBib2R5KXtcclxuICAgICAgICAgICAgcG9zdHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgICAgICB1c2VyOiB1c2VyLFxyXG4gICAgICAgICAgICAgICAgZGF0ZTogbW9tZW50KCkuZm9ybWF0KCdNTU1NIERvIFlZWVksIGg6bW06c3MgYScpLFxyXG4gICAgICAgICAgICAgICAgYm9keTogYm9keSxcclxuICAgICAgICAgICAgICAgIGNvbW1lbnRzOiBbXSxcclxuICAgICAgICAgICAgICAgIHNob3dDb21tZW50OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNvdW50OiAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcmVtb3ZlUG9zdCA9IGZ1bmN0aW9uKHBvc3QpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gcG9zdHMuaW5kZXhPZihwb3N0KTtcclxuICAgICAgICAgICAgcG9zdHMuc2xpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGdldFBvc3RzID0gIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcG9zdHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgY3JlYXRlQ29tbWVudCA9IGZ1bmN0aW9uKHVzZXIsIGNvbnRlbnQpe1xyXG4gICAgICAgICAgICByZXR1cm4geyB1c2VyOnVzZXIsIGNvbnRlbnQ6IGNvbnRlbnQgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBhZGRDb21tZW50ID0gZnVuY3Rpb24ocG9zdCwgdXNlciwgY29udGVudCkge1xyXG4gICAgICAgICAgICB2YXIgY29tbWVudCA9IGNyZWF0ZUNvbW1lbnQodXNlciwgY29udGVudCk7XHJcbiAgICAgICAgICAgIHBvc3QucHVzaChjb21tZW50KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcG9zdHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0ZpcnN0IFBvc3QnLFxyXG4gICAgICAgICAgICAgICAgdXNlcjogJ0pvZScsXHJcbiAgICAgICAgICAgICAgICBkYXRlOiBtb21lbnQoKS5mb3JtYXQoJ01NTU0gRG8gWVlZWSwgaDptbTpzcyBhJyksXHJcbiAgICAgICAgICAgICAgICBib2R5OiAnVGhlIGZpcnN0IFJlZGRpdCBwb3N0LCBldmVyIScsXHJcbiAgICAgICAgICAgICAgICBjb21tZW50czogWydkdW1teSBjb21tZW50J10sXHJcbiAgICAgICAgICAgICAgICBzaG93Q29tbWVudDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFkZFBvc3Q6IGFkZFBvc3QsXHJcbiAgICAgICAgICAgIHJlbW92ZVBvc3Q6IHJlbW92ZVBvc3QsXHJcbiAgICAgICAgICAgIGdldFBvc3RzOiBnZXRQb3N0cyxcclxuICAgICAgICAgICAgYWRkQ29tbWVudDogYWRkQ29tbWVudFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTsiXX0=
