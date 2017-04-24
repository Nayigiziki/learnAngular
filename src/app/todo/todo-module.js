angular.module('todo', [])
    .controller('todoController', ['$scope', 'todoModel', function ($scope, model) {
            $scope.todoCtrl = this;

            // $scope === this
            // make the model availabale to the view
            // @todo: finish implementing the submit function
            // @todo:add an edit function
            // @todo: add a delete function 

            this.todos = model.todos;
            this.submit = function onSubmit() {
                console.log('value is ' + this.newTodo);
                this.todos.push( { text : this.newTodo } );
                this.newTodo = '';
            };

            this.delete = function onDelete(index){
                console.log ("On Delete Function for todo Text " + this.todos[index].text);
                this.todos.splice(index,1);
            }

            this.edit = function onEdit(index){
                console.log ("On Edit Function for todo Text " + this.todos[index].text);
                this.selectedIndex = index;
                this.editTodo = this.todos[index].text;

            }

            this.done = function onDone(index){
                console.log ("On Done Function for todo Text " + this.todos[index].text);
                this.todos[index].text = this.editTodo;
                this.selectedIndex = -1;
            }

    }])

    .service('todoModel', function(){
        //manage todo state
        //@todo: define the model and expose it to the rest of the app
        var todoList = [];
        return {
            todos : todoList
        }
    });