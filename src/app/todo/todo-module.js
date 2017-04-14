angular.module('todo', [])
    .controller('todoController', ['$scope', 'todoModel', function ($scope, model) {
            $scope.todoCtrl = this;
            // $scope === this
            // add todo
            this.submit = function onSubmit() {
                console.log('value');
            };
            // delete todo
            // edit todo
    }])
    .service('todoModel', function(){
        //manage todo state
    });