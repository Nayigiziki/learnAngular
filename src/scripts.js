angular.module('todoApp', [
    'ui.router',
    'todo'
])
.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/todo');

    $stateProvider
        .state('todo', {
            url: '/todo',
            templateUrl: '/app/todo/todo.html',
            controller: 'todoController as todoCtrl'
        });

//
});
angular.module('todo', [])
    .controller('todoController', ['$scope', 'todoModel', function ($scope, model) {
            // add todo
            // delete todo
            // edit todo
    }])
    .service('todoModel', function(){
        //manage todo state
    });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInRvZG8vdG9kby1tb2R1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgndG9kb0FwcCcsIFtcclxuICAgICd1aS5yb3V0ZXInLFxyXG4gICAgJ3RvZG8nXHJcbl0pXHJcbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xyXG5cclxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcclxuXHJcbiAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgIC5zdGF0ZSgnbGFuZGluZ1BhZ2UnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy8nLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9hcHAvbGFuZGluZy1wYWdlL2xhbmRpbmctcGFnZS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ2xhbmRpbmdQYWdlQ29udHJvbGxlciBhcyBsYW5kaW5nUGFnZUN0cmwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ3RvZG8nLCB7XHJcbiAgICAgICAgICAgIHVybDogJy90b2RvJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvYXBwL3RvZG8vdG9kby5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3RvZG9Db250cm9sbGVyIGFzIHRvZG9DdHJsJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuLy9cclxufSk7IiwiYW5ndWxhci5tb2R1bGUoJ3RvZG8nLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCd0b2RvQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJ3RvZG9Nb2RlbCcsIGZ1bmN0aW9uICgkc2NvcGUsIG1vZGVsKSB7XHJcbiAgICAgICAgICAgIC8vIGFkZCB0b2RvXHJcbiAgICAgICAgICAgIC8vIGRlbGV0ZSB0b2RvXHJcbiAgICAgICAgICAgIC8vIGVkaXQgdG9kb1xyXG4gICAgfV0pXHJcbiAgICAuc2VydmljZSgndG9kb01vZGVsJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAvL21hbmFnZSB0b2RvIHN0YXRlXHJcbiAgICB9KTsiXX0=
