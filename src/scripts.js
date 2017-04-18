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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInRvZG8vdG9kby1tb2R1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ3RvZG9BcHAnLCBbXHJcbiAgICAndWkucm91dGVyJyxcclxuICAgICd0b2RvJ1xyXG5dKVxyXG4uY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcclxuICAgIHZhciBiYXNlUGF0aCA9ICdzcmMvYXBwJztcclxuICAgIC8vam9lXHJcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XHJcbiAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgIC5zdGF0ZSgndG9kbycsIHtcclxuICAgICAgICAgICAgdXJsOiAnLycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBiYXNlUGF0aCArICcvdG9kby90b2RvLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAndG9kb0NvbnRyb2xsZXIgYXMgdG9kb0N0cmwnXHJcbiAgICAgICAgfSk7XHJcbn0pOyIsImFuZ3VsYXIubW9kdWxlKCd0b2RvJywgW10pXHJcbiAgICAuY29udHJvbGxlcigndG9kb0NvbnRyb2xsZXInLCBbJyRzY29wZScsICd0b2RvTW9kZWwnLCBmdW5jdGlvbiAoJHNjb3BlLCBtb2RlbCkge1xyXG4gICAgICAgICAgICAkc2NvcGUudG9kb0N0cmwgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyAkc2NvcGUgPT09IHRoaXNcclxuICAgICAgICAgICAgLy8gYWRkIHRvZG9cclxuICAgICAgICAgICAgdGhpcy5zdWJtaXQgPSBmdW5jdGlvbiBvblN1Ym1pdCgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd2YWx1ZScpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAvLyBkZWxldGUgdG9kb1xyXG4gICAgICAgICAgICAvLyBlZGl0IHRvZG9cclxuICAgIH1dKVxyXG4gICAgLnNlcnZpY2UoJ3RvZG9Nb2RlbCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy9tYW5hZ2UgdG9kbyBzdGF0ZVxyXG4gICAgfSk7Il19
