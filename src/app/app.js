angular.module('todoApp', [
    'ui.router',
    'todo'
])
.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('todo', {
            url: '/',
            templateUrl: '/app/todo/todo.html',
            controller: 'todoController as todoCtrl'
        });

});