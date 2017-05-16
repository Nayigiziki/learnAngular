angular.module('todoApp', [
    'ui.router',
    'todo', 
    'movies'
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1vdmllcy9tb3ZpZXMtbW9kdWxlLmpzIiwicmVkZGl0L3JlZGRpdC1tb2R1bGUuanMiLCJ0b2RvL3RvZG8tbW9kdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgndG9kb0FwcCcsIFtcclxuICAgICd1aS5yb3V0ZXInLFxyXG4gICAgJ3RvZG8nLCBcclxuICAgICdtb3ZpZXMnXHJcbl0pXHJcbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xyXG4gICAgdmFyIGJhc2VQYXRoID0gJ3NyYy9hcHAnO1xyXG4gICAgXHJcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XHJcbiAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgIC5zdGF0ZSgndG9kbycsIHtcclxuICAgICAgICAgICAgdXJsOiAnLycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBiYXNlUGF0aCArICcvdG9kby90b2RvLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAndG9kb0NvbnRyb2xsZXIgYXMgdG9kb0N0cmwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ21vdmllcycse1xyXG4gICAgICAgICAgICB1cmw6ICcvbW92aWVzJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGJhc2VQYXRoICsgJy9tb3ZpZXMvbW92aWVzLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnbW92aWVzQ29udHJvbGxlciBhcyBtb3ZpZXNDdHJsJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgO1xyXG5cclxuXHJcbn0pOyIsImFuZ3VsYXIubW9kdWxlKCdtb3ZpZXMnLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdtb3ZpZXNDb250cm9sbGVyJywgWyckc2NvcGUnLCAnaW1kYicsICd0b2RvTW9kZWwnLCBmdW5jdGlvbiAoJHNjb3BlLCBpbWRiLCB0b2RvTW9kZWwpIHtcclxuICAgICAgICAgICAgJHNjb3BlLm1vdmllQ3RybCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBpbmplY3QgdGhlIElNREIgc2VydmljZVxyXG4gICAgICAgICAgICAvLyBAdG9kbzogc2VhcmNoIGZvciBhIG1vdmllXHJcbiAgICAgICAgICAgIC8vIEB0b2RvOiBkaXNwbGF5IHRoZSByZXN1bHRzIG9uIHRoZSBzY3JlZW5cclxuICAgICAgICAgICAgLy8gQHRvZG86IGFkZCB0aGUgYWJpbGl0eSB0byBhZGQgdGhlIG1vdmllIHRvIHlvdXIgdG9kbyBtb2R1bGUgICAgICAgICAgIFxyXG4gIFxyXG5cclxuICAgICAgICAgICAgdGhpcy5zZWFyY2ggPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubW92aWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWRiLmdldCh0aGlzLm1vdmllLCBmdW5jdGlvbihyZXN1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1vdmllIGluZm9ybWF0aW9uIGlzIG9uIHRoZSBkYXRhIHByb3BlcnR5IG9mIHJlc3VsdHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vdmllID0gcmVzdWx0cy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmllUmVzdWx0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG1vdmllLlRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGVyOiBtb3ZpZS5Qb3N0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RvcnM6IG1vdmllLkFjdG9ycyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZGJSYXRpbmc6IG1vdmllLmltZGJSYXRpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7ICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9ICAgIFxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uKGV2dCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZpZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZpZVJlc3VsdCA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgIH1dKVxyXG4gICAgLnNlcnZpY2UoJ2ltZGInLCBbJyRodHRwJywgZnVuY3Rpb24oJGh0dHApe1xyXG5cclxuICAgICAgICAvLyBodHRwczovL2RvY3MuYW5ndWxhcmpzLm9yZy9hcGkvbmcvc2VydmljZS8kaHR0cFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vTWFuYWdlIElNREIgc2VydmljZVxyXG4gICAgICAgIC8vQHRvZG86IHdyaXRlIGFuZCBleHBvc2UgYSBnZXQgbWV0aG9kXHJcblxyXG5cclxuICAgICAgICB2YXIgZ2V0TW92aWVzQnlUaXRsZSA9IGZ1bmN0aW9uKHRpdGxlLCBjYikge1xyXG4gICAgICAgICAgICAkaHR0cCh7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgdXJsOiAnaHR0cDovL3d3dy5vbWRiYXBpLmNvbS8/dD0nICsgdGl0bGVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oY2IpO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBnZXQ6IGdldE1vdmllc0J5VGl0bGVcclxuICAgICAgICB9XHJcbiAgICB9XSk7IiwiIiwiYW5ndWxhci5tb2R1bGUoJ3RvZG8nLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCd0b2RvQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJ3RvZG9Nb2RlbCcsIGZ1bmN0aW9uICgkc2NvcGUsIG1vZGVsKSB7XHJcbiAgICAgICAgICAgICRzY29wZS50b2RvQ3RybCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBtYWtlIHRoZSBtb2RlbCBhdmFpbGFiYWxlIHRvIHRoZSB2aWV3XHJcbiAgICAgICAgICAgIC8vIEB0b2RvOiBmaW5pc2ggaW1wbGVtZW50aW5nIHRoZSBzdWJtaXQgZnVuY3Rpb25cclxuICAgICAgICAgICAgLy8gQHRvZG86YWRkIGFuIGVkaXQgZnVuY3Rpb25cclxuICAgICAgICAgICAgLy8gQHRvZG86IGFkZCBhIGRlbGV0ZSBmdW5jdGlvbiBcclxuXHJcbiAgICAgICAgICAgIHRoaXMudG9kb3MgPSBtb2RlbC50b2RvcztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3VibWl0ID0gZnVuY3Rpb24gb25TdWJtaXQoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZG9zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMubmV3VG9kbyxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0OiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ld1RvZG8gPSAnJztcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZWRpdCA9IGZ1bmN0aW9uIG9uRWRpdChpZHgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9kb3NbaWR4XS5lZGl0ID0gIXRoaXMudG9kb3NbaWR4XS5lZGl0O1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWxldGUgPSBmdW5jdGlvbiBvbkRlbGV0ZShpZHgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9kb3Muc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgfV0pXHJcbiAgICAuc2VydmljZSgndG9kb01vZGVsJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAvL21hbmFnZSB0b2RvIHN0YXRlXHJcbiAgICAgICAgLy9AdG9kbzogZGVmaW5lIHRoZSBtb2RlbCBhbmQgZXhwb3NlIGl0IHRvIHRoZSByZXN0IG9mIHRoZSBhcHBcclxuICAgICAgICB2YXIgdG9kb3MgPSBbXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9kb3M6IHRvZG9zXHJcbiAgICAgICAgfVxyXG4gICAgfSk7Il19
