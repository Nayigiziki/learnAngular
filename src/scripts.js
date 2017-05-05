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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInRvZG8vdG9kby1tb2R1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCd0b2RvQXBwJywgW1xyXG4gICAgJ3VpLnJvdXRlcicsXHJcbiAgICAndG9kbydcclxuXSlcclxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XHJcbiAgICB2YXIgYmFzZVBhdGggPSAnc3JjL2FwcCc7XHJcbiAgICAvL2pvZVxyXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xyXG4gICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAuc3RhdGUoJ3RvZG8nLCB7XHJcbiAgICAgICAgICAgIHVybDogJy8nLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogYmFzZVBhdGggKyAnL3RvZG8vdG9kby5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3RvZG9Db250cm9sbGVyIGFzIHRvZG9DdHJsJ1xyXG4gICAgICAgIH0pO1xyXG59KTsiLCJhbmd1bGFyLm1vZHVsZSgndG9kbycsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ3RvZG9Db250cm9sbGVyJywgWyckc2NvcGUnLCAndG9kb01vZGVsJywgZnVuY3Rpb24gKCRzY29wZSwgbW9kZWwpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnRvZG9DdHJsID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIG1ha2UgdGhlIG1vZGVsIGF2YWlsYWJhbGUgdG8gdGhlIHZpZXdcclxuICAgICAgICAgICAgLy8gQHRvZG86IGZpbmlzaCBpbXBsZW1lbnRpbmcgdGhlIHN1Ym1pdCBmdW5jdGlvblxyXG4gICAgICAgICAgICAvLyBAdG9kbzphZGQgYW4gZWRpdCBmdW5jdGlvblxyXG4gICAgICAgICAgICAvLyBAdG9kbzogYWRkIGEgZGVsZXRlIGZ1bmN0aW9uIFxyXG4gICAgICAgICAgICB0aGlzLnRvZG9zID0gbW9kZWwudG9kb3M7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdCA9IGZ1bmN0aW9uIG9uU3VibWl0KCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2Rvcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLm5ld1RvZG8sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdUb2RvID0gJyc7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVkaXQgPSBmdW5jdGlvbiBvbkVkaXQoaWR4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZG9zW2lkeF0uZWRpdCA9ICF0aGlzLnRvZG9zW2lkeF0uZWRpdDtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlID0gZnVuY3Rpb24gb25EZWxldGUoaWR4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZG9zLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgIH1dKVxyXG4gICAgLnNlcnZpY2UoJ3RvZG9Nb2RlbCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy9tYW5hZ2UgdG9kbyBzdGF0ZVxyXG4gICAgICAgIC8vQHRvZG86IGRlZmluZSB0aGUgbW9kZWwgYW5kIGV4cG9zZSBpdCB0byB0aGUgcmVzdCBvZiB0aGUgYXBwXHJcbiAgICAgICAgdmFyIHRvZG9zID0gW107XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvZG9zOiB0b2Rvc1xyXG4gICAgICAgIH1cclxuICAgIH0pOyJdfQ==
