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