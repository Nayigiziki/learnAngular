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
        // Add a new state for movies
        ;


});
angular.module('movies', [])
    .controller('moviesController', ['$scope', function ($scope) {
            $scope.movieCtrl = this;

            // inject the IMDB service
            // @todo: search for a movie
            // @todo: display the results on the screen
            // @todo: add the ability to add the movie to your todo module
            

            //example:
            // imdb.get('Fun', function(results) {
            //     // movie information is on the data property of results

            // });


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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1vdmllcy9tb3ZpZXMtbW9kdWxlLmpzIiwidG9kby90b2RvLW1vZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgndG9kb0FwcCcsIFtcclxuICAgICd1aS5yb3V0ZXInLFxyXG4gICAgJ3RvZG8nLCBcclxuICAgICdtb3ZpZXMnXHJcbl0pXHJcbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xyXG4gICAgdmFyIGJhc2VQYXRoID0gJ3NyYy9hcHAnO1xyXG4gICAgXHJcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XHJcbiAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgIC5zdGF0ZSgndG9kbycsIHtcclxuICAgICAgICAgICAgdXJsOiAnLycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBiYXNlUGF0aCArICcvdG9kby90b2RvLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAndG9kb0NvbnRyb2xsZXIgYXMgdG9kb0N0cmwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyBBZGQgYSBuZXcgc3RhdGUgZm9yIG1vdmllc1xyXG4gICAgICAgIDtcclxuXHJcblxyXG59KTsiLCJhbmd1bGFyLm1vZHVsZSgnbW92aWVzJywgW10pXHJcbiAgICAuY29udHJvbGxlcignbW92aWVzQ29udHJvbGxlcicsIFsnJHNjb3BlJywgZnVuY3Rpb24gKCRzY29wZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUubW92aWVDdHJsID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIGluamVjdCB0aGUgSU1EQiBzZXJ2aWNlXHJcbiAgICAgICAgICAgIC8vIEB0b2RvOiBzZWFyY2ggZm9yIGEgbW92aWVcclxuICAgICAgICAgICAgLy8gQHRvZG86IGRpc3BsYXkgdGhlIHJlc3VsdHMgb24gdGhlIHNjcmVlblxyXG4gICAgICAgICAgICAvLyBAdG9kbzogYWRkIHRoZSBhYmlsaXR5IHRvIGFkZCB0aGUgbW92aWUgdG8geW91ciB0b2RvIG1vZHVsZVxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIC8vZXhhbXBsZTpcclxuICAgICAgICAgICAgLy8gaW1kYi5nZXQoJ0Z1bicsIGZ1bmN0aW9uKHJlc3VsdHMpIHtcclxuICAgICAgICAgICAgLy8gICAgIC8vIG1vdmllIGluZm9ybWF0aW9uIGlzIG9uIHRoZSBkYXRhIHByb3BlcnR5IG9mIHJlc3VsdHNcclxuXHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG5cclxuXHJcbiAgICB9XSlcclxuICAgIC5zZXJ2aWNlKCdpbWRiJywgWyckaHR0cCcsIGZ1bmN0aW9uKCRodHRwKXtcclxuXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9kb2NzLmFuZ3VsYXJqcy5vcmcvYXBpL25nL3NlcnZpY2UvJGh0dHBcclxuICAgICAgICBcclxuICAgICAgICAvL01hbmFnZSBJTURCIHNlcnZpY2VcclxuICAgICAgICAvL0B0b2RvOiB3cml0ZSBhbmQgZXhwb3NlIGEgZ2V0IG1ldGhvZFxyXG5cclxuXHJcbiAgICAgICAgdmFyIGdldE1vdmllc0J5VGl0bGUgPSBmdW5jdGlvbih0aXRsZSwgY2IpIHtcclxuICAgICAgICAgICAgJGh0dHAoe1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIHVybDogJ2h0dHA6Ly93d3cub21kYmFwaS5jb20vP3Q9JyArIHRpdGxlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKGNiKTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ2V0OiBnZXRNb3ZpZXNCeVRpdGxlXHJcbiAgICAgICAgfVxyXG4gICAgfV0pOyIsImFuZ3VsYXIubW9kdWxlKCd0b2RvJywgW10pXHJcbiAgICAuY29udHJvbGxlcigndG9kb0NvbnRyb2xsZXInLCBbJyRzY29wZScsICd0b2RvTW9kZWwnLCBmdW5jdGlvbiAoJHNjb3BlLCBtb2RlbCkge1xyXG4gICAgICAgICAgICAkc2NvcGUudG9kb0N0cmwgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gbWFrZSB0aGUgbW9kZWwgYXZhaWxhYmFsZSB0byB0aGUgdmlld1xyXG4gICAgICAgICAgICAvLyBAdG9kbzogZmluaXNoIGltcGxlbWVudGluZyB0aGUgc3VibWl0IGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIC8vIEB0b2RvOmFkZCBhbiBlZGl0IGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIC8vIEB0b2RvOiBhZGQgYSBkZWxldGUgZnVuY3Rpb24gXHJcblxyXG4gICAgICAgICAgICB0aGlzLnRvZG9zID0gbW9kZWwudG9kb3M7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdCA9IGZ1bmN0aW9uIG9uU3VibWl0KCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2Rvcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLm5ld1RvZG8sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdUb2RvID0gJyc7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVkaXQgPSBmdW5jdGlvbiBvbkVkaXQoaWR4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZG9zW2lkeF0uZWRpdCA9ICF0aGlzLnRvZG9zW2lkeF0uZWRpdDtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlID0gZnVuY3Rpb24gb25EZWxldGUoaWR4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZG9zLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgIH1dKVxyXG4gICAgLnNlcnZpY2UoJ3RvZG9Nb2RlbCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy9tYW5hZ2UgdG9kbyBzdGF0ZVxyXG4gICAgICAgIC8vQHRvZG86IGRlZmluZSB0aGUgbW9kZWwgYW5kIGV4cG9zZSBpdCB0byB0aGUgcmVzdCBvZiB0aGUgYXBwXHJcbiAgICAgICAgdmFyIHRvZG9zID0gW107XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvZG9zOiB0b2Rvc1xyXG4gICAgICAgIH1cclxuICAgIH0pOyJdfQ==
