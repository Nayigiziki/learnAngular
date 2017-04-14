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
angular.module('todo', [])
    .controller('todoController', ['$scope', 'todoModel', function ($scope, model) {
            // add todo
            // delete todo
            // edit todo
    }])
    .service('todoModel', function(){
        //manage todo state
    });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInRvZG8vdG9kby1tb2R1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCd0b2RvQXBwJywgW1xyXG4gICAgJ3VpLnJvdXRlcicsXHJcbiAgICAndG9kbydcclxuXSlcclxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XHJcblxyXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xyXG5cclxuICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgLnN0YXRlKCd0b2RvJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvYXBwL3RvZG8vdG9kby5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3RvZG9Db250cm9sbGVyIGFzIHRvZG9DdHJsJ1xyXG4gICAgICAgIH0pO1xyXG5cclxufSk7IiwiYW5ndWxhci5tb2R1bGUoJ3RvZG8nLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCd0b2RvQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJ3RvZG9Nb2RlbCcsIGZ1bmN0aW9uICgkc2NvcGUsIG1vZGVsKSB7XHJcbiAgICAgICAgICAgIC8vIGFkZCB0b2RvXHJcbiAgICAgICAgICAgIC8vIGRlbGV0ZSB0b2RvXHJcbiAgICAgICAgICAgIC8vIGVkaXQgdG9kb1xyXG4gICAgfV0pXHJcbiAgICAuc2VydmljZSgndG9kb01vZGVsJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAvL21hbmFnZSB0b2RvIHN0YXRlXHJcbiAgICB9KTsiXX0=
