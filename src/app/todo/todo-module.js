angular.module('todo', [])
    .controller('todoController', ['$scope', 'todoModel', function ($scope, model) {
            // add todo
            // delete todo
            // edit todo
    }])
    .service('todoModel', function(){
        //manage todo state
    });