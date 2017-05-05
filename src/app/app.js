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