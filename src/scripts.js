angular.module('todoApp', [
    'ui.router',
    'todo'
])
.config(function($stateProvider, $urlRouterProvider) {
    var basePath = 'src/app';
    //joe
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('todo', {
            url: '/',
            templateUrl: basePath + '/todo/todo.html',
            controller: 'todoController as todoCtrl'
        });
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInRvZG8vdG9kby1tb2R1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ3RvZG9BcHAnLCBbXHJcbiAgICAndWkucm91dGVyJyxcclxuICAgICd0b2RvJ1xyXG5dKVxyXG4uY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcclxuICAgIHZhciBiYXNlUGF0aCA9ICdzcmMvYXBwJztcclxuICAgIC8vam9lXHJcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XHJcbiAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgIC5zdGF0ZSgndG9kbycsIHtcclxuICAgICAgICAgICAgdXJsOiAnLycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBiYXNlUGF0aCArICcvdG9kby90b2RvLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAndG9kb0NvbnRyb2xsZXIgYXMgdG9kb0N0cmwnXHJcbiAgICAgICAgfSk7XHJcbn0pOyIsImFuZ3VsYXIubW9kdWxlKCd0b2RvJywgW10pXHJcbiAgICAuY29udHJvbGxlcigndG9kb0NvbnRyb2xsZXInLCBbJyRzY29wZScsICd0b2RvTW9kZWwnLCBmdW5jdGlvbiAoJHNjb3BlLCBtb2RlbCkge1xyXG4gICAgICAgICAgICAkc2NvcGUudG9kb0N0cmwgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gbWFrZSB0aGUgbW9kZWwgYXZhaWxhYmFsZSB0byB0aGUgdmlld1xyXG4gICAgICAgICAgICAvLyBAdG9kbzogZmluaXNoIGltcGxlbWVudGluZyB0aGUgc3VibWl0IGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIC8vIEB0b2RvOmFkZCBhbiBlZGl0IGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIC8vIEB0b2RvOiBhZGQgYSBkZWxldGUgZnVuY3Rpb24gXHJcblxyXG4gICAgICAgICAgICB0aGlzLnRvZG9zID0gbW9kZWwudG9kb3M7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdCA9IGZ1bmN0aW9uIG9uU3VibWl0KCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2Rvcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLm5ld1RvZG8sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdUb2RvID0gJyc7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVkaXQgPSBmdW5jdGlvbiBvbkVkaXQoaWR4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZG9zW2lkeF0uZWRpdCA9ICF0aGlzLnRvZG9zW2lkeF0uZWRpdDtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlID0gZnVuY3Rpb24gb25EZWxldGUoaWR4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZG9zLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgIH1dKVxyXG4gICAgLnNlcnZpY2UoJ3RvZG9Nb2RlbCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy9tYW5hZ2UgdG9kbyBzdGF0ZVxyXG4gICAgICAgIC8vQHRvZG86IGRlZmluZSB0aGUgbW9kZWwgYW5kIGV4cG9zZSBpdCB0byB0aGUgcmVzdCBvZiB0aGUgYXBwXHJcbiAgICAgICAgdmFyIHRvZG9zID0gW107XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvZG9zOiB0b2Rvc1xyXG4gICAgICAgIH1cclxuICAgIH0pOyJdfQ==
