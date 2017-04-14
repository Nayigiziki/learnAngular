angular.module('todoApp', [
    'ui.router',
    'todo'
])
.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('landingPage', {
            url: '/',
            templateUrl: '/app/landing-page/landing-page.html',
            controller: 'landingPageController as landingPageCtrl'
        })
        .state('todo', {
            url: '/todo',
            templateUrl: '/app/todo/todo.html',
            controller: 'todoController as todoCtrl'
        });

//
});